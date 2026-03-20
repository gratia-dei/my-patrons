<?php

class RecordsFieldsValidationProcedure extends Procedure
{
    private const CONFIGURATION_FILE_PATH = 'records-fields-validation-configuration.json';

    public function run(string $srcRootPath): void
    {
        $config = $this->getOriginalJsonFileContentArray(self::CONFIGURATION_FILE_PATH);

        foreach ($config as $recordType => $pathData) {
            if (!is_array($pathData)) {
                $pathData = $config[$pathData] ?? [];
            }

            $generatedFileSuffix = $this->getGeneratedFileSuffix();
            $fullRootPath = $this->getFullDataPath($srcRootPath);
            $fullPath = "$fullRootPath/$recordType";

            $paths = $this->getPathTree($fullPath);
            foreach ($paths as $staticFilePath => $isDirectory) {
                $dirName = dirname($staticFilePath);

                if ($isDirectory
                    || in_array($staticFilePath, [
                        $this->getIndexFilePath($dirName),
                        $this->getIndexFilePath($dirName, true),
                        $this->getAliasFilePath($dirName),
                        $this->getAliasFilePath($dirName, true),
                    ])
                    || false !== strpos($staticFilePath, $generatedFileSuffix)
                ) {
                    continue;
                }

                $extensionDotPosition = strrpos($staticFilePath, '.');
                $staticFilePathWithoutExtension = mb_substr($staticFilePath, 0, $extensionDotPosition);
                $generatedFilePath = $this->getGeneratedFileSuffix($staticFilePathWithoutExtension);

                $staticData = $this->getOriginalJsonFileContentArrayForFullPath($staticFilePath);
                $generatedData = $this->getOriginalJsonFileContentArrayForFullPath($generatedFilePath)[self::FIELDS_INDEX] ?? [];

                $shortFilePath = mb_substr($staticFilePathWithoutExtension, mb_strlen($fullRootPath) + 1);

                $this->validateFile($shortFilePath, $staticData, $generatedData, $pathData);
            }
        }
    }

    private function validateFile(string $sourceFilePath, array $staticData, array $generatedData, array $configData): void
    {
        $configFields = $this->getConfigFields($configData);

        $this->validate($sourceFilePath, $configFields, $staticData);
    }

    private function getConfigFields(array $configData): array
    {
        $result = [];

        foreach ($configData as $fieldName => $fieldConfig) {
            $fieldPath = explode('/', $fieldName);

            $target = &$result;
            foreach ($fieldPath as $element) {
                if (!isset($target[$element])) {
                    $target[$element] = [];
                }
                $target = &$target[$element];
            }
        }

        return $result;
    }

    private function validate(string $filePath, array $configFieldsContext, mixed $staticDataContext, string $fieldPath = ''): void
    {
        foreach ($configFieldsContext as $subfield => $subFields) {
            if (!array_key_exists($subfield, $staticDataContext)) {
                $this->error("Missing field path '$fieldPath/$subfield' in source file '$filePath'");
            }
            $this->validate($filePath, $configFieldsContext[$subfield], $staticDataContext[$subfield] ?? null, $fieldPath . '/' . $subfield);
            unset($staticDataContext[$subfield]);
        }
    }
}
