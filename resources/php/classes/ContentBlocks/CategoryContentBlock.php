<?php

class CategoryContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const CATEGORIES_PATH = '/records/categories';
    private const INDEXES_PATH = self::INDEXES_ROOT_PATH . '/categories';

    private const DESCRIPTION_INDEX = 'description';
    private const COLOR_INDEX = 'color';

    private const MISSING_CATEGORY_COLOR = 'transparent';

    private const TRANSLATED_INDEXES = [
        self::DESCRIPTION_INDEX,
    ];

    private $fileData;
    private $textVariables;

    public function prepare(string $path = self::CATEGORIES_PATH): ContentBlock
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
        $mainContent = $this->getOriginalHtmlFileContent('content-blocks/category-content-block.html');

        $fileData = $this->fileData;
        $textVariables = $this->textVariables;

        $categoryName = $this->stripTags($translatedName);

        $variables = [];
        $variables['category-color'] = $fileData[self::MAIN_FILE_DATA_INDEX][self::COLOR_INDEX] ?? self::MISSING_CATEGORY_COLOR;
        $variables['category-name'] = $translatedName;
        $variables['link-to-indexes'] = self::INDEXES_PATH . '/' . $this->getNameHash($categoryName);

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
                $result["category-$key"] = $values;
            }
        }

        return $result;
    }
}
