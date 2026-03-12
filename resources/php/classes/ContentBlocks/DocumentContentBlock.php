<?php

class DocumentContentBlock extends ContentBlock implements ContentBlockInterface
{
    private $documentItemContent;
    private $documentPhraseItemContent;
    private $textVariables;

    public function prepare(string $path): ContentBlock
    {
        $documentItemContent = $this->getOriginalHtmlFileContent('items/document-item.html');
        $documentPhraseItemContent = $this->getOriginalHtmlFileContent('items/document-phrase-item.html');

        $this->prepareConsolidatedDataFilesArray($path);

        $translations = $this->getPreparedTranslations(
            $this->getMainFileData(),
            $this->getDataLinksFileData()
        );
        $language = $this->getLanguage();
        $textVariables = $this->getTranslatedVariablesForLangData($language, $translations);

        $this->documentItemContent = $documentItemContent;
        $this->documentPhraseItemContent = $documentItemContent;
        $this->textVariables = $textVariables;

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        $mainContent = $this->getOriginalHtmlFileContent('content-blocks/documents-content-block.html');
        $mainFileData = $this->getMainFileData();

        $variables = [];
        $variables['documents-title'] = $translatedName;

        $documentItemsContent = '';
        foreach ($mainFileData as $recordId => $recordData) {
            $documentItemsContent .= $this->getRecordContent($recordId);
        }
        $variables['documents-items'] = $documentItemsContent;

        return $this->getReplacedContent($mainContent, $variables);
    }

    public function getRecordContent(string $recordId): string
    {
        $mainFileData = $this->getMainFileData();

        $documentItemContent = $this->documentItemContent;
        $documentPhrases = $mainFileData[$recordId] ?? [];
        $textVariables = $this->textVariables;

        $language = $this->getLanguage();
        $documentContent = '';
        foreach ($documentPhrases as $phraseId => $phraseTranslations) {
            $documentContent .= (self::VARIABLE_NAME_SIGN . $recordId . '-' . $phraseId . self::VARIABLE_NAME_SIGN);
        }

        $variables = [];
        $variables['record-activeness-class'] = $this->getRecordActivenessClass($recordId);
        $variables['document-content'] = $documentContent;

        $content = $this->getReplacedContent($documentItemContent, $variables);

        return $this->getReplacedContent($content, $textVariables, true);
    }

    private function getPreparedTranslations(array $data, array $aliases): array
    {
        $result = [];

        foreach ($data as $key => $documentPhrases) {
            foreach ($documentPhrases as $phraseId => $translations) {
                foreach ($translations as $language => $text) {
                    list($text, $tags) = $this->getTextWithSeparatedAssignationTags($text);
                    $result["$key-$phraseId"][$language] = $this->getTextWithSpecialLinks($text, $aliases[$key] ?? []);
                }
            }
        }

        return $result;
    }
}
