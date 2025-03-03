<?php

class OtherPatronsAndFeastsContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const BASE_INDEX = 'base';
    private const MOVE_INDEX = 'move';

    private const VAR_PREFIX = 'feast-';
    private const VAR_SUFFIX = '-';

    private $recordContent;
    private $textVariables;

    public function prepare(string $path): ContentBlock
    {
        $recordContent = $this->getOriginalHtmlFileContent('items/other-patrons-and-feasts-item.html');

        $this->prepareConsolidatedDataFilesArray($path);

        $translations = $this->getRecordTranslations(
            $this->getMainFileData(),
            $this->getDataLinksFileData()
        );
        $language = $this->getLanguage();
        $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        $this->recordContent = $recordContent;
        $this->textVariables = $textVariables;

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $contentBlockContent = $this->getOriginalHtmlFileContent('content-blocks/other-patrons-and-feasts-content-block.html');
        $mainFileData = $this->getMainFileData();

        $recordsContent = '';
        foreach ($mainFileData as $recordId => $recordData) {
            $recordsContent .= $this->getRecordContent($recordId);
        }

        $variables = [
            'feasts-title' => $translatedName,
            'feasts-items-content' => $recordsContent,
        ];
        $result = $this->getReplacedContent($contentBlockContent, $variables);

        return $this->getReplacedContent($result, $this->textVariables, true);
    }

    public function getRecordContent(string $recordId): string
    {
        $variables = [
            'record-id' => $recordId,
            'feast-name' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . 'name' . self::VAR_SUFFIX . mb_strtolower($recordId) . self::VARIABLE_NAME_SIGN,
            'feast-description' => self::VARIABLE_NAME_SIGN . self::VAR_PREFIX . 'description' . self::VAR_SUFFIX . mb_strtolower($recordId) . self::VARIABLE_NAME_SIGN,
            'record-activeness-class' => $this->getRecordActivenessClass($recordId),
        ];
        $content = $this->getReplacedContent($this->recordContent, $variables);

        return $this->getReplacedContent($content, $this->textVariables, true);
    }

    private function getRecordTranslations(array $data, array $aliases): array
    {
        $result = [];

        foreach ($data as $key => $values) {
            unset($values[self::BASE_INDEX]);
            unset($values[self::MOVE_INDEX]);

            foreach ($values as $type => $typeData) {
                foreach ($typeData as $language => $text) {
                    $result[self::VAR_PREFIX . $type . self::VAR_SUFFIX . mb_strtolower($key)][$language] = $this->getTextWithSpecialLinks($text, $aliases[$key] ?? []);
                }
            }
        }

        return $result;
    }
}
