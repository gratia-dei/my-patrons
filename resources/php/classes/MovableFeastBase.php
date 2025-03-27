<?php

class MovableFeastBase
{
    private const MISSING_DATE = '00-00';
    private const IMMOVABLE_DATE_SEPARATOR = 'x';

    private $date;
    private $path;
    private $file;
    private $json;

    private $isLastMonthWithDayImmovable = false;

    public function __construct()
    {
        $this->date = new Date();
        $this->path = new Path();
        $this->file = new File();
        $this->json = new Json();
    }

    public function getValidMonthWithDay(string $monthWithDay): string
    {
        if (!preg_match("/^[0-9][0-9](?'separator'[-" . self::IMMOVABLE_DATE_SEPARATOR . "])[0-9][0-9]$/", $monthWithDay, $matches)) {
            throw new StandardException('invalid date');
        }
        $this->isLastMonthWithDayImmovable = (self::IMMOVABLE_DATE_SEPARATOR === $matches['separator']);

        return str_replace(self::IMMOVABLE_DATE_SEPARATOR, '-', $monthWithDay);
    }

    public function isLastMonthWithDayImmovable(): bool
    {
        return $this->isLastMonthWithDayImmovable;
    }

    public function getMissingDate(int $year): string {
        return self::MISSING_DATE;
    }

    public function getResurrectionFeastDateValidSince1584OrEarlier(int $year): string
    {
        //Meeus/Jones/Butcher method
        $a = $year % 19;
        $b = (int) ($year / 100);
        $c = $year % 100;
        $d = (int) ($b / 4);
        $e = $b % 4;
        $f = (int) (($b + 8) / 25);
        $g = (int) (($b - $f + 1) / 3);
        $h = (19 * $a + $b - $d - $g + 15) % 30;
        $i = (int) ($c / 4);
        $k = $c % 4;
        $l = (32 + 2 * $e + 2 * $i - $h - $k) % 7;
        $m = (int)(($a + 11 * $h + 22 * $l) / 451);
        $p = ($h + $l - 7 * $m + 114) % 31;

        $day = $p + 1;
        $month = (int) (($h + $l - 7 * $m + 114) / 31);

        $monthWithDay = str_pad($month, 2, '0', STR_PAD_LEFT) . '-' . str_pad($day, 2, '0', STR_PAD_LEFT);

        return $monthWithDay;
    }

    private function getDayOfMonth(int $year, int $month): string
    {
        $monthString = str_pad($month, 2, '0', STR_PAD_LEFT);
        $date = $this->date->getDateMovedByDays("$year-$monthString-01", -1);
        $monthWithDay = $this->date->getDateMonthWithDay($date);

        return str_replace('-', self::IMMOVABLE_DATE_SEPARATOR, $monthWithDay);
    }

    public function getDayOfJanuary(int $year): string
    {
        return $this->getDayOfMonth($year, 1);
    }

    public function getDayOfOctober(int $year): string
    {
        return $this->getDayOfMonth($year, 10);
    }

    public function getDayOfDecember(int $year): string
    {
        return $this->getDayOfMonth($year, 12);
    }

    public function getHolyFamilyFeastDateValidSince1956(int $year): string
    {
        $jan7 = "$year-01-07";
        $weekDay = $this->date->getFullDateWeekDay($jan7);

        if ($weekDay === 0) {
            $weekDay = 7;
        } else if ($weekDay === 1) {
            return self::MISSING_DATE; //In years 1924/29/35/46/52/57 feast date was (could be) different by dioceses).
        }

        $date = $this->date->getDateMovedByDays($jan7, 7 - $weekDay);

        return $this->date->getDateMonthWithDay($date);
    }

    public function getHolyFamilyFeastDateValidSince1960(int $year): string
    {
        $jan7 = "$year-01-07";
        $weekDay = $this->date->getFullDateWeekDay($jan7);

        if ($weekDay === 0) {
            $weekDay = 7;
        }

        $date = $this->date->getDateMovedByDays($jan7, 7 - $weekDay);

        return $this->date->getDateMonthWithDay($date);
    }

    public function getHolyFamilyFeastDateValidSince2001(int $year): string
    {
        $dec29 = "$year-12-29";
        $weekDay = $this->date->getFullDateWeekDay($dec29);

        $moveDays = 0;
        if ($weekDay === 4 || $weekDay === 5) {
            $moveDays = $weekDay - 3;
        } else if ($weekDay >= 1 && $weekDay <= 3) {
            $moveDays = -$weekDay;
        }

        $date = $this->date->getDateMovedByDays($dec29, $moveDays);

        return $this->date->getDateMonthWithDay($date);
    }

    public function getJesusTheKingFeastDateValidBeforeMr2001(int $year): string
    {
        $oct31 = "$year-10-31";
        $weekDay = $this->date->getFullDateWeekDay($oct31);

        $date = $this->date->getDateMovedByDays($oct31, -$weekDay);

        return $this->date->getDateMonthWithDay($date);
    }

    public function getTheMostHolyNameOfJesusFeastDateValidSince1956(int $year): string
    {
        $jan2 = "$year-01-02";
        $weekDay = $this->date->getFullDateWeekDay($jan2);

        $moveDays = 0;
        if ($weekDay >= 4 && $weekDay <= 6) {
            $moveDays = 7 - $weekDay;
        }

        $date = $this->date->getDateMovedByDays($jan2, $moveDays);

        return $this->date->getDateMonthWithDay($date);
    }

    public function getTheGreaterProcessionToSaintPeterDateValidBeforeMr1960(int $year): string
    {
        $result = self::MISSING_DATE;

        $resurrectionDate = $this->getResurrectionFeastDateValidSince1584OrEarlier($year);
        if ($resurrectionDate === '04-25') {
            $result = '04-27';
        }

        return $result;
    }

    public function getTheGreaterProcessionToSaintPeterDateValidBeforeMr2001(int $year): string
    {
        $result = self::MISSING_DATE;

        $resurrectionDate = $this->getResurrectionFeastDateValidSince1584OrEarlier($year);
        if ($resurrectionDate === '04-25') {
            $result = '04-28';
        } else if ($resurrectionDate === '04-24') {
            $result = '04-27';
        }

        return $result;
    }

    public function getBaptismOfJesusFeastDateValidToday(int $year): string
    {
        $jan6 = "$year-01-06";
        $weekDay = $this->date->getFullDateWeekDay($jan6);

        $date = $this->date->getDateMovedByDays($jan6, 7 - $weekDay);

        return $this->date->getDateMonthWithDay($date);
    }

    public function getFirstSundayOfAdventDateValidSince1956(int $year): string
    {
        $dec25 = "$year-12-25";
        $weekDay = $this->date->getFullDateWeekDay($dec25);

        if ($weekDay === 0) {
            $weekDay = 7;
        }

        $date = $this->date->getDateMovedByDays($dec25, -4 * 7 + (7 - $weekDay));

        return $this->date->getDateMonthWithDay($date);
    }
}
