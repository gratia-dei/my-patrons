<?php

class IndexContent extends Content
{
    private $bodyContent;

    public function __construct()
    {
        parent::__construct();

        $this->redirectMainPageToLanguageSubdomainIfNeeded();
        $this->bodyContent = new BodyContent();
    }

    public function getContent(): string
    {
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

        if (!$isHomeMode && $language === '' && ltrim($requestPath, '/') === '') {
            $allowedLanguages = self::SELECTABLE_LANGUAGES_ORDER;
            $acceptLanguages = $this->getEnvironment()->getAcceptLanguages();
            $host = $this->getEnvironment()->getHostDomain();

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
