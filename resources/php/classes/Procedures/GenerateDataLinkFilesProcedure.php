<?php

class GenerateDataLinkFilesProcedure extends Procedure
{
    private const LANGUAGE_CODE_PATTERN = '/^[a-z][a-z][a-z]?$/';
    private const POSSIBLE_NAME_INDEX = 'name';

    private const UNKNOWN_YEAR = '????';

    private $generatedFilesData = [];
    private $personGeneratedFilesData = [];
    private $unusedAssignmentTags = [];

    public function run(array $dataPaths, string $fieldName): void
    {
        $paths = [];
        foreach ($dataPaths as $dataPath) {
            $rootPath = $this->getFullDataPath($dataPath);

            $paths = array_merge($paths, $this->getPathTree($rootPath));
        }

        foreach ($paths as $sourceFileFullPath => $isDirectory) {
            if ($isDirectory) {
                continue;
            }

            $directoryPath = dirname($sourceFileFullPath);
            if (in_array($sourceFileFullPath, [
                $this->getIndexFilePath($directoryPath),
                $this->getIndexFilePath($directoryPath, true),
                $this->getAliasFilePath($directoryPath),
                $this->getAliasFilePath($directoryPath, true),
            ])) {
                continue;
            }

            $fileData = $this->getOriginalJsonFIleContentArrayForFullPath($sourceFileFullPath);
            $dataLinksData = $this->getFileDataLinks($fileData, $fieldName);

            $dataRootPath = $this->getPath()->getDataPath();
            $fileExtension = $this->getDataFileSuffix();
            $sourceFilePath = preg_replace('~^' . $dataRootPath . '(.+)' . $fileExtension . '$~U', '\1', $sourceFileFullPath);
            if ($sourceFilePath === $sourceFileFullPath) {
                $this->error("source file full path '$sourceFileFullPath' must be different than source file path '$sourceFilePath' section");
            }

            $this->addDataLinks($dataLinksData, $sourceFilePath);
        }
        $this->checkGeneratedFilesData();

        $this->saveGeneratedFiles($this->generatedFilesData);
        $this->saveGeneratedFiles($this->personGeneratedFilesData);

        foreach ($this->unusedAssignmentTags as $filePath => $fileData) {
            foreach ($fileData as $recordId => $recordData) {
                foreach ($recordData as $linkId => $linkData) {
                    $this->error("Unassigned tags for link #$linkId in record #$recordId of file '$filePath'");
                }
            }
        }
    }

