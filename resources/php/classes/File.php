<?php

class File
{
    private const MIME_TYPES_TO_OVERRIDE = [
        'css' => 'text/css',
        'js' => 'text/javascript',
    ];

    public function exists(string $path): bool
    {
        return @file_exists($path);
    }

    public function getFileContent(string $filePath): string
    {
        return @file_get_contents($filePath);
    }

    public function setFileContent(string $filePath, string $content): int
    {
        return @file_put_contents($filePath, $content);
    }

    public function getFileMimeContentType(string $filePath): string
    {
        $fileExtension = @pathinfo($filePath, PATHINFO_EXTENSION);

        return self::MIME_TYPES_TO_OVERRIDE[mb_strtolower($fileExtension)] ?? @mime_content_type($filePath);
    }

    public function getList(string $path, string $pattern = '*'): array
    {
        return @glob(rtrim($path, '/') . '/' . $pattern);
    }

    public function isDirectory(string $path): bool
    {
        return @is_dir($path);
    }

    public function removeFile(string $filePath): bool
    {
        return @unlink($filePath);
    }
}
