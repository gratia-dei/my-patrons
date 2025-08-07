<?php

class AreaMainContent extends MainContent implements MainContentInterface
{
    private const DESCRIPTION_INDEX = 'description';
    private const TEMPLATE_INDEX = 'template';

    private string $file = '';
    private string $title = '';

    public function configure(string $path): bool
    {
        if (preg_match("~^/areas($|/)~", $path)) {
            $areasConfig = $this->getOriginalJsonFileContentArray('challenges-areas.json');

            $defaultChapter = array_key_first($areasConfig);
            $isToRedirect = false;

            $pathElements = explode('/', trim($path, '/'));
            switch (count($pathElements)) {
                case 1:
                    $chapter = $defaultChapter;
                    break;

                case 2:
                    $chapter = $pathElements[1];
                    if (!isset($areasConfig[$chapter]) || $chapter === $defaultChapter) {
                        $isToRedirect = true;
                    }
                    break;

                default:
                    $isToRedirect = true;
                    break;
            }
            if ($isToRedirect) {
                $this->getEnvironment()->redirect(dirname($path));
            }

            $nameIndex = self::EXTERNAL_NAMES_DATA_NAME_INDEX;
            $language = $this->getLanguage();
            $nameLanguagesData = $areasConfig[$chapter][$nameIndex] ?? [];
            $nameVariables = $this->getTranslatedVariablesForLangData($language, [$nameIndex => $nameLanguagesData]);

            $descriptionIndex = self::DESCRIPTION_INDEX;
            $templateIndex = self::TEMPLATE_INDEX;
            $templatesData = $areasConfig[$chapter][$descriptionIndex][$templateIndex] ?? [];
            $templateVariables = $this->getTranslatedVariablesForLangData($language, [$templateIndex => $templatesData]);

            $this->path = $path;
            $this->markdownFile = $this->getReplacedContent(self::VARIABLE_NAME_SIGN . $templateIndex . self::VARIABLE_NAME_SIGN, $templateVariables);
            $this->title = $this->getReplacedContent(self::VARIABLE_NAME_SIGN . $nameIndex . self::VARIABLE_NAME_SIGN, $nameVariables, true);

            return true;
        }

        return false;
    }

    public function getTitle(string $prefix): string
    {
        return $prefix . ': ' . $this->title;
    }

    public function getContent(): string
    {
        $result = $this->getOriginalHtmlFileContent('main-contents/area-main-content.html');

        $variables = [
            'file-path' => $this->markdownFile,
            'title' => $this->title,
        ];
        $result = $this->getReplacedContent($result, $variables);

        return $result;
    }
}
