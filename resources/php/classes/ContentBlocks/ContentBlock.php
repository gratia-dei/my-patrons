<?php

abstract class ContentBlock extends Content
{
    protected const UNKNOWN_PAGE_NUMBER = '?';
    protected const UNKNOWN_PAGE_COLUMN_NUMBER = '?';

    protected const NON_EXISTENCE = self::VARIABLE_NAME_SIGN . 'lang-non-existence' . self::VARIABLE_NAME_SIGN;
    protected const NON_EXISTENCE_SIGN = '-';
    protected const UNKNOWN_SIGN = '?';
    protected const INVALID_SIGN = '!!!';

    protected const RECORD_ACTIVENESS_CLASS_ACTIVE = 'record-active';
    protected const RECORD_ACTIVENESS_CLASS_INACTIVE = 'record-inactive';

    private const LEAP_YEAR_LANGUAGE_VARIABLE = self::VARIABLE_NAME_SIGN . 'lang-leap-year' . self::VARIABLE_NAME_SIGN;
    private const NO_LEAP_YEAR_LANGUAGE_VARIABLE = self::VARIABLE_NAME_SIGN . 'lang-no-leap-year' . self::VARIABLE_NAME_SIGN;

    private const SPECIAL_TAGS_TO_REPLACE = [
      '[/]' => '<br />',
      self::DELETED_RECORD_TAG => '<span class="deleted-record-info">(' . self::VARIABLE_NAME_SIGN . 'lang-deleted-record-info' . self::MODIFIER_SEPARATOR . self::MODIFIER_ORIGINAL_ONLY_FOR_MISSING . self::VARIABLE_NAME_SIGN . ')</span>',
      '[(c)]' => '<span class="copyright-hidden-content-info">(' . self::VARIABLE_NAME_SIGN . 'lang-copyright-hidden-content-info' . self::MODIFIER_SEPARATOR . self::MODIFIER_ORIGINAL_ONLY_FOR_MISSING . self::VARIABLE_NAME_SIGN . ')</span>',
      '[:color]' => '</font>',
      '[color:red]' => '<font color="red">',
    ];

    private const DATE_REPLACES = [
        '/^([<>~])?([-]?[0-9]*)[-]([0-9][0-9])[-]([0-9][0-9])$/' => '\1\4.\3.\2',
        '/[-]([0-9]+)/' => '\1 ' . self::VARIABLE_NAME_SIGN . 'lang-before-christ-abbreviation' . self::VARIABLE_NAME_SIGN,
        '/[<]/' => self::VARIABLE_NAME_SIGN . 'lang-before' . self::VARIABLE_NAME_SIGN . ' ',
        '/[>]/' => self::VARIABLE_NAME_SIGN . 'lang-after' . self::VARIABLE_NAME_SIGN . ' ',
        '/[~]/' => self::VARIABLE_NAME_SIGN . 'lang-around' . self::VARIABLE_NAME_SIGN . ' ',
    ];

    private $fileData;

    protected function getFormattedDate(string $date): string
    {
        if ($date === self::NON_EXISTENCE_SIGN) {
            return self::NON_EXISTENCE;
        } else if ($date === self::UNKNOWN_SIGN) {
            return self::UNKNOWN_SIGN;
        } else if (!preg_match('/^[<>~]?[-]?[1-9][0-9]?[0-9]?[0-9]?([-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[0-1]))?$/', $date)) {
            return self::INVALID_SIGN;
        }

        foreach (self::DATE_REPLACES as $pattern => $replacement) {
            $date = preg_replace($pattern, $replacement, $date);
        }

        return $date;
    }

    protected function getFormattedDates($dates)
    {
        if (!is_array($dates)) {
            return $this->getFormattedDate((string) $dates);
        }

        foreach ($dates as $key => $date) {
            $dates[$key] = $this->getFormattedDate($date);
        }

        return $dates;
    }

