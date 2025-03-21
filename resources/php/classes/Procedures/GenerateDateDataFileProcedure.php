<?php

class GenerateDateDataFileProcedure extends Procedure
{
    private const FILTER_PATRONS = 'patrons';
    private const FILTER_FEASTS = 'feasts';

    private const RECORDS_TREE_MODE = 'records-tree';
    private const DATES_TREE_MODE = 'dates-tree';
    private const MOVABLE_DATES_FILE_MODE = 'movable-dates-file';

    private const MOVABLE_DATES_FILE_BASE_INDEX = 'base';
    private const MOVABLE_DATES_FILE_MOVE_INDEX = 'move';

    private const DATES_TREE_PATH_ELEMENTS_ALIASES_PATTERN = [
        '/^(0[1-9]|1[0-2])$/', //month
        '/^((0[1-9]|[1-2][0-9]|3[0-1])[' . self::LEAP_YEARS_ONLY_SEPARATOR . self::NO_LEAP_YEARS_ONLY_SEPARATOR . ']?)$/', //day
    ];

    private const RECORD_TREE_SOURCE_FIELDS = [
        'reliable-death-anniversary' => self::PATRON_DIED_INDEX,
        'feast-day-anniversary' => self::PATRON_ANNIVERSARY_INDEX,
    ];
    private const RECORD_TREE_METHODS = [
        'reliable-death-anniversary' => 'getDeathMonthWithDay',
        'feast-day-anniversary' => 'getMentionedMonthsWithDays',
    ];

    private const FEASTS_ROOT_PATH = 'records/feasts';

    private $dstFileData;
    private $filter;

    public function run(string $sourceId, string $mode, string $srcPath, string $filter, string $dstFilePath): void
    {
        $fullSrcPath = $this->getFullDataPath($srcPath);
        $fullDstFilePath = $this->getFullDataPath($dstFilePath);
        $fullDstFilePathWithExtension = $this->getGeneratedFileSuffix($fullDstFilePath);
        $this->dstFileData = $this->getOriginalJsonFileContentArrayForFullPath($fullDstFilePathWithExtension);

        if (!in_array($filter, [self::FILTER_PATRONS, self::FILTER_FEASTS])) {
            $this->error("invalid filter value '$filter'");
        }
        $this->filter = $filter;

        if ($mode === self::RECORDS_TREE_MODE) {
            $this->processRecordsTreeMode($sourceId, $fullSrcPath, ltrim($srcPath, '/'));
        } else if ($mode === self::DATES_TREE_MODE) {
            $this->processDatesTreeMode($sourceId, $fullSrcPath);
        } else if ($mode === self::MOVABLE_DATES_FILE_MODE) {
            $writeOnlyMovableRecords = !preg_match('/immovable$/', $dstFilePath);
            $this->processMovableDatesFileMode($sourceId, $fullSrcPath, $writeOnlyMovableRecords);
        } else {
            $this->error("unknown generate date data file procedure mode '$mode'");
        }

        ksort($this->dstFileData);
        $this->saveGeneratedFiles([$fullDstFilePathWithExtension => $this->dstFileData], true);
    }

    private function isPatronUrlAFeast(string $patronUrl): bool
    {
        return strpos($patronUrl, '#') !== false;
    }

    private function addToFileData(string $alias, string $patronUrl, string $sourceId, string $recordId): void
    {
        if (($this->isPatronUrlAFeast($patronUrl) && $this->filter === self::FILTER_PATRONS)
          || (!$this->isPatronUrlAFeast($patronUrl) && $this->filter === self::FILTER_FEASTS)
        ) {
            return;
        }

        $data = &$this->dstFileData[$alias][$patronUrl];

        if (empty($data[self::DATES_DATA_PATRON_RECORD_NAME_INDEX] ?? [])) {
            $data[self::DATES_DATA_PATRON_RECORD_NAME_INDEX] = $this->getPatronNamesArray($patronUrl);
        }
        $data[self::DATES_DATA_PATRON_RECORD_SOURCES_INDEX][$sourceId] = $recordId;
    }

