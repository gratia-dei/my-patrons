<?php

class PatronContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const NAMES_INDEX = self::PATRON_NAMES_INDEX;
    private const FEASTS_INDEX = self::PATRON_FEASTS_INDEX;

    private const TRANSLATED_INDEXES = [
        self::NAMES_INDEX,
    ];
    private const FEASTS_TRANSLATED_INDEXES = [
        self::NAMES_INDEX,
    ];

    private const RECORDS_ROOT_PATH = 'records';

    private $dataLinksContentBlock;
    private $galleryContentBlock;
    private $indexedNamesListContentBlock;

    private $path;
    private $feastRecordContent;
    private $textVariables;

    public function __construct()
    {
        $this->dataLinksContentBlock = new DataLinksContentBlock();
        $this->galleryContentBlock = new GalleryContentBlock();
        $this->indexedNamesListContentBlock = new IndexedNamesListContentBlock();

        parent::__construct();
    }

    public function prepare(string $path): ContentBlock
    {
        $feastRecordContent = $this->getOriginalHtmlFileContent('items/patron-feast-record-item.html');

        $this->prepareConsolidatedDataFilesArray($path);

        $translations = $this->getPreparedTranslations($this->getMainFileData());
        $language = $this->getLanguage();
        $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        $this->path = $path;
        $this->feastRecordContent = $feastRecordContent;
        $this->textVariables = $textVariables;

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $mainContent = $this->getOriginalHtmlFileContent('content-blocks/patron-content-block.html');
        $mainFileData = $this->getMainFileData();
        $textVariables = $this->textVariables;

        $variables = [];
        $variables['date-of-birth'] = $this->getFormattedDates($mainFileData['born'] ?? self::UNKNOWN_SIGN);
        $variables['date-of-death'] = $this->getFormattedDates($mainFileData[self::PATRON_DIED_INDEX] ?? self::UNKNOWN_SIGN);
        $variables['beatification'] = $this->getDateWithType($mainFileData['beatified'] ?? []);
        $variables['canonization'] = $this->getDateWithType($mainFileData['canonized'] ?? []);
        $variables['anniversaries-days'] = $this->getFormattedMonthsWithDays($mainFileData[self::PATRON_ANNIVERSARY_INDEX] ?? []);
        $variables['order'] = empty($mainFileData['order'] ?? []) ? self::NON_EXISTENCE : $mainFileData['order'];
        $variables['order-founder'] = empty($mainFileData['order-founder'] ?? []) ? self::NON_EXISTENCE : $mainFileData['order-founder'];
        $variables['categories'] = $this->getRecordTypeElementsList($mainFileData['categories'] ?? [], 'categories');
        $variables['forenames'] = $this->getRecordTypeElementsList($mainFileData['forenames'] ?? [], 'forenames');
        $variables['surnames'] = $this->getIndexedNamesList('surnames');
        $variables['epithets'] = $this->getIndexedNamesList('epithets');
        $variables['gallery'] = $this->getGalleryContent();

        $dataLinksTableName = self::VARIABLE_NAME_SIGN . self::NAMES_INDEX . self::MODIFIER_SEPARATOR . self::MODIFIER_FIRST_ELEMENT . self::VARIABLE_NAME_SIGN;
        $variables['data-links-content-block'] = $this->getDataLinksContent($dataLinksTableName);

        $feastsItemsContent = '';
        foreach ($mainFileData[self::FEASTS_INDEX] ?? [] as $recordId => $recordData) {
            $feastsItemsContent .= $this->getRecordContent($recordId);
        }
        $variables['feasts-items'] = $feastsItemsContent;

        $mainContent = $this->getReplacedContent($mainContent, $variables);

        return $this->getReplacedContent($mainContent, $textVariables, true);
    }

    public function getRecordContent(string $recordId): string
    {
        $mainFileData = $this->getMainFileData();
        $feastRecordContent = $this->feastRecordContent;

        $variables = [];
        $variables['record-id'] = $recordId;
        $variables['record-activeness-class'] = $this->getRecordActivenessClass($recordId);

        $dataLinksTableName = self::VARIABLE_NAME_SIGN . $this->getPreparedTranslationRecordKey(self::NAMES_INDEX, $recordId) . self::MODIFIER_SEPARATOR . self::MODIFIER_FIRST_ELEMENT . self::VARIABLE_NAME_SIGN;
        $variables['data-links-content-block'] = $this->getDataLinksContent($dataLinksTableName, self::PATRON_FEASTS_PATH . $recordId);

        return $this->getReplacedContent($feastRecordContent, $variables);
    }

    private function getPreparedTranslations(array $data): array
    {
        $result = [];

        foreach ($data as $key => $values) {
            if (in_array($key, self::TRANSLATED_INDEXES)) {
                $result[$key] = $values;
            }
        }

        foreach ($data[self::FEASTS_INDEX] ?? [] as $recordId => $recordData) {
            $feastFileData = $this->getSubFileData('feasts', $recordId);

            foreach ($feastFileData as $key => $values) {
                if (in_array($key, self::FEASTS_TRANSLATED_INDEXES)) {
                    $preparedKey = $this->getPreparedTranslationRecordKey($key, $recordId);
                    $result[$preparedKey] = $values;
                }
            }
        }

        return $result;
    }

    private function getDataLinksContent(string $tableName, string $path = ''): string
    {
        return $this
            ->dataLinksContentBlock
            ->setData($this->getMainFileData())
            ->prepare($path)
            ->getFullContent($tableName)
        ;
    }

    private function getDateWithType(array $data): string
    {
        $result = $data['date'] ?? null;
        $type = $data['type'] ?? null;

        if (is_null($result)) {
            $result = self::NON_EXISTENCE;
        } else {
            $result = $this->getFormattedDate($result);
            if (!is_null($type)) {
                $result .= " (#lang-$type-adverb#)";
            }
        }

        return $result;
    }

    private function getPreparedTranslationRecordKey(string $key, string $recordId): string
    {
        return 'record-' . $recordId . '-' . $key;
    }

    private function getSubFileData(string $recordType, string $recordId): array
    {
        $filePath = self::RECORDS_ROOT_PATH . '/' . $recordType . '/' . $this->getDataFileSuffix($recordId);

        return $this->getOriginalJsonFileContentArray($filePath);
    }

    private function getGalleryContent(): string
    {
        return $this
            ->galleryContentBlock
            ->prepare($this->path)
            ->getFullContent('')
        ;
    }

    private function getRecordTypeElementsList(array $elementsIds, string $elementsType): array
    {
        $result = [];

        $itemContent = $this->getOriginalHtmlFileContent('items/record-type-elements-list-item.html');

        foreach ($elementsIds as $elementId) {
            $namesIndex = self::NAMES_INDEX;
            $elementFilePath = "$elementsType/$elementId";

            $data = $this->getSubFileData($elementsType, $elementId);

            $mainLangValues = $this->getAllMainLanguageValues($data[$namesIndex] ?? []);
            $translations = [$namesIndex => $mainLangValues];
            $language = $this->getLanguage();
            $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

            $variableName = self::VARIABLE_NAME_SIGN . $namesIndex . self::VARIABLE_NAME_SIGN;
            $translatedName = $this->getReplacedContent($variableName, $textVariables, true);
            $nameHash = $this->getNameHash($this->stripTags($translatedName));

            $variables = [];
            $variables['element-href'] = self::INDEXES_ROOT_PATH . '/' . $elementsType . '/' . $nameHash;
            $variables['element-name'] = $translatedName;

            $content = $this->getReplacedContent($itemContent, $variables);

            $result[] = $content;
        }

        return $result;
    }

    private function getIndexedNamesList(string $field): string
    {
        return $this
            ->indexedNamesListContentBlock
            ->setFileData($this->getMainFileData())
            ->prepare($field)
            ->getFullContent('')
        ;
    }
}