    protected function getFormattedMonthsWithDays(array $monthsWithDays)
    {
        $result = [];

        foreach ($monthsWithDays as $monthWithDay) {
            $changedMonthWithDay = preg_replace('/[^0-9]/', '-', $monthWithDay);
            $dateSuffix = '';
            if ($changedMonthWithDay !== $monthWithDay) {
                if (false !== strpos($monthWithDay, self::LEAP_YEARS_ONLY_SEPARATOR)) {
                    $dateSuffix = ' (' . self::LEAP_YEAR_LANGUAGE_VARIABLE . ')';
                } else if (false !== strpos($monthWithDay, self::NO_LEAP_YEARS_ONLY_SEPARATOR)) {
                    $dateSuffix = ' (' . self::NO_LEAP_YEAR_LANGUAGE_VARIABLE . ')';
                }
            }

            if ($this->getDate()->isMonthWithDayValid($changedMonthWithDay)) {
                $result[] = substr($this->getFormattedDate("2000-$changedMonthWithDay"), 0, 6) . $dateSuffix;
            } else {
                $result[] = self::INVALID_SIGN;
            }
        }

        return $result === [] ? self::NON_EXISTENCE : $result;
    }

    protected function getRecordActivenessClass(string $recordId): string
    {
        $activeRecordId = $this->getActiveRecordId();
        if ($activeRecordId === $recordId) {
            $class = self::RECORD_ACTIVENESS_CLASS_ACTIVE;
        } else {
            $class = self::RECORD_ACTIVENESS_CLASS_INACTIVE;
        }

        return $class;
    }

    protected function getTextWithSpecialLinks(string $text, array $aliases): string
    {
        foreach (self::SPECIAL_TAGS_TO_REPLACE as $tagToReplace => $tagReplacement) {
          $text = str_replace($tagToReplace, $tagReplacement, $text);
        }

        $textTags = $this->getTextTags($text);
        foreach ($textTags as list($tag, $link, $value)) {
            if (preg_match('/^[1-9][0-9]*$/', $link)) {
                $link = $aliases[$link] ?? null;

                if (is_null($link)) {
                    $replacement = $value;
                } else {
                    $link = $this->getLinkWithActiveRecordIdForAnchor('/' . ltrim($link, '/'));
                    $link = $this->getRecordIdPathWithNameExtension($link, $value);
                    $replacement = '<a href="' . $link . '">' . $value . '</a>';
                }
            } else {
                $link = $this->getLinkWithActiveRecordIdForAnchor('/' . ltrim($link, '/'));
                $link = $this->getRecordIdPathWithNameExtension($link, $value);
                $replacement = '<a href="' . $link . '">' . $value . '</a>';
            }

            $text = str_replace($tag, $replacement, $text);
        }

        return $text;
    }

    protected function prepareConsolidatedDataFilesArray(string $path): self
    {
        $this->fileData = $this->getConsolidatedDataFilesArray($path);

        return $this;
    }

    protected function getConsolidatedFileData(): array
    {
        return $this->fileData;
    }

    protected function getMainFileData(): array
    {
        return $this->fileData[self::MAIN_FILE_DATA_INDEX] ?? [];
    }

    protected function getDataLinksFileData(): array
    {
        return $this->fileData[self::DATA_LINKS_GENERATED_FILES_INDEX] ?? [];
    }

    private function getConvertedLinkUrl(string $url): string
    {
        return str_replace('/', '-', $url);
    }

    protected function getLinksContent(array $data, string $recordContent): string
    {
        $result = '';

        $linksTranslations = [];
        foreach ($data as $url => $names) {
            $key = $this->getConvertedLinkUrl($url);
            $linksTranslations[$key] = $names;
        }
        $language = $this->getLanguage();
        $linksTextVariables = $this->getTranslatedVariablesForLangData($language, $linksTranslations);

        $dataToSort = [];
        foreach ($data as $url => $names) {
            $variable = self::VARIABLE_NAME_SIGN . $this->getConvertedLinkUrl($url) . self::VARIABLE_NAME_SIGN;
            $translatedName = $this->getReplacedContent($variable, $linksTextVariables, true);
            $translatedNameWithoutTags = $this->stripTags($translatedName);
            $dataToSort[$translatedNameWithoutTags] = [$url, $translatedName];
        }

        $sortedData = $this->getSort()->getSortedListByKeys($dataToSort);
        foreach ($sortedData as $key => list($url, $translatedName)) {
            $variables = [
                'href' => $this->getRecordIdPathWithNameExtension('/' . $url, $translatedName),
                'name' => $translatedName,
            ];
            $result .= $this->getReplacedContent($recordContent, $variables);
        }

        return $result;
    }
}