    private function getPatronNamesArray(string $patronUrl): array
    {
        $result = [];

        if (preg_match("/^(?'path'[^#]+)([#](?'feast'[0-9a-z]+))?$/", $patronUrl, $matches)) {
            $filePath = $this->getDataFileSuffix($matches['path']);
            $feastId = $matches['feast'] ?? null;

            $data = $this->getOriginalJsonFileContentArray($filePath);

            $mainNames = [];
            foreach ($data[self::PATRON_NAMES_INDEX] ?? [] as $language => $values) {
                $mainNames[$language] = $values[0];
            }
            if (!is_null($feastId)) {
                $feastFilePath = self::FEASTS_ROOT_PATH . '/' . $this->getDataFileSuffix($feastId);
                $feastData = $this->getOriginalJsonFileContentArray($feastFilePath);

                foreach ($feastData[self::PATRON_NAMES_INDEX] ?? [] as $language => $values) {
                    $value = $values[0];
                    if (isset($mainNames[$language])) {
                        $value = $mainNames[$language] . ' (' . $value . ')';
                    }
                    $result[$language] = $value;
                }
            } else {
                $result = $mainNames;
            }
        }

        if (empty($result)) {
            $this->error("Missing patron's name for URL '$patronUrl'");
        }

        return $result;
    }

    private function processDatesTreeMode(string $sourceId, string $srcPath): void
    {
        $aliases = $this->getDatesTreeModeAliases($srcPath);
        $paths = $this->getPathTree($srcPath);
        foreach ($paths as $path => $isDirectory) {
            if ($isDirectory) {
                continue;
            }

            $fileData = $this->getOriginalJsonFileContentArrayForFullPath($path)[self::DATA_LINKS_GENERATED_FILES_INDEX] ?? [];
            if (empty($fileData)) {
                continue;
            }

            $subPath = ltrim(mb_substr($path, mb_strlen($srcPath)), '/');
            $subPathElementsCount = count(explode('/', $subPath));
            if ($subPathElementsCount !== 2) {
                continue;
            }

            $dirName = dirname($subPath);
            $fileName = basename($subPath);
            $fileNameWithoutExtension = explode('.', $fileName)[0] ?? '';

            $monthAlias = $aliases['.'][$dirName] ?? null;
            $dayAlias = null;
            if (preg_match(self::DATES_TREE_PATH_ELEMENTS_ALIASES_PATTERN[1], $fileNameWithoutExtension)) {
                $dayAlias = $fileNameWithoutExtension;
            } else {
                $dayAlias = $aliases[$dirName][$fileNameWithoutExtension] ?? null;
            }
            if (is_null($monthAlias) || is_null($dayAlias)) {
                continue;
            }

            $alias = "$monthAlias-$dayAlias";
            $aliasForRomanFormatting = substr($alias, 0, 5);
            if (strlen($alias) === 6) {
                $alias[2] = $alias[5];
                $alias = substr($alias, 0, 5);
            }

            $staticDataFilePath = preg_replace(
                '~' . $this->getGeneratedFileSuffix() . '$~',
                $this->getDataFileSuffix(),
                $path
            );
            $staticData = $this->getOriginalJsonFileContentArrayForFullPath($staticDataFilePath) ?? [];

            foreach ($fileData as $recordId => $recordData) {
                $skipDueToDeletedRecord = false;
                foreach ($staticData[$recordId] as $dataValue) {
                    if (trim($dataValue) === self::DELETED_RECORD_TAG) {
                        $skipDueToDeletedRecord = true;
                        break;
                    }
                }
                if ($skipDueToDeletedRecord) {
                    continue;
                }

                foreach ($recordData as $patronUrl) {
                    $dayWithRomanMonth = $this->getDate()->getDayWithRomanMonth($aliasForRomanFormatting);
                    $this->addToFileData($alias, $patronUrl, $sourceId, "$dayWithRomanMonth: #$recordId");
                }
            }
        }
    }