    private function addDataLinks(array $data, string $sourceFilePath): void
    {
        foreach ($data as $fieldPath => $fieldData) {
            foreach ($fieldData as $dstDirPathAlias => $dataLinks) {
                foreach ($dataLinks as $linkKey => $linkVal) {
                    $link = is_int($linkKey) ? $linkVal : $linkKey;
                    if ($link === self::DATA_LINK_SOURCE_TO_CHECK_SIGN) {
                        continue;
                    }

                    $linkData = $this->getDataLinkElements($link);
                    if (is_null($linkData)) {
                        $this->error("invalid link '$link' in file '$sourceFilePath', data-links field '$fieldPath' and directory path alias '$dstDirPathAlias'");
                    }
                    list($linkId, $dstFilePathAlias, $recordId, $showInCalendar) = $linkData;

                    if ($dstFilePathAlias === '') {
                        $dstPathAlias = $dstDirPathAlias;
                    } else {
                        $dstPathAlias = "$dstDirPathAlias/$dstFilePathAlias";
                    }
                    $dstPath = $this->getPathToRedirect($dstPathAlias);
                    $anchor = str_replace(self::PATRON_FEASTS_PATH, '#', $fieldPath);

                    $staticFilePath = $this->getDataFileSuffix($dstPath);
                    if (!$this->dataPathExists($staticFilePath)) {
                        $this->error("cannot find static file '$staticFilePath' for file '$sourceFilePath', data-links field '$fieldPath', link '$link' and directory path alias '$dstDirPathAlias'");
                    }

                    $generatedFilePath = $this->getGeneratedFileSuffix($dstPath);
                    $generatedFileFullPath = $this->getFullDataPath($generatedFilePath);

                    $staticFileData = $this->getOriginalJsonFileContentArray($staticFilePath);
                    if (!isset($this->generatedFilesData[$generatedFileFullPath][self::DATA_LINKS_GENERATED_FILES_INDEX][$recordId])) {
                        $recordData = $staticFileData[$recordId][self::POSSIBLE_NAME_INDEX] ?? $staticFileData[$recordId] ?? null;
                        if (is_null($recordData)) {
                            $this->error("cannot find static file '$staticFilePath' record with ID #$recordId for file '$sourceFilePath', data-links field '$fieldPath', link '$link' and directory path alias '$dstDirPathAlias'");
                        }

                        $standardTagListTotal = [];

                        foreach ($recordData as $recordKey => $phraseData) {
                            if (!is_int($recordKey)) {
                                $phraseData = $recordData;
                            }

                            $standardTagList = null;
                            $firstField = '';

                            foreach ($phraseData as $field => $text) {
                                if (!preg_match(self::LANGUAGE_CODE_PATTERN, $field)) {
                                    continue;
                                }
                                $text = $this->getValueWithPossibleImport($text, $field);

                                list($text, $assignmentTags) = $this->getTextWithSeparatedAssignmentTags($text);
                                if (!empty($assignmentTags)) {
                                    foreach ($assignmentTags as $tagsLinkId => $tagsData) {
                                        foreach ($tagsData as $assignKey => $assignValueArray) {
                                            foreach ($assignValueArray as $assignValue => $years) {
                                                $this->unusedAssignmentTags[$generatedFileFullPath][$recordId] = $this->consolidateAssignmentTags(
                                                    $this->unusedAssignmentTags[$generatedFileFullPath][$recordId] ?? [],
                                                    $tagsLinkId,
                                                    $assignKey,
                                                    $assignValue
                                                );
                                            }
                                        }
                                    }
                                }

                                $tagList = [];
                                $textTags = $this->getTextTags($text);
                                foreach ($textTags as list($tagFull, $tagLink, $tagValue)) {
                                    $tagList[$tagLink] = ($tagList[$tagLink] ?? 0) + 1;
                                }
                                ksort($tagList);

                                if (is_null($standardTagList)) {
                                    $standardTagList = $tagList;
                                    $firstField = $field;

                                    foreach ($tagList as $tagLink => $tagQuantity) {
                                        $standardTagListTotal[$tagLink] = ($standardTagListTotal[$tagLink] ?? 0) + $tagQuantity;
                                    }
                                } else if ($standardTagList !== $tagList) {
                                    $this->error("There are tag list differencies between text in language '$field' and '$firstField' in static file '$staticFilePath' record with ID #$recordId for file '$sourceFilePath', link '$link' and directory path alias '$dstDirPathAlias'");
                                }
                            }

                            if (!is_int($recordKey)) {
                                break;
                            }
                        }

                        foreach ($standardTagListTotal as $tagLink => $tagQuantity) {
                            if (preg_match('/^[0-9]+$/', $tagLink)) {
                                $this->generatedFilesData[$generatedFileFullPath][self::DATA_LINKS_GENERATED_FILES_INDEX][$recordId][$tagLink] = null;
                            }
                        }
                    }

                    if (isset($this->generatedFilesData[$generatedFileFullPath][self::DATA_LINKS_GENERATED_FILES_INDEX][$recordId][$linkId])) {
                        $this->error("try to override static file '$staticFilePath' record with ID #$recordId for file '$sourceFilePath', data-links field '$fieldPath', link '$link' and directory path alias '$dstDirPathAlias'");
                    }
                    $this->generatedFilesData[$generatedFileFullPath][self::DATA_LINKS_GENERATED_FILES_INDEX][$recordId][$linkId] = $sourceFilePath . $anchor;
                    $this->generatedFilesData[$generatedFileFullPath][self::IN_CALENDAR_GENERATED_FILES_INDEX][$recordId][$linkId] = $showInCalendar;

                    //assignment tags
                    $assignmentTags = $this->unusedAssignmentTags[$generatedFileFullPath][$recordId][$linkId] ?? [];
                    if (!empty($assignmentTags)) {
                        unset($this->unusedAssignmentTags[$generatedFileFullPath][$recordId][$linkId]);
                        if ($this->unusedAssignmentTags[$generatedFileFullPath][$recordId] === []) {
                            unset($this->unusedAssignmentTags[$generatedFileFullPath][$recordId]);
                            if ($this->unusedAssignmentTags[$generatedFileFullPath] === []) {
                                unset($this->unusedAssignmentTags[$generatedFileFullPath]);
                            }
                        }

                        $year = $this->getRecordYear($dstDirPathAlias, $link, $recordId);

                        $personFilePath = $this->getGeneratedFileSuffix($sourceFilePath);
                        $personFileFullPath = $this->getFullDataPath($personFilePath);

                        $structure = ($this->personGeneratedFilesData[$personFileFullPath][self::FIELDS_INDEX] ?? []);
                        $structure = [$linkId => $structure];
                        foreach ($assignmentTags as $assignKey => $assignValueArray) {
                            foreach ($assignValueArray as $assignValue => $years) {
                                $structure = $this->consolidateAssignmentTags($structure, $linkId, $assignKey, $assignValue);
                            }
                        }

                        ksort($structure[$linkId]);
                        $this->personGeneratedFilesData[$personFileFullPath][self::FIELDS_INDEX] = $structure[$linkId];
                        ksort($this->personGeneratedFilesData[$personFileFullPath][self::FIELDS_INDEX]);
                    }
                }
            }
        }
    }

    private function getFileDataLinks(array $data, string $fieldName, array $result = [], string $path = ''): array
    {
        foreach ($data as $field => $value) {
            if ($field === $fieldName) {
                $result[$path] = $value;
            } else if (is_array($value)) {
                $result = $this->getFileDataLinks($value, $fieldName, $result, trim("$path/$field", '/'));
            }
        }

        return $result;
    }

    private function checkGeneratedFilesData(): void
    {
        foreach ($this->generatedFilesData as $generatedFilePath => $pathData) {
            foreach ($pathData[self::DATA_LINKS_GENERATED_FILES_INDEX] as $recordId => $recordData) {
                foreach ($recordData as $linkId => $link) {
                    if (is_null($link)) {
                        $this->error("orphan link ID '$linkId' in generated file '$generatedFilePath' record with ID #$recordId");
                    }
                }
            }
        }
    }

    private function getRecordYear(string $pathAlias, string $link, string $recordId): string
    {
        $result = self::UNKNOWN_YEAR;
        $pattern = '~[-:]([0-9]{4})~';

        foreach ([$pathAlias, $link, $recordId] as $text) {
            if (preg_match($pattern, $text, $matches)) {
                $result = $matches[1] ?? self::UNKNOWN_YEAR;
            }
        }

        return $result;
    }
}
