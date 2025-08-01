<?php

class MainContentRouter extends Content
{
    private const TITLE_PREFIX = self::VARIABLE_NAME_SIGN . 'lang-service-name' . self::MODIFIER_SEPARATOR . self::MODIFIER_ORIGINAL_ONLY_FOR_MISSING . self::VARIABLE_NAME_SIGN;

    public function __construct()
    {
        parent::__construct();
    }

    public function getTitleAndContent(string $path, string $originalPath, int $httpStatusCode): array
    {
        $object = $this->getMainContentObjectForParams($path, $originalPath, $httpStatusCode);
        $title = $object->getTitle(self::TITLE_PREFIX);
        $content = $object->getContent();

        return [$title, $content];
    }

    private function getMainContentObjectForParams(string $path, string $originalPath, int $httpStatusCode): object
    {
        $stepsData = [
            'ProtectedPageMainContent' => $path,
            'ErrorMainContent' => $httpStatusCode,
            'CardsMainContent' => $path,
            'ChallengesMainContent' => $path,
            'AchievementsMainContent' => $path,
            'DateMainContent' => $path,
            'DataFileMainContent' => $path,
            'DirectoryMainContent' => $path,
            'MainPageMainContent' => $path,
            'AboutUsMainContent' => $path,
            'AboutPatronsMainContent' => $path,
            'GuideMainContent' => $path,
            'ContactMainContent' => $path,
            'SupportUsMainContent' => $path,
            'MeMainContent' => $path,
            'PathAliasRedirectionMainContent' => $originalPath,
            'InvalidPathMainContent' => $path,
        ];
        foreach ($stepsData as $class => $param) {
            $object = new $class();
            if ($object->configure($param)) {
                return $object;
            }
        }
    }
}
