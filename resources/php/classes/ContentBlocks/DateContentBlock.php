<?php

abstract class DateContentBlock extends ContentBlock implements ContentBlockInterface
{
    protected const EXAMPLE_NORMAL_YEAR = 1;
    protected const EXAMPLE_LEAP_YEAR = 4;

    private const DATE_SOURCE_LANGUAGE_VARIABLE_PREFIX = 'lang-date-source-';
    protected const LEAP_YEAR_INFO_VARIABLE_NAME = 'lang-leap-year';
    protected const WEEKDAY_VARIABLE_NAME_PREFIX = 'lang-weekday-';

    protected const PATRONS_IMMOVABLE_FILE_PATH = 'generated/dates-patrons-immovable';
    protected const FEASTS_IMMOVABLE_FILE_PATH = 'generated/dates-feasts-immovable';
    protected const FEASTS_MOVABLE_FILE_PATH = 'generated/dates-feasts-movable';

    protected $dates = [];
    protected $rows = [];
    protected $textVariables;
    protected $iconFile;
    protected $listNameVariable;
    protected $mainTemplate;
    protected $itemTemplate;
    protected $formTemplate;
    protected $dateFormInfoLangVariable;

    final public function prepare(string $dates): ContentBlock
    {
        $this->mainTemplate = $this->getOriginalHtmlFileContent('content-blocks/date-list-content-block.html');
        $this->itemTemplate = $this->getOriginalHtmlFileContent('items/dates-patron-item.html');

        $this->setOtherProperties($dates);

        $translations = $this->getRecordTranslations($this->rows);
        $language = $this->getLanguage();
        $this->textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        return $this;
    }

    protected function setValidSingleDate($dates): self
    {
        if ($dates === '') {
            $dates = $this->getDate()->getCurrentYear()
                . '-' . $this->getDate()->getCurrentMonth()
                . '-' . $this->getDate()->getCurrentDay();
        }

        if (!$this->getDate()->isFullDateValid($dates)) {
            throw new StandardException('invalid dates format');
        }
        $this->dates = [$dates];

        return $this;
    }

    public function getListNameVariable(): string
    {
        return $this->listNameVariable;
    }

    final public function getFullContent(string $translatedName): string
    {
        $mainContent = $this->mainTemplate;
        $patronsListContent = '';

        $rows = [];
        $patronUrls = array_keys($this->rows);
        shuffle($patronUrls);
        foreach ($patronUrls as $patronUrl) {
            $rows[$patronUrl] = $this->rows[$patronUrl];
        }

        foreach ($rows as $patronUrl => $recordData) {
            $patronsListContent .= $this->getRecordContent($patronUrl);
        }

        $variables = [
            'icon-file' => $this->iconFile,
            'list-name-variable' => $this->getListNameVariable(),
            'dates' => $this->getDatesString(),
            'patrons-list' => $patronsListContent,
            'date-change-list-form' => $this->formTemplate,
            'date-form-info' => self::VARIABLE_NAME_SIGN . $this->dateFormInfoLangVariable . self::VARIABLE_NAME_SIGN,
        ];

        return $this->getReplacedContent($mainContent, $variables);
    }

    final public function getRecordContent(string $patronUrl): string
    {
        $textVariables = $this->textVariables;

        $name = self::VARIABLE_NAME_SIGN . $this->getLanguageVariableName($patronUrl) . self::VARIABLE_NAME_SIGN;
        $name = $this->getReplacedContent($name, $textVariables, true);

        $link = '/' . $patronUrl;
        $link = $this->getLinkWithActiveRecordIdForAnchor($link);
        $link = $this->getRecordIdPathWithNameExtension($link, $name);

        $variables = [
            'href' => $link,
            'name' => $name,
            'sources' => $this->getSources($patronUrl),
        ];

        return $this->getReplacedContent($this->itemTemplate, $variables);
    }

    protected function getImmovableRows(array $fileData): array
    {
        $result = [];

        foreach ($this->dates as $date) {
            $year = $this->getDate()->getDateYear($date);
            $isYearLeap = $this->getDate()->isYearLeap($year);

            $monthWithDay = substr($date, mb_strlen($date) - 5);
            $rows = $fileData[$monthWithDay] ?? [];
            foreach ($rows as $patronUrl => $patronData) {
                $result = $this->addPatronToList($result, $patronUrl, $patronData);
            }

            $replacedMonthWithDay = str_replace(
                self::ALL_YEARS_SEPARATOR,
                $isYearLeap ? self::LEAP_YEARS_ONLY_SEPARATOR : self::NO_LEAP_YEARS_ONLY_SEPARATOR,
                $monthWithDay
            );
            $rows = $fileData[$replacedMonthWithDay] ?? [];
            foreach ($rows as $patronUrl => $patronData) {
                $result = $this->addPatronToList($result, $patronUrl, $patronData);
            }
        }

        return $result;
    }

    protected function getMovableRows(array $fileData): array
    {
        $result = [];

        foreach ($this->dates as $date) {
            $year = (int) $date;

            $methodResults = [];
            foreach ($fileData as $methodWithMoveDays => $feastData) {
                $methodWithMoveDaysArr = explode('|', $methodWithMoveDays);
                $method = $methodWithMoveDaysArr[0];
                $moveDays = $methodWithMoveDaysArr[1];

                if (!isset($methodResults[$method])) {
                    $methodResults[$method] = $this->getMovableFeastBase()->$method($year);
                }
                $methodResult = $methodResults[$method];
                if (!$this->getDate()->isMonthWithDayValid($methodResult)) {
                    continue;
                }

                $feastDate = $this->getDate()->getDateMovedByDays("$year-$methodResult", $moveDays);
                if ($feastDate === $date) {
                    foreach ($feastData as $patronUrl => $patronData) {
                        $result = $this->addPatronToList($result, $patronUrl, $patronData);
                    }
                }
            }
        }

        return $result;
    }

    protected function addPatronToList(array $data, string $patronUrl, array $patronData): array
    {
        foreach ($patronData as $index => $indexData) {
            foreach ($indexData as $key => $value) {
                $data[$patronUrl][$index][$key] = $value;
            }
        }

        return $data;
    }

    private function getLanguageVariableName(string $patronUrl): string
    {
        return str_replace(['/', '#', '~'], '-', $patronUrl);
    }

    private function getRecordTranslations(array $data): array
    {
        $result = [];

        foreach ($data as $patronUrl => $recordData) {
            $variableName = $this->getLanguageVariableName($patronUrl);
            $result[$variableName] = $recordData[self::DATES_DATA_PATRON_RECORD_NAME_INDEX] ?? [];
        }

        return $result;
    }

    private function getSources(string $patronUrl): array
    {
        $result = [];

        $sourcesData = $this->rows[$patronUrl][self::DATES_DATA_PATRON_RECORD_SOURCES_INDEX] ?? [];
        foreach ($sourcesData as $source => $record) {
            $sourceNameVariable = self::VARIABLE_NAME_SIGN . self::DATE_SOURCE_LANGUAGE_VARIABLE_PREFIX . $source . self::VARIABLE_NAME_SIGN;
            $result[] = "$sourceNameVariable [$record]";
        }

        return $result;
    }

    protected function getFullDateWeekDayLanguageVariable(string $date): string
    {
        $name = $this->getDate()->getFullDateWeekDayEnglishName($date);

        return self::VARIABLE_NAME_SIGN . self::WEEKDAY_VARIABLE_NAME_PREFIX . $name . self::VARIABLE_NAME_SIGN;
    }
}
