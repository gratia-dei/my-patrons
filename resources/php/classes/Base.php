<?php

abstract class Base
{
    private $date;
    private $environment;
    private $file;
    private $json;
    private $path;
    private $sort;
    private $movableFeastBase;

    protected const SELECTABLE_LANGUAGES_ORDER = ['en', 'la', 'pl'];

    protected const PATRON_NAMES_INDEX = 'names';
    protected const PATRON_FEASTS_INDEX = 'feasts';
    protected const PATRON_DIED_INDEX = 'died';
    protected const PATRON_ANNIVERSARY_INDEX = 'anniversary';
    protected const PATRON_FEASTS_PATH = self::PATRON_FEASTS_INDEX . '/';
    protected const INDEXES_ROOT_PATH = '/indexes';

    protected const DATA_FIELD_ACTIVE = 'active';

    protected const LEAP_YEARS_ONLY_SEPARATOR = 'b';
    protected const NO_LEAP_YEARS_ONLY_SEPARATOR = 'n';
    protected const ALL_YEARS_SEPARATOR = '-';

    protected const FEAST_ID_SEPARATOR = '@';

    protected const DATES_DATA_PATRON_RECORD_NAME_INDEX = 'name';
    protected const DATES_DATA_PATRON_RECORD_SOURCES_INDEX = 'sources';
    protected const EXTERNAL_NAMES_DATA_NAME_INDEX = 'name';

    protected const GENERATED_FILE_NAME_SUFFIX = '.generated';
    protected const DATA_FILE_EXTENSION = '.json';

    protected const VARIABLE_NAME_SIGN = '#';
    protected const LANG_VARIABLE_PREFIX = 'lang-';

    protected const DATA_LINKS_GENERATED_FILES_INDEX = 'data-links';

    protected const DELETED_RECORD_TAG = '[x]';

    protected const HTML_TAG_BR = '<br />';

    protected const RECORD_ID_WITH_NAME_EXTENSION_SEPARATOR = '--';
    private const RECORD_ID_NAME_EXTENSION_CHARACTERS_MAPPING = [
        ' ' => '-',
        '/' => '',
        '?' => '',
        '#' => '',
        '.' => '',
        ',' => '',
    ];

    protected const MAIN_PAGE_PARAM = '?mode=home';

    public function __construct()
    {
        $this->date = new Date();
        $this->environment = new Environment();
        $this->file = new File();
        $this->json = new Json();
        $this->path = new Path();
        $this->sort = new Sort();
        $this->movableFeastBase = new MovableFeastBase();
    }

    protected function getDate(): Date
    {
        return $this->date;
    }

    protected function getEnvironment(): Environment
    {
        return $this->environment;
    }

    protected function getFile(): File
    {
        return $this->file;
    }

    protected function getJson(): Json
    {
        return $this->json;
    }

    protected function getPath(): Path
    {
        return $this->path;
    }

    protected function getSort(): Sort
    {
        return $this->sort;
    }

    protected function getMovableFeastBase(): MovableFeastBase
    {
        return $this->movableFeastBase;
    }

    protected function getOriginalJsonFileContentArrayForFullPath(string $jsonFilePath): array
    {
        $content = $this->getFile()->getFileContent($jsonFilePath);

        return $this->getJson()->decode($content);
    }

    protected function getOriginalJsonFileContentArray(string $jsonFileName): array
    {
        $jsonPath = $this->getPath()->getDataPath($jsonFileName);

        return $this->getOriginalJsonFileContentArrayForFullPath($jsonPath);
    }

    protected function getDataFileSuffix(string $path = ''): string
    {
        return $path . self::DATA_FILE_EXTENSION;
    }

    protected function getGeneratedFileSuffix(string $path = ''): string
    {
        return $path . self::GENERATED_FILE_NAME_SUFFIX . $this->getDataFileSuffix();
    }

    protected function getIndexFilePath(string $path, bool $forGeneratedFile = false): string
    {
        return $path . '/index' . ($forGeneratedFile ? self::GENERATED_FILE_NAME_SUFFIX : '') . self::DATA_FILE_EXTENSION;
    }

    protected function getAliasFilePath(string $path, bool $forGeneratedFile = false): string
    {
        return $path . '/alias' . ($forGeneratedFile ? self::GENERATED_FILE_NAME_SUFFIX : '') . self::DATA_FILE_EXTENSION;
    }

