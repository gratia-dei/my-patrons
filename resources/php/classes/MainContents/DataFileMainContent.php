<?php

class DataFileMainContent extends MainContent implements MainContentInterface
{
    private $path;
    private $fileNameTranslated;
    private $contentBlockClass;

    public function configure(string $path): bool
    {
        $path = preg_replace('/' . self::FEAST_ID_SEPARATOR . '[0-9a-zA-Z]+/', '', $path);
        $directoryPath = dirname($path);

        $filePath = $this->getDataFileSuffix($path);
        $generatedFilePath = $this->getGeneratedFileSuffix($path);

        if (in_array($filePath, [
            $this->getIndexFilePath($directoryPath),
            $this->getAliasFilePath($directoryPath),
        ])) {
            return false;
        }

        if (!$this->dataPathExists($filePath) && !$this->dataPathExists($generatedFilePath)) {
            return false;
        }

        $language = $this->getLanguage();
        $indexFilePath = $this->getIndexFilePath($directoryPath . '/');
        $indexVariables = $this->getTranslatedVariables($language, $indexFilePath);
        if (empty($indexVariables)) {
            $indexFilePath = $this->getIndexFilePath($directoryPath . '/', true);
            $indexVariables = $this->getTranslatedVariables($language, $indexFilePath);
        }

        $contentBlockClass = null;
        $contentBlockRouting = $this->getOriginalJsonFileContentArray('data-file-content-block-configuration.json');
        foreach ($contentBlockRouting as $routingPath => $classForPath) {
            if (
                strpos($directoryPath, $routingPath) === 0
                || $directoryPath . '/' === $routingPath
                || $path . '/' === $routingPath
            ) {
                $contentBlockClass = $classForPath;
                break;
            }
        }
        if (is_null($contentBlockClass)) {
            return false;
        }

        $this->path = $path;
        $this->fileNameTranslated = $this->getFileNameTranslated($path, $indexVariables);
        $this->contentBlockClass = $contentBlockClass;

        return true;
    }

    public function getTitle(string $prefix): string
    {
        return $prefix . ': ' . $this->fileNameTranslated;
    }

    public function getContent(): string
    {
        $originalContent = $this->getOriginalHtmlFileContent('main-contents/data-file-main-content.html');

        $variables = [
            'file-name' => $this->fileNameTranslated,
            'content' => $this->getDataFileContent(),
        ];
        $replacedContent = $this->getReplacedContent($originalContent, $variables);

        return $replacedContent;
    }

    private function getFileNameTranslated(string $path, array $indexVariables): string
    {
        $fileNameVariable = self::VARIABLE_NAME_SIGN . basename($path) . self::VARIABLE_NAME_SIGN;
        $translatedFileName = $this->getReplacedContent($fileNameVariable, $indexVariables, true);

        return $translatedFileName;
    }

    private function getDataFileContent(): string
    {
        $path = $this->path;
        $fileNameTranslated = $this->fileNameTranslated;

        return (new $this->contentBlockClass())->prepare($path)->getFullContent($fileNameTranslated);
    }
}
