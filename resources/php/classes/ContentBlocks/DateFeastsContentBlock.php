<?php

class DateFeastsContentBlock extends DateContentBlock implements ContentBlockInterface
{
    protected function setOtherProperties(string $dates): void
    {
        $this->iconFile = 'patron-defender-icon';
        $this->listNameVariable = 'lang-feasts-to-discover';
        $this->formTemplate = $this->getOriginalHtmlFileContent('content-blocks/date-change-form-single-full-content-block.html');
        $this->dateFormInfoLangVariable = 'lang-date-form-info-for-feasts-to-discover';

        $this->setValidSingleDate($dates);

        $filePath = $this->getGeneratedFileSuffix(self::FEASTS_MOVABLE_FILE_PATH);
        $fileData = $this->getOriginalJsonFileContentArray($filePath);
        $rows = $this->getMovableRows($fileData);

        $filePath = $this->getGeneratedFileSuffix(self::FEASTS_IMMOVABLE_FILE_PATH);
        $fileData = $this->getOriginalJsonFileContentArray($filePath);
        $rowsToAdd = $this->getImmovableRows($fileData);
        foreach ($rowsToAdd as $patronUrl => $patronData) {
            $rows = $this->addPatronToList($rows, $patronUrl, $patronData);
        }

        $this->rows = $rows;
    }

    public function getDatesString(): string
    {
        $date = $this->dates[0] ?? '';

        return $this->getDate()->getFullDateWithRomanMonth($date) . ' (' . $this->getFullDateWeekDayLanguageVariable($date) . ')';
    }
}
