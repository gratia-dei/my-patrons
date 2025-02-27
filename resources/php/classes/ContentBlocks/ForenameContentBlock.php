<?php

class ForenameContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const FORENAMES_PATH = '/records/forenames';
    private const INDEXES_PATH = self::INDEXES_ROOT_PATH . '/forenames';

    private const NAMES_INDEX = 'names';

    private const TRANSLATED_INDEXES = [
    ];
    private const TRANSLATED_INDEXES_WITH_MULTIPLE_VALUES = [
        self::NAMES_INDEX,
    ];

    private $fileData;
    private $textVariables;

    public function prepare(string $path = self::FORENAMES_PATH): ContentBlock
    {
        $fileData = $this->getConsolidatedDataFilesArray($path);

        $translations = $this->getPreparedTranslations($fileData[self::MAIN_FILE_DATA_INDEX] ?? []);
        $language = $this->getLanguage();
        $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        $this->fileData = $fileData;
        $this->textVariables = $textVariables;

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $mainContent = $this->getOriginalHtmlFileContent('content-blocks/forename-content-block.html');

        $fileData = $this->fileData;
        $textVariables = $this->textVariables;

        $forenameName = $this->stripTags($translatedName);

        $variables = [];
        $variables['forename'] = $translatedName;
        $variables['link-to-indexes'] = self::INDEXES_PATH . '/' . $this->getNameHash($forenameName);

        $mainContent = $this->getReplacedContent($mainContent, $variables);

        return $this->getReplacedContent($mainContent, $textVariables, true);
    }

    public function getRecordContent(string $recordId): string
    {
        //noop
    }

    private function getPreparedTranslations(array $data): array
    {
        $result = [];

        foreach ($data as $key => $values) {
            if (in_array($key, self::TRANSLATED_INDEXES)) {
                $result["forename-$key"] = $values;
            }
            if (in_array($key, self::TRANSLATED_INDEXES_WITH_MULTIPLE_VALUES)) {
                foreach ($values as $lang => $langValue) {
                    if (!is_array($langValue)) {
                        $langValue = [$langValue];
                    }
                    $result["forename-$key"][$lang] = $langValue;
                }
            }
        }

        return $result;
    }
}
