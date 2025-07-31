<?php

class BreadcrumbsContentBlock extends ContentBlock implements ContentBlockInterface
{
    private const GLOBAL_VARIABLES_KEY_NAME = 'breadcrumbs-path-names';

    private const PATH_SEPARATOR = '###';
    private const ACTIVE_LINK_NAME_PREFIX = '###';

    private const MAIN_PAGE_ICON = '<img class="home" src="/files/resources/svg/home.svg">';
    private const FULL_CONTENT_WRAPPER_PREFIX = '<ol>';
    private const FULL_CONTENT_WRAPPER_SUFFIX = '</ol>';
    private const DATA_VARIABLE = self::VARIABLE_NAME_SIGN . 'lang-data' . self::MODIFIER_SEPARATOR . self::MODIFIER_CAPITALIZE . self::VARIABLE_NAME_SIGN;

    private const BREADCRUMBS_EXTERNAL_NAMES_FILES_PATHS = [
        '/guide' => 'guide-configuration',
    ];
    private const BREADCRUMBS_HIDE_DATA_ELEMENT_PATHS = [
        'about-my-patrons' => true,
        'about-us' => true,
        'collectible-cards' => true,
        'contact' => true,
        'dates' => false,
        'files' => false,
        'guide' => true,
        'me' => true,
        'defender-patrons' => true,
        'feasts-to-discover' => true,
        'messenger-mission-patrons' => true,
        'my-achievements' => true,
        'my-challenges' => true,
        'support-us' => true,
    ];

    private GlobalVariables $globalVariables;

    private bool $showDataElement = false;
    private string $activeLinkContent;
    private string $inactiveLinkContent;
    private bool $showMainPage = false;
    private array $pathElements = [];

    public function __construct()
    {
        parent::__construct();

        $this->globalVariables = GlobalVariables::getInstance();
    }

    public function getHideDataElementPaths(): array
    {
        return self::BREADCRUMBS_HIDE_DATA_ELEMENT_PATHS;
    }

    public function getPathWithContext(string $fullPath, string $contextPath = ''): string
    {
        return $fullPath . self::PATH_SEPARATOR . $contextPath;
    }

    public function showDataElement(bool $showDataElement): ContentBlock
    {
        $this->showDataElement = $showDataElement;

        return $this;
    }

    public function prepare(string $originalPath): ContentBlock
    {
        $activeLinkContent = $this->getOriginalHtmlFileContent('items/breadcrumbs-active-link.html');
        $inactiveLinkContent = $this->getOriginalHtmlFileContent('items/breadcrumbs-inactive-link.html');

        $showMainPage = true;

        $tmpPaths = explode(self::PATH_SEPARATOR, $originalPath);
        $tmpFullPath = $this->getTidyPath($tmpPaths[0]);
        $tmpContextPath = $tmpPaths[1] ?? '';
        if ($tmpContextPath === '/') {
            $showMainPage = false;
        }
        $tmpContextPath = $this->getTidyPath($tmpContextPath);
        if ($tmpContextPath !== '') {
            $showMainPage = false;
        }

        $path = $tmpFullPath;
        $contextPath = '';
        if (strpos($tmpFullPath, $tmpContextPath) === 0) {
            $tmpPath = mb_substr($tmpFullPath, mb_strlen($tmpContextPath));
            if ($tmpFullPath === $tmpContextPath || mb_substr($tmpPath, 0, 1) === '/') {
                $path = $this->getTidyPath($tmpPath);
                $contextPath = $tmpContextPath;
            }
        }

        $this->activeLinkContent = $activeLinkContent;
        $this->inactiveLinkContent = $inactiveLinkContent;
        $this->showMainPage = $showMainPage;
        $this->pathElements = $this->getPathElements($showMainPage, $path, $contextPath);

        return $this;
    }

    public function getFullContent(string $translatedName): string
    {
        if ($this->getEnvironment()->isContentOnlyMode()) {
            return '';
        }

        $showMainPage = $this->showMainPage;
        $pathElements = $this->pathElements;
        if (!$showMainPage && count($pathElements) === 1) {
            return self::FULL_CONTENT_WRAPPER_PREFIX . self::MAIN_PAGE_ICON . self::FULL_CONTENT_WRAPPER_SUFFIX;
        }

        $result = ltrim("$translatedName: ", ': ');

        $recordId = 0;
        foreach ($pathElements as $path => $name) {
            if ($showMainPage || $recordId > 0) {
                $result .= $this->getRecordContent($recordId);
            }

            $recordId++;
        }

        return self::FULL_CONTENT_WRAPPER_PREFIX . $result . self::FULL_CONTENT_WRAPPER_SUFFIX;
    }

    public function getRecordContent(string $recordId): string
    {
        $activeLinkContent = $this->activeLinkContent;
        $inactiveLinkContent = $this->inactiveLinkContent;
        $pathElements = $this->pathElements;

        $keys = array_keys($pathElements);
        $link = $keys[$recordId];
        $name = $pathElements[$link];

        $linkContent = $inactiveLinkContent;
        if (mb_strpos($name, self::ACTIVE_LINK_NAME_PREFIX) === 0) {
            $name = mb_substr($name, mb_strlen(self::ACTIVE_LINK_NAME_PREFIX));
            if (!$this->isRequestPathProtected($link)) {
                $linkContent = $activeLinkContent;
            }
        }
        $variables = [
            'name' => $name,
            'link' => $this->getRecordIdPathWithNameExtension($link, $name),
        ];

        return $this->getReplacedContent($linkContent, $variables);
    }

