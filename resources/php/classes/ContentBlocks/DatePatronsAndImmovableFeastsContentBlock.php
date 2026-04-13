<?php

class DatePatronsAndImmovableFeastsContentBlock extends DateContentBlock implements ContentBlockInterface
{
    private const LEAP_YEAR_SEPARATOR = '!';

    protected function setOtherProperties(string $dates): void
    {
        $this->iconFile = 'special-mission-icon';
        $this->listNameVariable = 'lang-messenger-mission-patrons';
        $this->formTemplate = $this->getOriginalHtmlFileContent('content-blocks/date-change-form-multi-year-days-content-block.html');
        $this->dateFormInfoLangVariable = 'lang-date-form-info-for-messenger-mission-patrons';

        $datesList = [];
        if ($dates !== '') {
            $datesArr = explode(',', $dates);

            foreach ($datesArr as $monthWithDay) {
                if ($monthWithDay === '') {
                    continue;
                }

                $year = self::EXAMPLE_NORMAL_YEAR;
                if (mb_substr($monthWithDay, 2, 1) === self::LEAP_YEAR_SEPARATOR) {
                    $year = self::EXAMPLE_LEAP_YEAR;
                    $monthWithDay = str_replace(self::LEAP_YEAR_SEPARATOR, '-', $monthWithDay);
                }
                $fullDate = "$year-$monthWithDay";
                if (!$this->getDate()->isFullDateValid($fullDate)) {
                    throw new StandardException('invalid dates format');
                }

                $datesList[] = $fullDate;
            }

            usort($datesList, function ($a, $b)
            {
                $dateObj = $this->getDate();

                $yearA = $dateObj->getDateYear($a);
                $yearB = $dateObj->getDateYear($b);

                $dateAInt = (int) str_replace('-', '', $dateObj->getDateMonthWithDay($a) . $yearA);
                $dateBInt = (int) str_replace('-', '', $dateObj->getDateMonthWithDay($b) . $yearB);

                return $dateAInt <= $dateBInt ? -1 : 1;
            });
        } else {
          $datesList = [
              ($this->getDate()->isYearLeap($this->getDate()->getCurrentYear()) ? self::EXAMPLE_LEAP_YEAR : self::EXAMPLE_NORMAL_YEAR)
                  . '-' . $this->getDate()->getCurrentMonth()
                  . '-' . $this->getDate()->getCurrentDay()
          ];
        }
        $this->dates = $datesList;

        $filePath = $this->getGeneratedFileSuffix(self::FEASTS_IMMOVABLE_FILE_PATH);
        $fileData = $this->getOriginalJsonFileContentArray($filePath);
        $rows = $this->getImmovableRows($fileData);

        $filePath = $this->getGeneratedFileSuffix(self::PATRONS_IMMOVABLE_FILE_PATH);
        $fileData = $this->getOriginalJsonFileContentArray($filePath);
        $rowsToAdd = $this->getImmovableRows($fileData);
        foreach ($rowsToAdd as $patronUrl => $patronData) {
            $rows = $this->addPatronToList($rows, $patronUrl, $patronData);
        }

        $this->rows = $rows;
    }

    public function getDatesString(): string
    {
        $resultArray = [];

        foreach ($this->dates as $date) {
            $year = $this->getDate()->getDateYear($date);
            $monthWithDay = $this->getDate()->getDateMonthWithDay($date);

            $dateString = $this->getDate()->getDayWithRomanMonth($monthWithDay);
            if ((int) $year === self::EXAMPLE_LEAP_YEAR) {
                $dateString .= ' (' . self::VARIABLE_NAME_SIGN . self::LEAP_YEAR_INFO_VARIABLE_NAME . self::VARIABLE_NAME_SIGN . ')';
            }

            $resultArray[$dateString] = $dateString;
        }

        return implode(', ', $resultArray);
    }
}
