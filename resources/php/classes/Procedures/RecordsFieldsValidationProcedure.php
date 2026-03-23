<?php

class RecordsFieldsValidationProcedure extends Procedure
{
    private const CONFIGURATION_FILE_PATH = 'records-fields-validation-configuration.json';

    private const PARAMETRIZED_FIELD_PATH_ELEMENT_PREFIX = '#';
    private const PARAMETRIZED_REQUIRED_FIELD_SOURCE_PATH_SUFFIX = '---required';

    private const FIELDS_CONFIG_TYPES_INDEX = 'types';
    private const FIELDS_CONFIG_ELEMENT_TYPES_INDEX = 'element-types';
    private const FIELDS_CONFIG_ASSIGNMENTS_INDEX = 'assignments';

    private const FIELDS_CONFIG_TYPE_NULL = 'null';
    private const FIELDS_CONFIG_TYPE_BOOLEAN = 'boolean';
    private const FIELDS_CONFIG_TYPE_INTEGER = 'integer';
    private const FIELDS_CONFIG_TYPE_STRING = 'string';
    private const FIELDS_CONFIG_TYPE_EMPTY_ARRAY = 'empty-array';
    private const FIELDS_CONFIG_TYPE_INDEXED_ARRAY = 'indexed-array';
    private const FIELDS_CONFIG_TYPE_ASSOCIATIVE_ARRAY = 'associative-array';

    private const FIELDS_CONFIG_EMPTY_TYPES = [self::FIELDS_CONFIG_TYPE_NULL, self::FIELDS_CONFIG_TYPE_EMPTY_ARRAY];

    private const CATEGORIES_FILE_PATH = 'records/categories/index.generated.json';
    private const FEASTS_FILE_PATH = 'records/feasts/index.generated.json';
    private const FORENAMES_FILE_PATH = 'records/forenames/index.generated.json';

    private $parametrizedFieldsValues = [];

    public function run(string $srcRootPath): void
    {
        $this->loadParametrizedFieldsValues();

        $config = $this->getOriginalJsonFileContentArray(self::CONFIGURATION_FILE_PATH);

        foreach ($config as $recordType => $pathData) {
            if (!is_array($pathData)) {
                $pathData = $config[$pathData] ?? [];
            }

            $configFields = $this->getConfigFields($pathData);

            $generatedFileSuffix = $this->getGeneratedFileSuffix();
            $fullRootPath = $this->getFullDataPath($srcRootPath);
            $fullPath = "$fullRootPath/$recordType";

            $paths = $this->getPathTree($fullPath);
            foreach ($paths as $staticFilePath => $isDirectory) {
                $dirName = dirname($staticFilePath);

                if ($isDirectory
                    || in_array($staticFilePath, [
                        $this->getIndexFilePath($dirName),
                        $this->getIndexFilePath($dirName, true),
                        $this->getAliasFilePath($dirName),
                        $this->getAliasFilePath($dirName, true),
                    ])
                    || false !== strpos($staticFilePath, $generatedFileSuffix)
                ) {
                    continue;
                }

                $extensionDotPosition = strrpos($staticFilePath, '.');
                $staticFilePathWithoutExtension = mb_substr($staticFilePath, 0, $extensionDotPosition);
                $generatedFilePath = $this->getGeneratedFileSuffix($staticFilePathWithoutExtension);

                $staticData = $this->getOriginalJsonFileContentArrayForFullPath($staticFilePath);
                $generatedData = $this->getOriginalJsonFileContentArrayForFullPath($generatedFilePath)[self::FIELDS_INDEX] ?? [];

                $sourceFilePath = mb_substr($staticFilePathWithoutExtension, mb_strlen($fullRootPath));

                $this->validate($sourceFilePath, $pathData, $configFields, $staticData);
            }
        }
    }

    private function getConfigFields(array $configData): array
    {
        $result = [];

        foreach ($configData as $fieldName => $fieldConfig) {
            $fieldPath = explode('/', $fieldName);

            $target = &$result;
            foreach ($fieldPath as $element) {
                if (!isset($target[$element])) {
                    $target[$element] = [];
                }
                $target = &$target[$element];
            }
        }

        return $result;
    }

    private function loadParametrizedFieldsValues(): void
    {
        $field = 'category';
        $data = $this->getOriginalJsonFileContentArray(self::CATEGORIES_FILE_PATH);
        foreach ($data as $value => $row) {
            $this->parametrizedFieldsValues[$field][$value] = $value;
        }

        $field = 'feast';
        $data = $this->getOriginalJsonFileContentArray(self::FEASTS_FILE_PATH);
        foreach ($data as $value => $row) {
            $this->parametrizedFieldsValues[$field][$value] = $value;
        }

        $field = 'forename';
        $data = $this->getOriginalJsonFileContentArray(self::FORENAMES_FILE_PATH);
        foreach ($data as $value => $row) {
            $this->parametrizedFieldsValues[$field][$value] = $value;
        }

        $field = 'language';
        $data = $this->getOriginalJsonFileContentArray(self::LANGUAGES_FILE_PATH);
        foreach ($data as $value => $row) {
            $this->parametrizedFieldsValues[$field][$value] = $value;
        }

        $field .= self::PARAMETRIZED_REQUIRED_FIELD_SOURCE_PATH_SUFFIX;
        $data = self::SELECTABLE_LANGUAGES_ORDER;
        foreach ($data as $value) {
            $this->parametrizedFieldsValues[$field][$value] = $value;
        }
    }

    private function getParametrizedKeys(string $type): array
    {
        return [
            $this->parametrizedFieldsValues[$type] ?? [],
            $this->parametrizedFieldsValues[$type . self::PARAMETRIZED_REQUIRED_FIELD_SOURCE_PATH_SUFFIX] ?? [],
        ];
    }