    public function getLinkWithAnchor(string $path, string $anchor): string
    {
        if ($this->isRequestPathProtected($path)) {
            $linkContent = $this->inactiveLinkContent;
        } else {
            $linkContent = $this->activeLinkContent;
        }

        $variables = [
            'link' => $this->getLinkWithActiveRecordIdForAnchor("$path#$anchor"),
            'name' => "#$anchor",
        ];

        $replacedLinkContent = $this->getReplacedContent($linkContent, $variables);

        return self::FULL_CONTENT_WRAPPER_PREFIX . $replacedLinkContent . self::FULL_CONTENT_WRAPPER_SUFFIX;
    }

    private function getTidyPath(string $path): string
    {
        return $this->getEnvironment()->getTidyPath($path);
    }

    private function getPathElements(bool $showMainPage, string $path, string $contextPath): array
    {
        $result = [];

        $showDataElement = $this->showDataElement;

        $result['/' . self::MAIN_PAGE_PARAM] = ($showMainPage ? self::ACTIVE_LINK_NAME_PREFIX : '') . self::MAIN_PAGE_ICON;
        if ($showMainPage && $contextPath === '' && $showDataElement) {
            $result[self::DATA_ROOT_PARENT_DIRECTORY_PATH] = self::ACTIVE_LINK_NAME_PREFIX . self::DATA_VARIABLE;
        }
        if ($path !== '') {
            $pathElements = explode('/', $path);

            $currentPath = $contextPath;
            foreach ($pathElements as $pathElement) {
                $feastSeparatorPos = strpos($pathElement, self::FEAST_ID_SEPARATOR);
                if ($feastSeparatorPos !== false) {
                    $pathElement = substr($pathElement, 0, $feastSeparatorPos);
                }
                $currentPath = '/' . ltrim("$currentPath/$pathElement", '/');

                $result[$currentPath] = $this->getPathElementName($currentPath, $pathElement);
            }
        }

        return $result;
    }

    private function getPathElementName(string $path, string $element): string
    {
        $result = [];

        $found = false;
        $globalVariables = $this->globalVariables;
        $names = $globalVariables->get(self::GLOBAL_VARIABLES_KEY_NAME);

        if (isset($names[$path])) {
            list($name, $found) = $names[$path];
        } else {
            if ($this->dataPathExists($path)
                || $this->dataPathExists($this->getDataFileSuffix($path))
                || $this->dataPathExists($this->getGeneratedFileSuffix($path))
            ) {
                $found = true;
            }

            $dirPath = dirname($path);
            $language = $this->getLanguage();
            $indexFilePath = $this->getIndexFilePath($dirPath);
            $indexVariables = $this->getTranslatedVariables($language, $indexFilePath);
            if (empty($indexVariables)) {
                $indexFilePath = $this->getIndexFilePath($dirPath, true);
                $indexVariables = $this->getTranslatedVariables($language, $indexFilePath);
            }

            $name = $this->getReplacedContent(self::VARIABLE_NAME_SIGN . $element . self::VARIABLE_NAME_SIGN, $indexVariables, true);
            $name = preg_replace('/^' . self::VARIABLE_NAME_SIGN . '(.+)' . self::VARIABLE_NAME_SIGN . '$/', '\1', $name);

            if ($found && strpos($this->stripTags($name), self::VARIABLE_NAME_SIGN) !== false) {
                $name = self::VARIABLE_NAME_SIGN . self::LANG_VARIABLE_PREFIX . $element . self::MODIFIER_SEPARATOR . self::MODIFIER_CAPITALIZE . self::VARIABLE_NAME_SIGN;
            }
            if (!$found && $element === $name) {
                $externalNamesFilePath = self::BREADCRUMBS_EXTERNAL_NAMES_FILES_PATHS[$dirPath] ?? null;
                if (!is_null($externalNamesFilePath)) {
                    $externalNamesData = $this->getOriginalJsonFileContentArray($externalNamesFilePath . self::DATA_FILE_EXTENSION);
                    $nameIndex = self::EXTERNAL_NAMES_DATA_NAME_INDEX;
                    $nameLanguagesData = $externalNamesData[$element][$nameIndex] ?? null;
                    if (!is_null($nameLanguagesData)) {
                        $nameVariables = $this->getTranslatedVariablesForLangData($language, [$nameIndex => $nameLanguagesData]);

                        $found = true;
                        $name = $this->getReplacedContent(self::VARIABLE_NAME_SIGN . $nameIndex . self::VARIABLE_NAME_SIGN, $nameVariables, true);
                    }
                } else {
                    $isActive = self::BREADCRUMBS_HIDE_DATA_ELEMENT_PATHS[$element] ?? null;
                    if (!is_null($isActive)) {
                        $name = self::VARIABLE_NAME_SIGN . self::LANG_VARIABLE_PREFIX . $element . self::MODIFIER_SEPARATOR . self::MODIFIER_CAPITALIZE . self::VARIABLE_NAME_SIGN;
                        $found = $isActive;
                    }
                }
            }

            $names[$path] = [$name, $found];
            $globalVariables->set(self::GLOBAL_VARIABLES_KEY_NAME, $names);
        }

        return ($found ? self::ACTIVE_LINK_NAME_PREFIX : '') . $name;
    }
}
