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

            $fullPath = $this->getFullDataPath("$srcRootPath/$recordType");
            $paths = $this->getPathTree($fullPath);

            foreach ($paths as $path => $isDirectory) {
                $dirName = dirname($path);

                if ($isDirectory
                    || in_array($path, [
                        $this->getIndexFilePath($dirName),
                        $this->getIndexFilePath($dirName, true),
                        $this->getAliasFilePath($dirName),
                        $this->getAliasFilePath($dirName, true),
                    ])
                    || false !== strpos($path, $generatedFileSuffix)
                ) {
                    continue;
                }

                $this->validateFile($path, $pathData);
            }
        }
    }

    private function validateFile(string $filePath, array $config): void
    {
        //todo
    }
}
