<?php

class Environment
{
    private const DOMAIN_PATTERN = '/mypatrons([.][a-z]+)?[.]org$/';
    private const DOMAIN_TEST_ELEMENT = '.dev';
    private const ROOT_DIRECTORY_NAME = 'my-patrons';

    public function __construct()
    {
    }

    public function getRootDirectoryPath(): string
    {
        $rootDirectoryPath = '/' . self::ROOT_DIRECTORY_NAME . '/';
        $classPath = $this->getEnvironmentClassPath();

        return preg_replace('~' . $rootDirectoryPath . '.*~', $rootDirectoryPath, $classPath);
    }

    public function getRequestPath(): string
    {
        $requestUri = $this->getFromServerGlobal('REQUEST_URI');
        $requestPath = parse_url($requestUri, PHP_URL_PATH);

        return '/' . $this->getTidyPath($requestPath);
    }

    public function getRequestQueryParams(): array
    {
        $requestUri = $this->getFromServerGlobal('REQUEST_URI');
        $requestQuery = (string) parse_url($requestUri, PHP_URL_QUERY);
        parse_str($requestQuery, $result);

        return $result;
    }

    public function getRequestQueryParamsString(): string
    {
        $queryParams = $this->getRequestQueryParams();
        if (!empty($queryParams)) {
            return '?' . http_build_query($queryParams);
        }

        return '';
    }

    public function getHttpStatusCode(): int
    {
        return (int) $this->getFromServerGlobal('REDIRECT_STATUS');
    }

    public function getHostProtocol(): string
    {
        return $this->getFromServerGlobal('HTTPS') ? 'https://' : 'http://';
    }

    public function getHostDomain(): string
    {
        return $this->getFromServerGlobal('SERVER_NAME');
    }

    public function getHostMainDomainOnly(): string
    {
        $host = $this->getHostDomain();
        $subdomainOnly = $this->getHostSubdomainOnly();

        return ltrim(mb_substr($host, mb_strlen($subdomainOnly)), '.');
    }

    public function getHostSubdomainOnly(): string
    {
        $serverName = $this->getFromServerGlobal('SERVER_NAME');

        return rtrim(preg_replace(self::DOMAIN_PATTERN, '', $serverName), '.');
    }

    public function redirect(string $location): void
    {
        header('Location: ' . $location);
        exit;
    }

    public function isCliMode(): bool
    {
        return (php_sapi_name() === 'cli');
    }

    public function getTidyPath(string $path): string
    {
        return trim(preg_replace('~//+~', '/', $path), '/');
    }

    public function isProdServer(): bool
    {
        $hostMainDomain = $this->getHostMainDomainOnly();
        $domainTestElement = preg_replace(self::DOMAIN_PATTERN, '\\1', $hostMainDomain);

        return $domainTestElement !== self::DOMAIN_TEST_ELEMENT;
    }

    private function getEnvironmentClassPath(): string
    {
        return str_replace('\\', '/', __FILE__);
    }

    private function getFromServerGlobal(string $key): string
    {
        return $_SERVER[$key] ?? '';
    }
}