    protected function getPathToRedirect(string $originalPath): string
    {
        $path = $this->getRequestPathRecordIdOnly($originalPath);
        $nameExtension = mb_substr($originalPath, mb_strlen($path));
        $feastId = '';

        $feastIdSeparatorPosition = strpos($path, self::FEAST_ID_SEPARATOR);
        if ($feastIdSeparatorPosition !== false) {
            $feastId = substr($path, $feastIdSeparatorPosition);
            $path = substr($path, 0, $feastIdSeparatorPosition);
        }

        if ($this->dataPathExists($path) || $this->dataPathExists($path . self::DATA_FILE_EXTENSION)) {
            return '';
        }

        $wasPathChanged = false;
        $pathElements = explode('/', $path);
        $pathCount = count($pathElements);
        for ($element = 1; $element <= $pathCount; $element++) {
            $tmpPath = implode('/', array_slice($pathElements, 0, $element));
            $basename = $pathElements[$element - 1];

            if (!$this->dataPathExists($tmpPath)) {
                $aliasFilePath = $this->getAliasFilePath(dirname($tmpPath));
                if (!$this->dataPathExists($aliasFilePath)) {
                    $aliasFilePath = $this->getAliasFilePath(dirname($tmpPath), true);
                    if (!$this->dataPathExists($aliasFilePath)) {
                        break;
                    }
                }

                $aliasData = $this->getOriginalJsonFileContentArray($aliasFilePath);
                if (!isset($aliasData[$basename])) {
                    break;
                }

                if ($basename !== $aliasData[$basename]) {
                    $pathElements[$element - 1] = $aliasData[$basename];
                    $wasPathChanged = true;
                }
            }
        }

        if ($wasPathChanged) {
            $pathToRedirect = implode('/', $pathElements);
            $pathToRedirect = preg_replace('~[/]+~', '/', '/' . $pathToRedirect);

            if (($aliasData[trim($path, '/')] ?? '') === $pathToRedirect
                || $this->dataPathExists($pathToRedirect)
                || $this->dataPathExists($pathToRedirect . self::DATA_FILE_EXTENSION)
            ) {
                return $pathToRedirect . $feastId . $nameExtension;
            }
        }

        return '';
    }

    protected function dataPathExists(string $path): bool
    {
        $dataPath = $this->getPath()->getDataPath($path);

        return $this->getFile()->exists($dataPath);
    }

    protected function getDataLinkElements(string $link): ?array
    {
        if (!preg_match("/^(?'link_id'[1-9][0-9]*)[:](?'path'[^# ]*)[#](?'record_id'[1-9A-Za-z][-0-9A-Za-z]*)$/", $link, $matches)) {
            return null;
        }

        $linkId = (int) $matches['link_id'];
        $path = $matches['path'];
        $recordId = $matches['record_id'];

        return [$linkId, $path, $recordId];
    }

    protected function getTextTags(string $text): array
    {
        $result = [];

        preg_match_all("/\[(?'link'[^ \|]+)[|](?'value'[^|]+)\]/U", $text, $matches);
        foreach ($matches[0] ?? [] as $key => $tag) {
            $value = $matches['value'][$key];
            $link = $matches['link'][$key];

            $result[$key] = [$tag, $link, $value];
        }

        return $result;
    }

    protected function getRequestPathRecordIdOnly(string $requestPath): string
    {
        return preg_replace('~(/[-' . self::FEAST_ID_SEPARATOR . '0-9a-zA-Z]+)' . self::RECORD_ID_WITH_NAME_EXTENSION_SEPARATOR . '[^/]*$~U', '\1', $requestPath);
    }

    protected function getRecordIdPathWithNameExtension(string $path, string $name): string
    {
        $charsFrom = array_keys(self::RECORD_ID_NAME_EXTENSION_CHARACTERS_MAPPING);
        $charsTo = array_values(self::RECORD_ID_NAME_EXTENSION_CHARACTERS_MAPPING);

        $extension = $name;
        $extension = $this->stripTags($extension);
        if (mb_substr($extension, 0, 1) === self::VARIABLE_NAME_SIGN
            && mb_substr($extension, -1) === self::VARIABLE_NAME_SIGN
        ) {
            $extension = '';
        }
        $extension = mb_strtolower($extension);
        $extension = str_replace($charsFrom, $charsTo, $extension);
        $extension = urlencode($extension);

        return preg_replace(
            '~(/[-' . self::FEAST_ID_SEPARATOR . '0-9A-Za-z]+|/[0-9a-f]{32})([?#].*)?$~',
            '\1' . ($extension === '' ? '' : self::RECORD_ID_WITH_NAME_EXTENSION_SEPARATOR . $extension) . '\2',
            $path
        );
    }

    protected function getNameHash(string $name): string
    {
        return md5($name);
    }

    protected function getAllMainLanguageValues(array $data): array
    {
        $result = [];

        foreach ($data as $language => $valueData) {
            if (is_array($valueData)) {
                $result[$language] = reset($valueData);
            } else {
                $result[$language] = $valueData;
            }
        }

        return $result;
    }

    protected function getValueWithPossibleImport($value, string $language)
    {
        if (is_string($value) && preg_match("~^\[\^(?'path'[-/a-zA-Z0-9.]+)[#](?'index'[-/a-zA-z0-9]+)\]$~", $value, $matches)) {
            $path = $this->getPathToRedirect($matches['path']);
            $indexArr = explode('/', $matches['index'] . '/' . $language);

            $dataPath = $this->getDataFileSuffix($path);
            $content = $this->getOriginalJsonFileContentArray($dataPath);

            foreach ($indexArr as $field) {
                $content = $content[$field] ?? null;
            }
            if ($content !== null && is_string($content)) {
                $value = $content;
            }
        }

        return $value;
    }
}