    private function getRealExistingConfigFields(string $configField, array $staticDataKeys): array
    {
        $result = [];

        if (mb_substr($configField, 0, 1) !== self::PARAMETRIZED_FIELD_PATH_ELEMENT_PREFIX) {
            return [$configField];
        }

        $isIndex = ($configField === self::PARAMETRIZED_FIELD_PATH_ELEMENT_PREFIX . 'index');

        list($validKeys, $requiredKeys) = $this->getParametrizedKeys(mb_substr($configField, 1));

        foreach ($staticDataKeys as $key) {
            $result[$key] = $key;
        }
        foreach ($requiredKeys as $key) {
            $result[$key] = $key;
        }

        if ($result === []) {
            throw new GeneratorException('Empty parametrized fields');
        }
        foreach ($result as $key) {
            if (!isset($validKeys[$key]) && (!$isIndex || !is_int($key))) {
                throw new GeneratorException("Invalid parametrized value '$key'");
            }
        }

        return $result;
    }

    private function validateType(array $types, mixed $value): void
    {
        foreach ($types as $type) {
            switch ($type) {
                case self::FIELDS_CONFIG_TYPE_NULL:
                    if (is_null($value)) {
                        return;
                    }
                    break;

                case self::FIELDS_CONFIG_TYPE_BOOLEAN:
                    if (!is_null($value) && is_bool($value)) {
                        return;
                    }
                    break;

                case self::FIELDS_CONFIG_TYPE_STRING:
                    if (!is_null($value) && is_string($value)) {
                        return;
                    }
                    break;

                case self::FIELDS_CONFIG_TYPE_EMPTY_ARRAY:
                    if (!is_null($value) && is_array($value) && $value === []) {
                        return;
                    }
                    break;

                case self::FIELDS_CONFIG_TYPE_ASSOCIATIVE_ARRAY:
                    if (!is_null($value) && is_array($value) && $value !== []) {
                        return;
                    }
                    break;

                case self::FIELDS_CONFIG_TYPE_INDEXED_ARRAY:
                    if (!is_null($value) && is_array($value) && $value !== [] && array_keys($value) === range(0, count($value) - 1)) {
                        return;
                    }
                    break;

                default:
                    if (mb_substr($type, 0, 1) !== self::PARAMETRIZED_FIELD_PATH_ELEMENT_PREFIX) {
                        throw new GeneratorException("Unknown fields config type '$type'");
                    }

                    list($validKeys, $requiredKeys) = $this->getParametrizedKeys(mb_substr($type, 1));
                    if (($validKeys[$value] ?? null) === $value) {
                        return;
                    }
                    break;
            }
        }

        throw new GeneratorException("Record file value not matching to any possibly types ['" . implode("', '", $types) . "']");
    }

    private function makeError(string $message, string $fieldPath, string $filePath): void
    {
        $this->error($message . " for field '" . trim($fieldPath, '/') . "' in source file '" . trim($filePath, '/') . "'");
    }

    private function validate(
        string $filePath,
        array $configData,
        array $configFieldsContext,
        mixed $staticDataContext,
        string $fieldPath = ''
    ): void {
        $staticDataKeys = [];
        if (is_array($staticDataContext)) {
            $staticDataKeys = array_keys($staticDataContext);
        }

        foreach ($configFieldsContext as $configField => $subfields) {
            $fields = ['!!!'];

            $pathConfigPath = trim("$fieldPath/$configField", '/');
            $pathConfig = $configData[$pathConfigPath] ?? [];

            $configTypes = $pathConfig[self::FIELDS_CONFIG_TYPES_INDEX] ?? [];
            $configElementTypes = $pathConfig[self::FIELDS_CONFIG_ELEMENT_TYPES_INDEX] ?? [];
            $configAssignments = $pathConfig[self::FIELDS_CONFIG_ASSIGNMENTS_INDEX] ?? [];

            $staticDataKeys = is_array($staticDataContext) ? array_keys($staticDataContext) : [];

            try {
                $fields = $this->getRealExistingConfigFields($configField, $staticDataKeys);
                foreach ($fields as $field) {
                    $nextFoundField = array_shift($staticDataKeys);
                    if ($field !== $nextFoundField) {
                        throw new GeneratorException("Expected field is '$field' but found '$nextFoundField'");
                    }

                    if ($configTypes !== []) {
                        $this->validateType($configTypes, $staticDataContext[$field] ?? null);
                    }
                    if ($configElementTypes !== [] && is_array($staticDataContext[$field])) {
                        foreach ($staticDataContext[$field] as $val) {
                            $this->validateType($configElementTypes, $val);
                        }
                    }
                }
            } catch (GeneratorException $ex) {
                $this->makeError($ex->getMessage(), "$fieldPath/$configField", $filePath);
            }

            foreach ($fields as $field) {
                $staticValue = $staticDataContext[$field] ?? null;
                unset($staticDataContext[$field]);

                if (is_null($staticValue) && in_array(self::FIELDS_CONFIG_TYPE_NULL, $configTypes, true)) {
                    continue;
                }
                if ($staticValue === [] && in_array(self::FIELDS_CONFIG_TYPE_EMPTY_ARRAY, $configTypes, true)) {
                    continue;
                }

                $this->validate(
                    $filePath,
                    $configData,
                    $configFieldsContext[$configField],
                    $staticValue,
                    "$fieldPath/$field"
                );
            }
        }

        if (is_array($staticDataContext) && $staticDataContext !== [] && $configFieldsContext !== []) {
            foreach ($staticDataContext as $field => $value) {
                $this->makeError("Expected field is '' but found '$field'", $fieldPath, $filePath);
            }
        }
    }
}
