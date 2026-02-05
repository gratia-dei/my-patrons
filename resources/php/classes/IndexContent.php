<?php

class IndexContent extends Content
{
    private const SUBDOMAINS_TO_REDIRECT_TO_LANGUAGE_SUBDOMAIN_ON_MAIN_PAGE = ['www'];

    private const FILES_CONTENTS_ROOT_PATH = '/files/';

    private $bodyContent;

    public function __construct()
    {
        parent::__construct();

        $this->redirectMainPageToLanguageSubdomainIfNeeded();
        $this->bodyContent = new BodyContent();
    }

    public function getContent(): string
    {
        $originalRequestPath = $this->getEnvironment()->getRequestPath();
        $filesRootPath = self::FILES_CONTENTS_ROOT_PATH;
        $filesRootPathLength = mb_strlen($filesRootPath);

        if (mb_substr($originalRequestPath, 0, $filesRootPathLength) === $filesRootPath) {
            $rootPath = $this->getPath()->getRootPath();
            $filePath = mb_substr($originalRequestPath, $filesRootPathLength);
            $fullFilePath = $rootPath . $filePath;

            if ($this->isRequestPathProtected($originalRequestPath)) {
                $this->getEnvironment()->setHttpCodeForbidden();
            } else if ($this->getFile()->exists($fullFilePath)) {
                if (!$this->getFile()->isDirectory($fullFilePath)) {
                    $fileContent = $this->getFile()->getFileContent($fullFilePath);
                    $fileContentMimeType = $this->getFile()->getFileMimeContentType($fullFilePath);

                    if ($fileContentMimeType) {
                        header('Content-Type: ' . $fileContentMimeType);
                    }

                    return $fileContent;
                } else {
                    $this->getEnvironment()->setHttpCodeForbidden();
                }
            } else {
                $this->getEnvironment()->setHttpCodeNotFound();
            }
        }

        $originalContent = $this->getOriginalHtmlFileContent('index.html');
        $language = $this->getEnvironment()->getHostSubdomainOnly();
        $websiteTranslatedVariables = $this->getTranslatedVariables($language, 'website-language-variables.json');

        list($title, $content) = $this->bodyContent->getTitleAndContent();
        $variables = [
            'title' => $this->getReplacedContent($title, $websiteTranslatedVariables),
            'body' => $content,
        ];
        $replacedContent = $this->getReplacedContent($originalContent, $variables);

        $translatedContent = $this->getReplacedContent($replacedContent, $websiteTranslatedVariables, true);
        $finallyTranslatedContent = $this->getFinallyTranslatedContent($translatedContent, $websiteTranslatedVariables);

        return $finallyTranslatedContent;
    }

    private function redirectMainPageToLanguageSubdomainIfNeeded(): void
    {
        $isHomeMode = $this->getEnvironment()->isHomeMode();
        $language = $this->getLanguage();
        $requestPath = $this->getEnvironment()->getRequestPath();

        $subdomainsToRedirect = self::SUBDOMAINS_TO_REDIRECT_TO_LANGUAGE_SUBDOMAIN_ON_MAIN_PAGE;
        if (!$isHomeMode && ($language === '' || in_array($language, $subdomainsToRedirect, true)) && ltrim($requestPath, '/') === '') {
            $allowedLanguages = self::SELECTABLE_LANGUAGES_ORDER;
            $acceptLanguages = $this->getEnvironment()->getAcceptLanguages();
            $host = $this->getEnvironment()->getHostMainDomainOnly();

            foreach ($acceptLanguages as $acceptLanguageString) {
                $acceptLanguage = preg_replace('/^([a-z]+)[^a-z].*$/', '\\1', mb_strtolower($acceptLanguageString));
                foreach ($allowedLanguages as $allowedLanguage) {
                    if (mb_strtolower($allowedLanguage) === $acceptLanguage) {
                        $hostToRedirect = $allowedLanguage . '.' . $host;
                        $protocol = $this->getEnvironment()->getHostProtocol();

                        $this->getEnvironment()->redirect($protocol . $hostToRedirect);
                    }
                }
            }
        }
    }
}
