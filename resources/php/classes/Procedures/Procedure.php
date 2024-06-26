<?php

class Procedure extends Base
{
    private const ERROR_MESSAGE_PREFIX = 'ERROR! ';

    private const PERSONS_DATA_FILE_PATH = 'generated/persons-data' . self::GENERATED_FILE_NAME_SUFFIX . self::DATA_FILE_EXTENSION;

    protected function print($data): void
    {
        echo $this->getDate()->getCurrentDateTime() . ' [' . get_called_class() . '] ' . print_r($data, true) . "\n";
    }

    protected function error(string $message): void
    {
        $this->print(self::ERROR_MESSAGE_PREFIX . $message);

        throw new GeneratorException($message);
    }

    protected function getFullDataPath(string $dataPath): string
    {
        return '/' . $this->getEnvironment()->getTidyPath($this->getPath()->getDataPath($dataPath));
    }

    protected function getPathTree(string $path): array
    {
        $result = [rtrim($path, '/') => $this->getFile()->isDirectory($path)];

        $elements = $this->getFile()->getList($path);
        foreach ($elements as $elementPath) {
            if ($this->getFile()->isDirectory($elementPath)) {
                $result = array_merge($result, $this->getPathTree($elementPath));
            } else {
                $result[$elementPath] = false;
            }
        }

        return $result;
    }

    protected function getPathDirectories(string $path): array
    {
        $result = [];

        $elements = $this->getFile()->getList($path);
        foreach ($elements as $elementPath) {
            if ($this->getFile()->isDirectory($elementPath)) {
                $result[$elementPath] = true;
            }
        }

        return $result;
    }

    protected function setJsonFileContentFromArray(string $fullFilePath, array $data): bool
    {
        $content = $this->getJson()->encode($data);
        $bytesSaved = (int) $this->getFile()->setFileContent($fullFilePath, $content);

        return ($bytesSaved > 0);
    }

    protected function saveGeneratedFiles(array $generatedFilesData, bool $ignoreExistingFiles = false): void
    {
        foreach ($generatedFilesData as $path => $content) {
            if (!$ignoreExistingFiles && $this->getFile()->exists($path)) {
                $this->error("Try to create existing generated file '$path'");
            } else if (!$this->setJsonFileContentFromArray($path, $content)) {
                $this->error("Write file error for path '$path'");
            }
        }
    }

    protected function getFileNameWithoutExtension(string $fullPath): string
    {
        $result = basename($fullPath);

        return preg_replace('/^([^.]+)[.].*$/', '\\1', $result);
    }

    protected function getPersonsData(): array
    {
        return $this->getOriginalJsonFileContentArray(self::PERSONS_DATA_FILE_PATH);
    }
}
