<?php

class GenerateGroupedDataIndexFilesProcedure extends Procedure
{
    private const FIELD_NAMES = 'names';
    private const FIELD_TRANSLATIONS = 'translations';
    private const FIELD_LINKS = 'links';
    private const FIELD_LANGUAGES = 'languages';

    private const RECORDS_ROOT_PATH = '/records';

    private const DATA_CONVERSION_METHODS = [
        'categories' => 'getConvertedRecordTypeData',
        'forenames' => 'getConvertedRecordTypeData',
    ];

    private $recordsData = [];

    public function run(string $dataPath, string $dataField, string $destinationPath): void
    {
        $rootPath = $this->getFullDataPath($dataPath);
        $fullDataPath = $this->getPath()->getDataPath();

        $paths = $this->getPathTree($rootPath);
        foreach ($paths as $fullSourceFilePath => $isDirectory) {
            $directoryPath = dirname($fullSourceFilePath);

            if ($isDirectory || in_array($fullSourceFilePath, [
                $this->getIndexFilePath($directoryPath),
                $this->getAliasFilePath($directoryPath),
                $this->getIndexFilePath($directoryPath, true),
                $this->getAliasFilePath($directoryPath, true),
            ])) {
                continue;
            }

            $fileData = $this->getOriginalJsonFileContentArrayForFullPath($fullSourceFilePath);
            $fieldData = $fileData[$dataField] ?? [];

            $dataConversionMethod = self::DATA_CONVERSION_METHODS[$dataField] ?? null;
            if (!is_null($dataConversionMethod)) {
                $fieldData = $this->$dataConversionMethod($dataField, $fieldData, $fullSourceFilePath);
            }

            foreach ($fieldData as $row) {
                if (gettype($row) === 'string') {
                    $this->error("Invalid non-array structure of '$dataField' for '$row' in $fullSourceFilePath");
                }

                foreach ($row as $language => $names) {
                    if (!is_array($names)) {
                        $names = [$names];
                    }

                    foreach ($names as $name) {
                        $sourceObjectUrl = str_replace([$fullDataPath, self::DATA_FILE_EXTENSION], '', $fullSourceFilePath);
                        $this->saveGroupedDataIndexFile($sourceObjectUrl, $destinationPath, $language, $name, $row);
                    }
                }
            }
        }
    }

    private function getRecordDataWithCache($recordType, $recordId): array
    {
        if (!isset($this->recordsData[$recordType][$recordId])) {
            $filePath = $this->getDataFileSuffix(self::RECORDS_ROOT_PATH . "/$recordType/$recordId");
            $this->recordsData[$recordType][$recordId] = $this->getOriginalJsonFileContentArray($filePath);
        }

        return $this->recordsData[$recordType][$recordId] ?? [];
    }

    private function getConvertedRecordTypeData(string $recordType, array $data, string $sourceFilePath): array
    {
        $result = [];

        foreach ($data as $recordId) {
            $recordData = $this->getRecordDataWithCache($recordType, $recordId);

            if (empty($recordData)) {
                $this->error("Unknown '$recordType' record ID '$recordId' for '$sourceFilePath'");
            }

            $result[] = $recordData[self::FIELD_NAMES] ?? [];
        }

        return $result;
    }

    private function saveGroupedDataIndexFile(
        string $sourceObjectUrl,
        string $destinationPath,
        string $language,
        string $name,
        array $otherNamesList
    ): void {
        $fullDestinationPath = $this->getFullDataPath($destinationPath);

        $nameHash = $this->getNameHash($name);
        $destinationFilePath = $this->getGeneratedFileSuffix($nameHash);
        $fullDestinationFilePath = "$fullDestinationPath/$destinationFilePath";

        $fileData = $this->getOriginalJsonFileContentArrayForFullPath($fullDestinationFilePath);
        $fileData[self::FIELD_NAMES][$language] = $name;
        foreach ($otherNamesList as $otherLanguage => $otherNames) {
            if (!is_array($otherNames)) {
                $otherNames = [$otherNames];
            }

            foreach ($otherNames as $otherName) {
                if (!in_array($otherName, $fileData[self::FIELD_TRANSLATIONS][$otherLanguage] ?? [])) {
                    $fileData[self::FIELD_TRANSLATIONS][$otherLanguage][] = $otherName;
                }
            }
        }
        $fileData[self::FIELD_LINKS][] = $sourceObjectUrl;

        $this->setJsonFileContentFromArray($fullDestinationFilePath, $fileData);
    }
}
