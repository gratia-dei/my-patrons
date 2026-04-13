<?php

class GuideMainContent extends MainContent implements MainContentInterface
{
    private const DESCRIPTION_INDEX = 'description';
    private const TEMPLATE_INDEX = 'template';

    private string $file = '';
    private string $title = '';
    private ?string $icon = null;

    public function configure(string $path): bool
    {
        if (preg_match("~^/guide($|/)~", $path)) {
            $guideConfig = $this->getOriginalJsonFileContentArray('guide-chapters.json');

            $defaultChapter = array_key_first($guideConfig);
            $isToRedirect = false;

            $pathElements = explode('/', trim($path, '/'));
            switch (count($pathElements)) {
                case 1:
                    $chapter = $defaultChapter;
                    break;

                case 2:
                    $chapter = $pathElements[1];
                    if (!isset($guideConfig[$chapter]) || $chapter === $defaultChapter) {
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
            $nameLanguagesData = $guideConfig[$chapter][$nameIndex] ?? [];
            $nameVariables = $this->getTranslatedVariablesForLangData($language, [$nameIndex => $nameLanguagesData]);

            $descriptionIndex = self::DESCRIPTION_INDEX;
            $templateIndex = self::TEMPLATE_INDEX;
            $templatesData = $guideConfig[$chapter][$descriptionIndex][$templateIndex] ?? [];
            $templateVariables = $this->getTranslatedVariablesForLangData($language, [$templateIndex => $templatesData]);

            $this->path = $path;
            $this->markdownFile = $this->getReplacedContent(self::VARIABLE_NAME_SIGN . $templateIndex . self::VARIABLE_NAME_SIGN, $templateVariables);
            $this->title = $this->getReplacedContent(self::VARIABLE_NAME_SIGN . $nameIndex . self::VARIABLE_NAME_SIGN, $nameVariables, true);
            $this->icon = $guideConfig[$chapter]['icon'] ?? null;

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
        $result = $this->getOriginalHtmlFileContent('main-contents/guide-main-content.html');

        $iconContent = '';
        if (!is_null($this->icon)) {
            $iconContent = $this->getOriginalHtmlFileContent('content-blocks/challenge-icon-content-block.html');
            $variables = [
                'svg-icon-path' => $this->icon,
            ];

            $iconContent = $this->getReplacedContent($iconContent, $variables);
        }

        $variables = [
            'file-path' => $this->markdownFile,
            'title-icon' => $iconContent,
            'title' => $this->title,
        ];
        $result = $this->getReplacedContent($result, $variables);

        return $result;
    }
}
