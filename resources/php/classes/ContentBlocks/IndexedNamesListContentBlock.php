<?php

class IndexedNamesListContentBlock extends ContentBlock implements ContentBlockInterface
{
    private $fileData;

    private $namesKeys;
    private $itemContent;
    private $textVariables;

    public function setFileData(array $fileData): ContentBlock
    {
        $this->fileData = $fileData;

        return $this;
    }

    public function prepare(string $field): ContentBlock
    {
        $itemContent = $this->getOriginalHtmlFileContent('items/indexed-name-list-item.html');

        $baseTranslations = array_values($this->fileData[$field] ?? []);
        $translations = $this->getTranslationsWithDuplicatedRowsForAlternatives($baseTranslations);

        $language = $this->getLanguage();
        $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        $this->field = $field;
        $this->namesKeys = array_keys($translations);
        $this->itemContent = $itemContent;
        $this->textVariables = $textVariables;

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $namesKeys = $this->namesKeys;
        if ($namesKeys === []) {
            return self::NON_EXISTENCE;
        }

        $wasBeforeContents = [];
        $contents = [];
        foreach ($namesKeys as $recordId) {
            $content = $this->getRecordContent($recordId);
            if (!isset($wasBeforeContents[$content])) {
                $contents[] = $content;
                $wasBeforeContents[$content] = true;
            }
        }

        $mainContent = self::VARIABLE_NAME_SIGN . 'records' . self::MODIFIER_SEPARATOR . self::MODIFIER_COMMA_SEPARATED_LIST . self::VARIABLE_NAME_SIGN;
        $variables = [
            'records' => $contents,
        ];

        return $this->getReplacedContent($mainContent, $variables);
    }

    public function getRecordContent(string $recordId): string
    {
        $rootPath = self::INDEXES_ROOT_PATH;
        $itemContent = $this->itemContent;
        $textVariables = $this->textVariables;
        $field = $this->field;

        $nameVariable = self::VARIABLE_NAME_SIGN . $recordId . self::VARIABLE_NAME_SIGN;
        $translatedName = $this->getReplacedContent($nameVariable, $textVariables, true);
        $nameHash = $this->getNameHash($this->stripTags($translatedName));
        $link = "$rootPath/$field/$nameHash";

        $variables = [
            'href' => $this->getRecordIdPathWithNameExtension($link, $translatedName),
            'name' => $translatedName,
        ];

        return $this->getReplacedContent($itemContent, $variables);
    }

    private function getTranslationsWithDuplicatedRowsForAlternatives(array $translations): array
    {
        $result = [];

        foreach ($translations as $row) {
            $maxCount = 0;
            foreach ($row as $language => $names) {
                $count = !is_array($names) ? 1 : count($names);
                if ($count > $maxCount) {
                    $maxCount = $count;
                }
            }

            for ($i = 0; $i < $maxCount; $i++) {
                $rowToAdd = [];
                foreach ($row as $language => $names) {
                    $rowToAdd[$language] = !is_array($names) ? $names : $names[$i] ?? $names[0];
                }

                $result[] = $rowToAdd;
            }
        }

        return $result;
    }
}
