<?php

class RomanMartyrologyDayElogiesSince2001ContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const PAGE_INDEX = 'page';
    private const MARK_INDEX = 'mark';

    private const IMPORTANT_RECORD_MARK_SIGN = '!';

    private const VAR_PREFIX = 'record-text-';
    private const VAR_FIRST_CHARACTER_ONLY_SUFFIX = '-first-character-only';
    private const VAR_WITHOUT_FIRST_CHARACTER_SUFFIX = '-without-first-character';

    private $importantRecordContent;
    private $normalRecordContent;
    private $textVariables;

    public function prepare(string $path): ContentBlock
    {
        $importantRecordContent = $this->getOriginalHtmlFileContent('items/roman-martyrology-day-elogy-since-2001-important-item.html');
        $normalRecordContent = $this->getOriginalHtmlFileContent('items/roman-martyrology-day-elogy-since-2001-normal-item.html');

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

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $contentBlockContent = $this->getOriginalHtmlFileContent('content-blocks/roman-martyrology-day-elogies-since-2001-content-block.html');
        $pageHeaderContent = $this->getOriginalHtmlFileContent('items/page-header-item.html');
        $mainFileData = $this->getMainFileData();

        $prevPageNumber = null;
        $pageNumber = self::UNKNOWN_PAGE_NUMBER;

        $elogiesContent = '';
        foreach ($mainFileData as $recordId => $recordData) {
            $page = $recordData[self::PAGE_INDEX] ?? null;

            if (!is_null($page)) {
                $pageNumber = $page;
            }
            if ($prevPageNumber !== $pageNumber) {
                $variables = [
                    'page-number' => $pageNumber,
                ];
                $elogiesContent .= $this->getReplacedContent($pageHeaderContent, $variables);
            }

            $elogiesContent .= $this->getRecordContent($recordId);

            $prevPageNumber = $pageNumber;
        }

        $mainDayName = $translatedName;
        $romanCalendarDayName = '';
        if (preg_match("/^(?'opentag'<[^>]+>)?(?'main'.+)\s\((?'roman'.+)\)(?'closetag'<\/[^>]+>)?/", $mainDayName, $matches)) {
            $openTag = $matches['opentag'] ?? '';
            $closeTag = $matches['closetag'] ?? '';

            $mainDayName = $openTag . $matches['main'] . $closeTag;
            $romanCalendarDayName = $openTag . $matches['roman'] . $closeTag;
        }
        $variables = [
            'main-day-name' => $mainDayName,
            'roman-calendar-day-name' => $romanCalendarDayName,
            'elogies-content' => $elogiesContent,
        ];
        $result = $this->getReplacedContent($contentBlockContent, $variables);

        return $this->getReplacedContent($result, $this->textVariables, true);
    }

    public function getRecordContent(string $recordId): string
    {
        $mainFileData = $this->getMainFileData();
        $recordType = $mainFileData[$recordId][self::MARK_INDEX] ?? '';

        $variables = [
            'record-id' => $recordId,
            'record-type' => $recordType,
            'record-text' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . $recordId . self::VARIABLE_NAME_SIGN,
            'record-text-first-character-only' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . $recordId . self::VAR_FIRST_CHARACTER_ONLY_SUFFIX . self::VARIABLE_NAME_SIGN,
            'record-text-without-first-character' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . $recordId . self::VAR_WITHOUT_FIRST_CHARACTER_SUFFIX . self::VARIABLE_NAME_SIGN,
            'record-activeness-class' => $this->getRecordActivenessClass($recordId),
        ];

        if ($recordType === self::IMPORTANT_RECORD_MARK_SIGN) {
            $result = $this->getReplacedContent($this->importantRecordContent, $variables);
        } else {
            $result = $this->getReplacedContent($this->normalRecordContent, $variables);
        }

        return $this->getReplacedContent($result, $this->textVariables, true);
    }

    private function getRecordTranslations(array $data, array $aliases): array
    {
        $result = [];

        foreach ($data as $key => $values) {
            unset($values[self::PAGE_INDEX]);
            unset($values[self::MARK_INDEX]);

            $result[self::VAR_PREFIX . $key] = $values;
            foreach ($values as $language => $text) {
                $text = $this->getValueWithPossibleImport($text, $language);
                $text = $this->getTextWithSpecialLinks($text, $aliases[$key] ?? []);

                $result[self::VAR_PREFIX . $key][$language] = $text;
                $result[self::VAR_PREFIX . $key . self::VAR_FIRST_CHARACTER_ONLY_SUFFIX][$language] = mb_substr($text, 0, 1, self::ENCODING);
                $result[self::VAR_PREFIX . $key . self::VAR_WITHOUT_FIRST_CHARACTER_SUFFIX][$language] = mb_substr($text, 1, null, self::ENCODING);
            }
        }

        return $result;
    }
}