    private function getDatesTreeModeAliases(string $srcPath): array
    {
        $aliases = [];

        $paths = $this->getPathTree($srcPath);
        foreach ($paths as $path => $isDirectory) {
            $aliasPath = $this->getAliasFilePath(dirname($path));
            if ($path !== $aliasPath) {
                continue;
            }

            $subPath = ltrim(mb_substr($path, mb_strlen($srcPath)), '/');
            $aliasPattern = self::DATES_TREE_PATH_ELEMENTS_ALIASES_PATTERN[count(explode('/', $subPath)) - 1] ?? null;
            if (is_null($aliasPattern)) {
                continue;
            }

            $dirName = dirname($subPath);
            $aliasesFileData = $this->getOriginalJsonFileContentArrayForFullPath($path);
            foreach ($aliasesFileData as $alias => $target) {
                if (preg_match($aliasPattern, $alias)) {
                    $aliases[$dirName][$target] = $alias;
                }
            }
        }

        return $aliases;
    }

    private function processRecordsTreeMode(string $sourceId, string $fullSrcPath, string $patronUrlRootPath): void
    {
        $paths = $this->getPathTree($fullSrcPath);
        foreach ($paths as $path => $isDirectory) {
            if ($isDirectory) {
                continue;
            }

            $fileName = basename($path);
            $fileNameWithoutExtension = explode('.', $fileName)[0] ?? '';
            $subPath = ltrim(mb_substr($path, mb_strlen($fullSrcPath)), '/');
            $patronUrl = dirname("$patronUrlRootPath/$subPath") . "/$fileNameWithoutExtension";

            if (!preg_match('/^[0-9a-z]+$/', $fileNameWithoutExtension)) {
                continue;
            }

            $sourceField = self::RECORD_TREE_SOURCE_FIELDS[$sourceId] ?? null;
            if (is_null($sourceField)) {
                $this->error("record tree source field not defined for source ID '$sourceId'");
            }

            $method = self::RECORD_TREE_METHODS[$sourceId] ?? null;
            if (is_null($method)) {
                $this->error("record tree method not defined for source ID '$sourceId'");
            }

            $fileData = $this->getOriginalJsonFileContentArrayForFullPath($path) ?? [];

            $monthsWithDays = $this->$method($fileData[$sourceField] ?? []);
            foreach ($monthsWithDays as $monthWithDay) {
                $replacedMonthWithDay = str_replace(
                    [self::LEAP_YEARS_ONLY_SEPARATOR, self::NO_LEAP_YEARS_ONLY_SEPARATOR],
                    self::ALL_YEARS_SEPARATOR,
                    $monthWithDay
                );
                $dayWithRomanMonth = $this->getDate()->getDayWithRomanMonth($replacedMonthWithDay);
                $this->addToFileData($monthWithDay, $patronUrl, $sourceId, $dayWithRomanMonth);
            }
        }
    }

    private function getDeathMonthWithDay(array $dates): array
    {
        $dateObj = $this->getDate();

        if (count($dates) === 2
            && $dateObj->isFullDateValid($dates[0] ?? '')
            && $dateObj->isFullDateValid($dates[1] ?? '')
        ) {
            sort($dates);

            if ($dateObj->getDateMovedByDays($dates[0], 1) === $dates[1]
                || ($dates[0] === '1582-10-04' && $dates[1] === '1582-10-15')
            ) {
                return [$dateObj->getDateMonthWithDay($dates[1])];
            }

        }

        $showMonthAndDay = true;
        $prevMonthAndDay = null;

        foreach ($dates as $date) {
            $monthAndDay = preg_replace('/^.+-([0-1][0-9]-[0-3][0-9])$/', '\\1', $date);
            $isDateAccurated = preg_match('/^[1-9]\d*-\d{2}-\d{2}$/', $date);

            if ($showMonthAndDay) {
                if ($monthAndDay !== $date) {
                    if (!$dateObj->isMonthWithDayValid($monthAndDay)
                        || ($isDateAccurated && !$dateObj->isFullDateValid($date))
                    ) {
                        $this->error("Invalid date '$date' format");
                    }

                    if ($prevMonthAndDay === null) {
                        $prevMonthAndDay = $monthAndDay;
                    } else if ($prevMonthAndDay !== $monthAndDay) {
                        $showMonthAndDay = false;
                    }
                } else {
                    $showMonthAndDay = false;
                }
            }
        }

        if (!$showMonthAndDay || is_null($prevMonthAndDay)) {
            return [];
        }

        return [$prevMonthAndDay];
    }

