<?php

class RomanMartyrologyIndexSince1584ContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const PAGE_INDEX = 'page';
    private const PAGE_COLUMN_INDEX = 'column';

    private const VAR_PREFIX = 'record-text-';
    private const VAR_FIRST_CHARACTER_ONLY_SUFFIX = '-first-character-only';
    private const VAR_WITHOUT_FIRST_CHARACTER_SUFFIX = '-without-first-character';

    private const INDEX_PAGE_TITLE_CONTINUATION_SUFFIX = '[...]';

    private $importantRecordContent;
    private $normalRecordContent;
    private $textVariables;
    private $isFileFirstInIndexFile;

    public function prepare(string $path): ContentBlock
    {
        $importantRecordContent = $this->getOriginalHtmlFileContent('items/roman-martyrology-index-since-1584-important-item.html');
        $normalRecordContent = $this->getOriginalHtmlFileContent('items/roman-martyrology-index-since-1584-normal-item.html');

        $this->prepareConsolidatedDataFilesArray($path);

        $translations = $this->getRecordTranslations(
            $this->getMainFileData(),
            $this->getDataLinksFileData()
        );
        $language = $this->getLanguage();
        $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        $this->importantRecordContent = $importantRecordContent;
        $this->normalRecordContent = $normalRecordContent;
        $this->textVariables = $textVariables;
        $this->isFileFirstInIndexFile = $this->isFileFirstInIndexFile($path);

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $contentBlockContent = $this->getOriginalHtmlFileContent('content-blocks/roman-martyrology-index-since-1584-content-block.html');
        $pageHeaderContent = $this->getOriginalHtmlFileContent('items/page-header-item.html');
        $mainFileData = $this->getMainFileData();

        $prevPageNumber = null;
        $pageNumber = self::UNKNOWN_PAGE_NUMBER;

        $recordsContent = '';
        foreach ($mainFileData as $recordId => $recordData) {
            $page = $recordData[self::PAGE_INDEX] ?? null;

            if (!is_null($page)) {
                $pageNumber = $page;
            }

            if ($prevPageNumber !== $pageNumber) {
                $variables = [
                    'page-number' => $pageNumber,
                ];
                $recordsContent .= $this->getReplacedContent($pageHeaderContent, $variables);
            }

            $recordsContent .= $this->getRecordContent($recordId);

            $prevPageNumber = $pageNumber;
        }

        $indexPageTitle = $translatedName;
        if ($this->stripTags($indexPageTitle) === mb_strtoupper($this->stripTags($indexPageTitle))) {
            $indexPageTitle .= self::INDEX_PAGE_TITLE_CONTINUATION_SUFFIX;
        }

        $variables = [
            'index-page-title' => $indexPageTitle,
            'index-items-content' => $recordsContent,
        ];
        $result = $this->getReplacedContent($contentBlockContent, $variables);

        return $this->getReplacedContent($result, $this->textVariables, true);
    }

    public function getRecordContent(string $recordId): string
    {
        $isRecordImportant = ($recordId === '1');
        $isFileFirstInIndexFile = $this->isFileFirstInIndexFile;
        if ($isRecordImportant && $isFileFirstInIndexFile) {
            $recordContent = $this->importantRecordContent;
        } else {
            $recordContent = $this->normalRecordContent;
        }

        $variables = [
            'record-id' => $recordId,
            'record-text' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . $recordId . self::VARIABLE_NAME_SIGN,
            'record-text-first-character-only' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . $recordId . self::VAR_FIRST_CHARACTER_ONLY_SUFFIX . self::VARIABLE_NAME_SIGN,
            'record-text-without-first-character' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . $recordId . self::VAR_WITHOUT_FIRST_CHARACTER_SUFFIX . self::VARIABLE_NAME_SIGN,
            'record-activeness-class' => $this->getRecordActivenessClass($recordId),
        ];
        $content = $this->getReplacedContent($recordContent, $variables);

        return $this->getReplacedContent($content, $this->textVariables, true);
    }

    private function getRecordTranslations(array $data, array $aliases): array
    {
        $result = [];

        foreach ($data as $key => $values) {
            unset($values[self::PAGE_INDEX]);
            unset($values[self::PAGE_COLUMN_INDEX]);

            foreach ($values as $language => $text) {
                $text = $this->getValueWithPossibleImport($text, $language);
                $text = $this->getTextWithSPecialLinks($text, $aliases[$key] ?? []);
                $result[self::VAR_PREFIX . $key][$language] = $text;
                $result[self::VAR_PREFIX . $key . self::VAR_FIRST_CHARACTER_ONLY_SUFFIX][$language] = mb_substr($text, 0, 1, self::ENCODING);
                $result[self::VAR_PREFIX . $key . self::VAR_WITHOUT_FIRST_CHARACTER_SUFFIX][$language] = mb_substr($text, 1, null, self::ENCODING);
            }
        }

        return $result;
    }
}
