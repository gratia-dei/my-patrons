<?php

class MainPageMainContent extends MainContent implements MainContentInterface
{
    public function configure(string $path): bool
    {
        return (trim($path, '/') === '');
    }

    public function getTitle(string $prefix): string
    {
        return $prefix;
    }

    public function getContent(): string
    {
        $result = $this->getOriginalHtmlFileContent('main-contents/main-page-main-content.html');

        $variables = [];
        $result = $this->getReplacedContent($result, $variables);

        return $result;
    }
}