    private function getMentionedMonthsWithDays(array $days): array
    {
        $result = [];

        foreach ($days as $day) {
            if (!$this->getDate()->isMonthWithDayValid($day, [self::LEAP_YEARS_ONLY_SEPARATOR, self::NO_LEAP_YEARS_ONLY_SEPARATOR, self::ALL_YEARS_SEPARATOR])) {
                $this->error("Invalid month with day '$day' format");
            }

            $result[] = $day;
        }

        return $result;
    }

    private function processMovableDatesFileMode(string $sourceId, string $srcPath, bool $writeOnlyMovableRecords): void
    {
        $movableFeastBaseClass = $this->getMovableFeastBase();
        $dateClass = $this->getDate();

        $staticFilePath = $this->getDataFileSuffix($srcPath);
        $staticFileData = $this->getOriginalJsonFileContentArrayForFullPath($staticFilePath);

        $generatedFilePath = $this->getGeneratedFileSuffix($srcPath);
        $generatedFileData = $this->getOriginalJsonFileContentArrayForFullPath($generatedFilePath)[self::DATA_LINKS_GENERATED_FILES_INDEX] ?? [];

        $year = date('Y');

        foreach ($staticFileData as $key => $staticRow) {
            $baseValue = $staticRow[self::MOVABLE_DATES_FILE_BASE_INDEX] ?? null;
            $moveValue = $staticRow[self::MOVABLE_DATES_FILE_MOVE_INDEX] ?? null;

            if (!is_string($baseValue) && !is_array($baseValue)) {
                $this->error("base index must be string of array of strings for key '$key' in source '$sourceId'");
            } else if (!is_int($moveValue) && !is_array($moveValue)) {
                $this->error("move index must be single integer or array of integers for key '$key' in source '$sourceId'");
            } else if (is_array($baseValue) !== is_array($moveValue)) {
                $this->error("base and move indexes must be both arrays or not for key '$key' in source '$sourceId'");
            } else if (is_array($baseValue) && is_array($moveValue) && array_keys($baseValue) !== array_keys($moveValue)) {
                $this->error("base and move indexes must be arrays with same keys and equal number of elements for key '$key' in source '$sourceId'");
            }

            $baseList = is_string($baseValue) ? [$baseValue] : $baseValue;
            $moveList = is_int($moveValue) ? [$moveValue] : $moveValue;

            $patronsLinks = $generatedFileData[$key] ?? [];
            ksort($patronsLinks);

            foreach ($moveList as $moveId => $moveDays) {
                $base = $baseList[$moveId];

                if (!is_int($moveId)) {
                    $this->error("each move index key must be integer for key '$key' in source '$sourceId'");
                } else if (!is_int($moveDays)) {
                    $this->error("each move index days value must be integer for key '$key' in source '$sourceId'");
                }

                $monthWithDay = $movableFeastBaseClass->$base($year);
                try {
                    $monthWithDay = $movableFeastBaseClass->getValidMonthWithDay($monthWithDay);
                    if ($writeOnlyMovableRecords === $movableFeastBaseClass->isLastMonthWithDayImmovable()) {
                        continue;
                    }
                } catch (StandardException $e) {
                    $this->error("invalid base method '$base' result '$monthWithDay' for key '$key' in source '$sourceId'");
                }

                $moveIdPatronsLinks = $patronsLinks;
                if ($moveId !== 0) {
                    if (isset($patronsLinks[$moveId])) {
                        $moveIdPatronsLinks = [$moveId => $patronsLinks[$moveId]];
                    } else {
                        $moveIdPatronsLinks = [];
                    }
                }

                foreach ($moveIdPatronsLinks as $patronUrl) {
                    if ($writeOnlyMovableRecords) {
                        $this->addToFileData("$base|$moveDays", $patronUrl, $sourceId, "#$key");
                    } else {
                        if (!$dateClass->isMonthWithDayValid($monthWithDay)) {
                            continue;
                        }
                        $calculatedDate = $dateClass->getDateMovedByDays("$year-$monthWithDay", $moveDays);
                        $calculatedMonthWithDay = $dateClass->getDateMonthWithDay($calculatedDate);
                        $dayWithRomanMonth = $dateClass->getDayWithRomanMonth($calculatedMonthWithDay);

                        $this->addToFileData($calculatedMonthWithDay, $patronUrl, $sourceId, "$dayWithRomanMonth: #$key");
                    }
                }
            }
        }
    }
}
