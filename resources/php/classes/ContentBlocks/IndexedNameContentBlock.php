<?php

class IndexedNameContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const NAME_TYPES = [
        'categories' => 'lang-category',
        'epithets' => 'lang-epithet',
        'forenames' => 'lang-forename',
        'surnames' => 'lang-surname',
    ];

    private const FIELD_LINKS = 'links';
    private const FIELD_NAMES = 'names';
    private const FIELD_TRANSLATIONS = 'translations';

    private $path;
    private $fileData;

    public function prepare(string $path): ContentBlock
    {
        $filePath = $this->getGeneratedFileSuffix($path);
        $fileData = $this->getOriginalJsonFileContentArray($filePath);

        $this->path = $path;
        $this->fileData = $fileData;

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $mainContent = $this->getOriginalHtmlFileContent('content-blocks/indexed-name-content-block.html');
        $path = $this->path;
        $fileData = $this->fileData;

        $nameTypeVariableName = self::NAME_TYPES[basename(dirname($path))] ?? self::INVALID_SIGN;
        $nameTypeVariable = self::VARIABLE_NAME_SIGN . $nameTypeVariableName . self::MODIFIER_SEPARATOR . self::MODIFIER_CAPITALIZE . self::VARIABLE_NAME_SIGN;

        $variables = [
            'type' => $nameTypeVariable,
            'name' => $translatedName,
            'language-codes' => $this->getSortedLanguagesCodesList($fileData),
            'translations' => $this->getTranslationsContent($fileData, $path),
            'links' => $this->getLinksContent($fileData),
        ];

        return $this->getReplacedContent($mainContent, $variables);
    }

    public function getRecordContent(string $recordId): string
    {
        //not to use at this case
    }

    private function getSortedLanguagesCodesList(array $fileData): array
    {
        $namesData = $fileData[self::FIELD_NAMES] ?? [];

        $result = array_keys($namesData);
        sort($result);

        return $result;
    }

    private function getConvertedLinkUrl(string $url): string
    {
        return str_replace('/', '-', $url);
    }

    private function getLinksContent(array $fileData): string
    {
        $result = '';

        $data = $fileData[self::FIELD_LINKS] ?? [];
        $recordContent = $this->getOriginalHtmlFileContent('items/indexed-name-links-list-item.html');

        $linksTranslations = [];
        foreach ($data as $url => $names) {
            $key = $this->getConvertedLinkUrl($url);
            $linksTranslations[$key] = $names;
        }
        $language = $this->getLanguage();
        $linksTextVariables = $this->getTranslatedVariablesForLangData($language, $linksTranslations);

        $dataToSort = [];
        foreach ($data as $url => $names) {
            $variable = self::VARIABLE_NAME_SIGN . $this->getConvertedLinkUrl($url) . self::VARIABLE_NAME_SIGN;
            $translatedName = $this->getReplacedContent($variable, $linksTextVariables, true);
            $translatedNameWithoutTags = $this->stripTags($translatedName);
            $dataToSort[$translatedNameWithoutTags] = [$url, $translatedName];
        }

        $sortedData = $this->getNaturalSortedListByKeys($dataToSort);
        foreach ($sortedData as $key => list($url, $translatedName)) {
            $variables = [
                'href' => $this->getRecordIdPathWithNameExtension('/' . $url, $translatedName),
                'name' => $translatedName,
            ];
            $result .= $this->getReplacedContent($recordContent, $variables);
        }

        return $result;
    }

    private function getTranslationsContent(array $fileData, string $path): string
    {
        $result = '';

        $recordContent = $this->getOriginalHtmlFileContent('items/indexed-name-translations-list-item.html');
        $languagesVariables = $this->getTranslatedLanguagesVariables();
        $data = $fileData[self::FIELD_TRANSLATIONS] ?? [];

        $dataToSort = [];
        foreach ($data as $languageCode => $linkNames) {
            if (!is_array($linkNames)) {
                $linkNames = [$linkNames];
            }

            foreach ($linkNames as $linkName) {
                $variable = self::VARIABLE_NAME_SIGN . $languageCode . self::VARIABLE_NAME_SIGN;
                $translatedLanguageName = $this->getReplacedContent($variable, $languagesVariables, true);
                $translatedLanguageNameWithoutTags = $this->stripTags($translatedLanguageName);
                $dataToSort[$translatedLanguageNameWithoutTags . '|' . $linkName] = [$languageCode, $translatedLanguageName, $linkName];
            }
        }

        $sortedData = $this->getNaturalSortedListByKeys($dataToSort);
        foreach ($sortedData as $key => list($languageCode, $languageName, $linkName)) {
            $link = dirname($path) . '/' . $this->getNameHash($linkName);
            $variables = [
                'language-name' => $languageName,
                'language-code' => $languageCode,
                'href' => $this->getRecordIdPathWithNameExtension($link, $linkName),
                'name' => $linkName,
            ];
            $result .= $this->getReplacedContent($recordContent, $variables);
        }

        return $result;
    }
}
