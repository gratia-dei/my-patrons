<?php

class BodyContent extends Content
{
    private const ORIGINAL_VARIABLE_NAME = 'lang-original';

    private const NEWLINE = "\n";
    private const ORIGINAL_LANGUAGE_CODE = '??';
    private const ORIGINAL_LANGUAGE_FILENAME = 'original';
    private const ACTIVE_LANGUAGE_CLASS = 'active';

    private const PATH_PREFIX_VARIABLE = '';

    private $mainContentRouter;
    private $breadcrumbsContentBlock;

    public function __construct()
    {
        parent::__construct();
        $this->mainContentRouter = new MainContentRouter();
        $this->breadcrumbsContentBlock = new BreadcrumbsContentBlock();
    }

    public function getTitleAndContent(): array
    {
        $protocol = $this->getEnvironment()->getHostProtocol();
        $domain = $this->getEnvironment()->getHostMainDomainOnly();
        $originalRequestPath = $this->getEnvironment()->getRequestPath();
        $httpStatusCode = $this->getEnvironment()->getHttpStatusCode();

        $requestPath = $this->getRequestPathRecordIdOnly($originalRequestPath);

        $variables = [];
        if ($this->isContentOnlyMode()) {
            $htmlFileName = 'body-content.html';
        } else {
            $htmlFileName = 'body-full.html';
            $variables['selected-language-filename'] = $this->getSelectedLanguageFilename();
            $variables['selectable-languages-list'] = $this->getSelectableLanguagesList($protocol, $domain, $requestPath);
        }
        $variables['breadcrumbs-content-block'] = $this->getBreadcrumbsContent($requestPath);
        $variables['current-year'] = $this->getDate()->getCurrentYear();

        $contentVariables = [];
        list($title, $contentVariables['content']) = $this->mainContentRouter->getTitleAndContent($requestPath, $originalRequestPath, $httpStatusCode);

        $strippedTitle = $this->stripTags($title);

        $originalContent = $this->getOriginalHtmlFileContent($htmlFileName);
        $replacedContent = $this->getReplacedContent($originalContent, $contentVariables);
        $replacedAll = $this->getReplacedContent($replacedContent, $variables);

        return [$strippedTitle, $replacedAll];
    }

    private function getSelectedLanguageFilename(): string
    {
        $selectedLanguage = $this->getEnvironment()->getHostSubdomainOnly();
        if (in_array($selectedLanguage, self::SELECTABLE_LANGUAGES_ORDER)) {
            return $selectedLanguage;
        }

        return self::ORIGINAL_LANGUAGE_FILENAME;
    }

    private function getSelectableLanguagesList(string $protocol, string $domain, string $requestPath): string
    {
        $content = '';

        $selectedLanguage = $this->getEnvironment()->getHostSubdomainOnly();
        $queryParamsString = $this->getEnvironment()->getRequestQueryParamsString();

        $optionContent = $this->getOriginalHtmlFileContent('items/selectable-languages-list-item.html');
        list($codesList, $translatedNamesList, $originalNamesList) = $this->getSelectableLanguagesListValues();

        foreach ($codesList as $code) {
            if ($code === '') {
                $name = $translatedNamesList[$code];
            } else {
                $originalName = $originalNamesList[$code] ?? '?';
                $translatedName = $translatedNamesList[$code] ?? $originalName;

                $name = $translatedName;
                if (str_replace(self::MODIFIER_SEPARATOR . self::MODIFIER_ORIGINAL, '', $originalName) !== $translatedName) {
                    $name .= ' (' . $originalName . ')';
                }
            }

            $href = $code . '.' . $domain . $requestPath . $queryParamsString;
            $href = ltrim($href, '.');
            if ($code === '' && false === strpos(rtrim($href, '/'), '/')) {
                $href .= self::MAIN_PAGE_PARAM;
            }
            $href = $protocol . $href;

            $variables = [
                'code' => $code === '' ? self::ORIGINAL_LANGUAGE_FILENAME : $code,
                'href' => $href,
                'name' => $name,
                'class' => $selectedLanguage === $code ? ' ' . self::ACTIVE_LANGUAGE_CLASS : '',
            ];
            $content .= $this->getReplacedContent($optionContent, $variables, true) . self::NEWLINE;
        }

        return $content;
    }

    private function getSelectableLanguagesListValues(): array
    {
        $codes = ['' => ''];
        $translated = ['' => self::VARIABLE_NAME_SIGN . self::ORIGINAL_VARIABLE_NAME . self::VARIABLE_NAME_SIGN];
        $original = ['' => self::VARIABLE_NAME_SIGN . self::ORIGINAL_VARIABLE_NAME . self::MODIFIER_SEPARATOR . self::MODIFIER_ORIGINAL . self::VARIABLE_NAME_SIGN];

        foreach (self::SELECTABLE_LANGUAGES_ORDER as $code) {
            $codes[$code] = $code;
        }

        $allLanguages = $this->getTranslatedLanguagesVariables();
        foreach ($allLanguages as $codeOriginal => $name) {
            $code = preg_replace('/[' . self::MODIFIER_SEPARATOR . '].*$/', '', $codeOriginal);

            if (!isset($codes[$code])) {
                continue;
            }

            if (is_array($name)) {
                $original[$code] = reset($name);
            } else {
                $translated[$code] = $name;
            }
        }

        return [$codes, $translated, $original];
    }

    private function getBreadcrumbsContent(string $requestPath): string
    {
        $showDataElement = true;
        $breadcrumbsHideDataElementPaths = $this->breadcrumbsContentBlock->getHideDataElementPaths();
        foreach ($breadcrumbsHideDataElementPaths as $path => $isActive) {
            if (mb_strpos("$requestPath/", "/$path/") === 0) {
                $showDataElement = false;
            }
        }

        $bcFullPath = $requestPath === self::DATA_ROOT_PARENT_DIRECTORY_PATH ? '/' : $requestPath;
        $bcContextPath = $requestPath === '/' ? '/' : '';
        $bcPath = $this->breadcrumbsContentBlock->getPathWithContext($bcFullPath, $bcContextPath);

        return $this->breadcrumbsContentBlock
            ->showDataElement($showDataElement)
            ->prepare($bcPath)
            ->getFullContent(self::PATH_PREFIX_VARIABLE)
        ;
    }
}
