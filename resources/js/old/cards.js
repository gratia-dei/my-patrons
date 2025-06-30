//cards.js
//Copyright (c) 2021 gratieDei.org - all rights reserved
//This JS code can be used only on original myPatrons.org site!

const INITIATIVE_TEXT_INFO = 'myPatrons.org';

const DEFAULT_PAPER_FORMAT = 'A4';
const DEFAULT_PAPER_ORIENTATION = 'h';
const DEFAULT_MARGIN_SIZE = 15;
const DEFAULT_PPI = 96;
const DEFAULT_QUALITY = 1;
const DEFAULT_BLEED = 0;
const DEFAULT_CARD_DISTANCE = 0;

const SINGLE_CARD_PAPER_FORMAT = '1';

const UNKNOWN = '?';
const CHECK_MARK_SYMBOL_CHARACTER = '✓';
const COLON_SYMBOL_CHARACTER = ':';
const DATE_HYPHEN_SYMBOL_CHARACTER = '-';
const DEATH_SYMBOL_CHARACTER = '✝';

const DEV_HOSTNAME_REMOVE_STRING = '.dev';

const QR_CODE_QUALITY_FACTOR = 10;

const ALLOWED_PAPER_FORMAT_TYPES = ['A', 'B', 'C'];
const ALLOWED_PAPER_FORMAT_MIN_SIZE = 0;
const ALLOWED_PAPER_FORMAT_MAX_SIZE = 6;
const ALLOWED_PAPER_ORIENTATIONS = {
  'v': 'lang-vertical',
  'h': 'lang-horizontal'
};
const ALLOWED_MARGIN_MIN_SIZE = 0;
const ALLOWED_MARGIN_MAX_SIZE = 50;
const ALLOWED_PPI_MIN_VALUE = 50;
const ALLOWED_PPI_STEP_VALUE = 50;
const ALLOWED_PPI_MAX_VALUE = 600;
const ALLOWED_QUALITY_MIN_VALUE = 1;
const ALLOWED_QUALITY_MAX_VALUE = 10;
const ALLOWED_BLEED_MIN_SIZE = 0;
const ALLOWED_BLEED_MAX_SIZE = 5;
const ALLOWED_CARD_DISTANCE_MIN_SIZE = 0;
const ALLOWED_CARD_DISTANCE_MAX_SIZE = 10;

const EMPTY_IMAGE_X_COORDINATE = 0;
const EMPTY_IMAGE_Y_COORDINATE = 0;
const EMPTY_IMAGE_CENTER_TO_EDGE_DISTANCE = 500;

const VERTICAL_PAPER_FORMATS = {
  "A0": {
    "width": 841,
    "height": 1189
  },
  "B0": {
    "width": 1000,
    "height": 1414
  },
  "C0": {
    "width": 917,
    "height": 1297
  }
}

const DEFAULT_FONT_FAMILY = 'Arial';
const DRAW_TEXT_MATCH_FONT_SIZE_COEFF = 0.8;
const DEFAULT_FONT_COLOR = 'white';

const FONT_STYLE_NORMAL = 'normal';

const DETAILS_FORM_ID = "details-form";

const CLASSNAME_FOR_BUTTON = "btn-my";
const CLASSNAME_FOR_SELECT = "form-select-my";
const CLASSNAME_FOR_INPUT = "form-control input-my";
const CLASSNAME_FOR_INPUT_GROUP = "input-group-sm";
const CLASSNAME_FOR_INPUT_SPAN = "input-group-text";
const CLASSNAME_FOR_IMAGE_CHANGE_ICON = 'image-change-icon';
const CLASSNAME_FOR_CARD_FORM_DATA_CONTACT_INFO = 'card-form-data-contact-info';

const TEXT_ALIGN_LEFT = 'left';
const TEXT_ALIGN_RIGHT = 'right';
const TEXT_ALIGN_CENTER = 'center';
const TEXT_ALIGN_JUSTIFY = 'justify';

const TEXT_BASELINE = 'top';
const TEXT_BASELINE_HEIGHT_COEFF = 2 / 3;

const LINEAR_SCALE_SHORT_LINE_LENGTH = 0.5;

const CARD_WIDTH = 63;
const CARD_HEIGHT = 88;
const CARD_MARGIN = 3;
const CARD_MINIMAL_TOP_LEFT_MARGIN = 3;

const CARD_ID_IDENTIFIER_TEXT_FONT_SIZE = 2;
const CARD_ID_IDENTIFIER_TEXT_Y_CHANGE = -0.5;
const CARD_ID_IDENTIFIER_TEXT_FONT_FAMILY = DEFAULT_FONT_FAMILY;
const CARD_ID_IDENTIFIER_MIN_CARD_DISTANCE_TO_SHOW = 3;
const CARD_ID_IDENTIFIER_MAX_BLEED_TO_SHOW = 0;

const CARD_DATA_FIELD_X = 'x';
const CARD_DATA_FIELD_Y = 'y';
const CARD_DATA_FIELD_IS_ACTIVE = 'isActive';
const CARD_DATA_FIELD_PATH = 'path';
const CARD_DATA_FIELD_REFRESHED_PARAMS_PATH = 'refreshedParamsPath';
const CARD_DATA_FIELD_FILE_DATA = 'fileData';
const CARD_DATA_FIELD_PARAMS = 'params';

const CARD_FORM_UNSELECTED_VALUE = '';
const CARD_FORM_UNSELECTED_NAME = '...';
const CARD_FORM_ID_PREFIX = 'card-form-';
const CARD_FORM_INPUTS_DIV_ID_PREFIX = 'card-form-inputs-';
const CARD_FORM_INPUTS_DIV_EDIT_BUTTON_ID_PREFIX = CARD_FORM_INPUTS_DIV_ID_PREFIX + "edit-button-";
const CARD_FORM_INPUTS_DIV_HIDE_BUTTON_ID_PREFIX = CARD_FORM_INPUTS_DIV_ID_PREFIX + "hide-button-";

//const CARD_TYPE_BASE_FOR_FEAST = 'card-base-for-feast';
//const CARD_TYPE_BASE_FOR_GENERAL = 'card-base-for-general';
//const CARD_TYPE_BASE_FOR_PERSON = 'card-base-for-person';
//const CARD_TYPE_CHALLENGES = 'card-challenges';
const CARD_TYPE_REVERSE = 'card-reverse';
const CARD_TYPE_GOD = 'god';
const CARD_TYPE_PATRONS = 'patrons';
//const CARD_TYPE_I = 'i';

const CARD_TYPE_I_QR_CODE_URL_PREFIX = '/dates/messenger-mission-patrons';

const CARD_TYPES_EMPTY_ROOT_PATH = '_';
const CARD_TYPES_ROOT_PATHS = {
  [CARD_TYPE_GOD]: '/files/data/records',
  [CARD_TYPE_PATRONS]: '/files/data/records',
  //[CARD_TYPE_BASE_FOR_PERSON]: CARD_TYPES_EMPTY_ROOT_PATH,
  //[CARD_TYPE_CHALLENGES]: CARD_TYPES_EMPTY_ROOT_PATH,
  //[CARD_TYPE_BASE_FOR_FEAST]: CARD_TYPES_EMPTY_ROOT_PATH,
  //[CARD_TYPE_BASE_FOR_GENERAL]: CARD_TYPES_EMPTY_ROOT_PATH,
  //[CARD_TYPE_I]: CARD_TYPES_EMPTY_ROOT_PATH,
  [CARD_TYPE_REVERSE]: CARD_TYPES_EMPTY_ROOT_PATH
};
const CARD_TYPE_SELECTED = CARD_TYPE_PATRONS;

const CARD_TYPES_WITH_JSON_IMPORT_EXPORT = [CARD_TYPE_GOD, CARD_TYPE_PATRONS];

const CARD_IMAGE_BACKGROUND_COLOR = 'yellow';

const FILE_DATA_IMAGES_KEY = 'images';
const FILE_DATA_NAMES_KEY = 'names';
const FILE_DATA_DEATH_KEY = 'died';
const FILE_DATA_CATEGORIES_KEY = 'categories';
const FILE_DATA_ORDER_KEY = 'order';
const FILE_DATA_FORENAMES_KEY = 'forenames';
const FILE_DATA_SURNAMES_KEY = 'surnames';
const FILE_DATA_EPITHETS_KEY = 'epithets';

const IMAGES_DATA_DEFAULT_KEY = '1';

const CARD_DATA_PARAMS_FIELD_NAME = 'lang-name';
const CARD_DATA_PARAMS_FIELD_LANGUAGE = 'lang-language';
const CARD_DATA_PARAMS_FIELD_IMAGE_FILE_URL = 'lang-image-file-url';
const CARD_DATA_PARAMS_FIELD_IMAGE_PAGE_URL = 'lang-image-page-url';
const CARD_DATA_PARAMS_FIELD_IMAGE_ATTRIBUTION = 'lang-image-attribution';
const CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_X = 'lang-image-area-center-x';
const CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_Y = 'lang-image-area-center-y';
const CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_TO_EDGE_DISTANCE = 'lang-image-area-center-to-edge-distance';
const CARD_DATA_PARAMS_FIELD_DEATH = 'lang-date-of-death';
const CARD_DATA_PARAMS_FIELD_CATEGORIES = 'lang-categories';
const CARD_DATA_PARAMS_FIELD_ORDER = 'lang-order';
const CARD_DATA_PARAMS_FIELD_QR_CODE_URL = 'lang-qr-code-url';
const CARD_DATA_PARAMS_FIELD_FORENAMES = 'lang-forenames';
const CARD_DATA_PARAMS_FIELD_SURNAMES = 'lang-surnames';
const CARD_DATA_PARAMS_FIELD_EPITHETS = 'lang-epithets';

const CARD_DATA_PARAMS_FIELD_MY_BIRTH = 'lang-birth';
const CARD_DATA_PARAMS_FIELD_MY_BAPTISM = 'lang-sacrament-baptism';
const CARD_DATA_PARAMS_FIELD_MY_CONFIRMATION = 'lang-sacrament-confirmation';
const CARD_DATA_PARAMS_FIELD_MY_HOLY_COMMUNION = 'lang-sacrament-holy-communion';
const CARD_DATA_PARAMS_FIELD_MY_PENANCE = 'lang-sacrament-penance';
const CARD_DATA_PARAMS_FIELD_MY_ANOINTING_OF_THE_SICK = 'lang-sacrament-anointing-of-the-sick';
const CARD_DATA_PARAMS_FIELD_MY_HOLY_ORDERS = 'lang-sacrament-holy-orders';
const CARD_DATA_PARAMS_FIELD_MY_MARRIAGE = 'lang-sacrament-marriage';

const CARD_DATA_PARAMS_MY_FIELDS_ORDER = [
  CARD_DATA_PARAMS_FIELD_MY_BIRTH,
  CARD_DATA_PARAMS_FIELD_MY_BAPTISM,
  CARD_DATA_PARAMS_FIELD_MY_CONFIRMATION,
  CARD_DATA_PARAMS_FIELD_MY_HOLY_COMMUNION,
  CARD_DATA_PARAMS_FIELD_MY_PENANCE,
  CARD_DATA_PARAMS_FIELD_MY_ANOINTING_OF_THE_SICK,
  CARD_DATA_PARAMS_FIELD_MY_HOLY_ORDERS,
  CARD_DATA_PARAMS_FIELD_MY_MARRIAGE
];
const CARD_DATA_PARAMS_FIELD_WITH_CURRENT_DATE = CARD_DATA_PARAMS_FIELD_MY_BIRTH;
const CARD_DATA_PARAMS_SOURCE_FIELD_NAME_PREFIX = "source-";

const TRINITY_SYMBOL_URL = 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Scutum_fidei_LAT.svg';

const STATUS_COLOR_BORDER = '#000000';
const STATUS_COLOR_CIRCLE = '#DDDDDD';
const STATUS_COLOR_RED = '#F43545';
const STATUS_COLOR_ORANGE = '#FA8901';
const STATUS_COLOR_YELLOW = '#FAD717';
const STATUS_COLOR_GREEN = '#00BA71';
const STATUS_COLOR_BLUE = '#00C2DE';
const STATUS_COLOR_INDIGO = '#00418D';
const STATUS_COLOR_VIOLET = '#5F2879';
const STATUS_COLOR_WHITE = '#FFFFFF';
const STATUS_COLOR_BLACK = '#000000';

const COLOR_LIGHTGRAY = '#DDDDDD';

const PATRON_PROGRESS_BORDER_COLOR = '#BBBBBB';
const PATRON_PROGRESS_CELL_SIZE = 1.7;
const PATRON_PROGRESS_ROWS = 10;
const PATRON_PROGRESS_COLUMNS = 10;

const STANDARD_CARD_IMAGE_WIDTH_PIXELS = 862;
const STANDARD_CARD_IMAGE_HEIGHT_PIXELS = 1157;
const STANDARD_CARD_IMAGE_BLEED_SIZE = 5;

const EMPTY_CARD_BACKGROUND_FILE = 'files/resources/png/card-white-background.png';

const IMAGE_DATA_FIELD_FILE_URL = 'file-url';
const IMAGE_DATA_FIELD_PAGE_URL = 'page-url';
const IMAGE_DATA_FIELD_ATTRIBUTION = 'attribution';
const IMAGE_DATA_FIELD_AREA_CENTER_X = 'area-center-x';
const IMAGE_DATA_FIELD_AREA_CENTER_Y = 'area-center-y';
const IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE = 'area-center-to-edge-distance';
const CARD_TYPE_BACKGROUND_IMAGES = {
  //[CARD_TYPE_BASE_FOR_FEAST]: {
    //[IMAGE_DATA_FIELD_FILE_URL]: 'files/resources/png/card-white-background.png',
    //[IMAGE_DATA_FIELD_AREA_CENTER_X]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_Y]: STANDARD_CARD_IMAGE_HEIGHT_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2 * CARD_WIDTH / (CARD_WIDTH + 2 * STANDARD_CARD_IMAGE_BLEED_SIZE),
  //},
  //[CARD_TYPE_BASE_FOR_GENERAL]: {
    //[IMAGE_DATA_FIELD_FILE_URL]: 'files/resources/png/card-white-background.png',
    //[IMAGE_DATA_FIELD_AREA_CENTER_X]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_Y]: STANDARD_CARD_IMAGE_HEIGHT_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2 * CARD_WIDTH / (CARD_WIDTH + 2 * STANDARD_CARD_IMAGE_BLEED_SIZE),
  //},
  //[CARD_TYPE_BASE_FOR_PERSON]: {
    //[IMAGE_DATA_FIELD_FILE_URL]: 'files/resources/png/card-white-background.png',
    //[IMAGE_DATA_FIELD_AREA_CENTER_X]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_Y]: STANDARD_CARD_IMAGE_HEIGHT_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2 * CARD_WIDTH / (CARD_WIDTH + 2 * STANDARD_CARD_IMAGE_BLEED_SIZE),
  //},
  //[CARD_TYPE_CHALLENGES]: {
    //[IMAGE_DATA_FIELD_FILE_URL]: 'files/resources/png/card-white-background.png',
    //[IMAGE_DATA_FIELD_AREA_CENTER_X]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_Y]: STANDARD_CARD_IMAGE_HEIGHT_PIXELS / 2,
    //[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2 * CARD_WIDTH / (CARD_WIDTH + 2 * STANDARD_CARD_IMAGE_BLEED_SIZE),
  //},
  [CARD_TYPE_PATRONS]: {
    [IMAGE_DATA_FIELD_FILE_URL]: 'files/resources/png/card-white-background.png',
    [IMAGE_DATA_FIELD_AREA_CENTER_X]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2,
    [IMAGE_DATA_FIELD_AREA_CENTER_Y]: STANDARD_CARD_IMAGE_HEIGHT_PIXELS / 2,
    [IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: STANDARD_CARD_IMAGE_WIDTH_PIXELS / 2 * CARD_WIDTH / (CARD_WIDTH + 2 * STANDARD_CARD_IMAGE_BLEED_SIZE),
  }
};
CARD_TYPE_BACKGROUND_IMAGES[CARD_TYPE_GOD] = CARD_TYPE_BACKGROUND_IMAGES[CARD_TYPE_PATRONS];
//CARD_TYPE_BACKGROUND_IMAGES[CARD_TYPE_I] = CARD_TYPE_BACKGROUND_IMAGES[CARD_TYPE_PATRONS];
CARD_TYPE_BACKGROUND_IMAGES[CARD_TYPE_REVERSE] = CARD_TYPE_BACKGROUND_IMAGES[CARD_TYPE_PATRONS];

const CSS_INVISIBLE = 'display: none';
const JSON_VALUES_INPUT_ID_PREFIX = 'json-values';
const JSON_VALUES_FIELDS_PREFIX = 'lang-';
const JSON_VALUES_SECTIONS_PREFIXES = ['image'];

const PATRON_CATEGORIES_JSON_FILE = '/files/data/records/categories/index.generated.json';
const FEMALE_CATEGORY = 'female';
const CATEGORY_NAME = 'name';
const CATEGORY_FEMALE_EQUIVALENT_NAME = 'female-equivalent-' + CATEGORY_NAME;

const LANGUAGE_JSON_FILE = '/files/data/website-language-variables.json';
const LANGUAGE_MISSING_VARIABLE_SIGN = '!!!';
const LANGUAGE_VARIABLE_CLEAR_FIELD_BUTTON = 'lang-clear-field';
const LANGUAGE_VARIABLE_EDIT_BUTTON = 'lang-edit-fields';
const LANGUAGE_VARIABLE_HIDE_BUTTON = 'lang-hide-fields';
const LANGUAGE_VARIABLE_REFRESH_BUTTON = 'lang-refresh-fields';
const LANGUAGE_VARIABLE_EXPORT_VALUES_TO_JSON_BUTTON = 'lang-export-values-to-json';
const LANGUAGE_VARIABLE_IMPORT_VALUES_FROM_JSON_BUTTON = 'lang-import-values-from-json';
const LANGUAGE_VARIABLE_COPY_TO_CLIPBOARD_BUTTON = 'lang-copy-json-to-clipboard';
const LANGUAGE_VARIABLE_CARD_FORM_DATA_CONTACT_INFO = 'lang-card-form-data-contact-info';

let languageVariables = {};
let patronCategories = {};
let cardsData = [];
let filesContents = {};
let filesContentsErrors = {};

const getCurrentDate = function() {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
}

const isYearLeap = function(year) {
  return !(year % 4 != 0 || (year % 100 == 0 && year % 400 != 0));
}

const getMonthAndDayFromFullDate = function(date) {
  const matches = date.match(/^(\d+)-(\d{2})-(\d{2})$/);
  if (!matches) {
    return '';
  }

  return matches[2] + (isYearLeap(Number(matches[1])) ? "!" : "-") + matches[3];
}

const getPaperFormatSelect = function() {
  return document.getElementById('paper-format');
}

const getPaperOrientationSelect = function() {
  return document.getElementById('paper-orientation');
}

const getMarginSizeSelect = function() {
  return document.getElementById('margin-size');
}

const getPpiSelect = function() {
  return document.getElementById('ppi');
}

const getQualitySelect = function() {
  return document.getElementById('quality');
}

const getBleedSelect = function() {
  return document.getElementById('bleed');
}

const getCardDistanceSelect = function() {
  return document.getElementById('card-distance');
}

const getCardsFormsDiv = function() {
  return document.getElementById('cards-forms');
}

const getPpiTestDiv = function() {
  return document.getElementById('ppi-test');
}

const getCardDistance = function() {
  const cardDistance = getCardDistanceSelect().value;
  const bleed = getBleedSelect().value;

  return Math.max(cardDistance, 2 * bleed);
}

const getOneCardWidthBySettings = function() {
  return CARD_WIDTH + 2 * Number(getBleedSelect().value);
}

const getOneCardHeightBySettings = function() {
  return CARD_HEIGHT + 2 * Number(getBleedSelect().value);
}

const getCanvas = function() {
  return document.getElementById('cards-canvas');
}

const getContext = function() {
  const canvas = getCanvas();

  return canvas.getContext('2d');
}

const hideDetailsForm = function() {
  document.getElementById(DETAILS_FORM_ID).style = CSS_INVISIBLE;
}

const showDetailsForm = function() {
  document.getElementById(DETAILS_FORM_ID).style = '';
}

const buildForm = async function() {
  languageVariables = await getJsonFromFile(LANGUAGE_JSON_FILE);
  patronCategories = await getJsonFromFile(PATRON_CATEGORIES_JSON_FILE);
  buildPaperFormatSelect();
  buildPaperOrientationSelect();
  buildMarginSizeSelect();
  buildPpiSelect();
  buildQualitySelect();
  buildBleedSelect();
  buildCardDistanceSelect();

  buildCanvas();
}

const buildPaperFormatSelect = function() {
  const formats = getAllowedPaperFormats();
  const select = getPaperFormatSelect();

  for (const value of formats) {
    let option = document.createElement('option');

    option.value = value;
    option.innerHTML = value;
    if (value === DEFAULT_PAPER_FORMAT) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const buildPaperOrientationSelect = function() {
  const orientations = ALLOWED_PAPER_ORIENTATIONS;
  const select = getPaperOrientationSelect();

  for (const key in orientations) {
    let value = orientations[key];
    let option = document.createElement('option');

    option.value = key;
    option.innerHTML = getLanguageVariable(value);
    if (key === DEFAULT_PAPER_ORIENTATION) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const getAllowedPaperFormats = function() {
  let result = [];

  for (const type of ALLOWED_PAPER_FORMAT_TYPES) {
    for (let size = ALLOWED_PAPER_FORMAT_MIN_SIZE; size <= ALLOWED_PAPER_FORMAT_MAX_SIZE; size++) {
      result.push(type + size);
    }
  }

  result.push(SINGLE_CARD_PAPER_FORMAT);

  return result;
}

const buildMarginSizeSelect = function() {
  const select = getMarginSizeSelect();

  for (let value = ALLOWED_MARGIN_MIN_SIZE; value <= ALLOWED_MARGIN_MAX_SIZE; value++) {
    let option = document.createElement('option');

    option.value = value;
    option.innerHTML = value;
    if (value === DEFAULT_MARGIN_SIZE) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const buildPpiSelect = function() {
  const select = getPpiSelect();

  const detectedPpi = getDetectedPpi();
  if (!Number.isInteger(detectedPpi)) {
    detectedPpi = DEFAULT_PPI;
  }

  let ppiList = {
    [detectedPpi]: detectedPpi
  };
  for (let value = ALLOWED_PPI_MIN_VALUE; value <= ALLOWED_PPI_MAX_VALUE; value += ALLOWED_PPI_STEP_VALUE) {
    ppiList[value] = value;
  }

  for (let value of Object.values(ppiList)) {
    let option = document.createElement('option');

    option.value = value;
    option.innerHTML = value;
    if (value === detectedPpi) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const getDetectedPpi = function() {
  const div = getPpiTestDiv();

  if (div === null) {
    return DEFAULT_PPI;
  } else {
    return div.offsetWidth;
  }
}

const buildQualitySelect = function() {
  const select = getQualitySelect();

  for (let value = ALLOWED_QUALITY_MIN_VALUE; value <= ALLOWED_QUALITY_MAX_VALUE; value++) {
    let option = document.createElement('option');

    option.value = value;
    option.innerHTML = value + 'x';
    if (value === DEFAULT_QUALITY) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const buildBleedSelect = function() {
  const select = getBleedSelect();

  for (let value = ALLOWED_BLEED_MIN_SIZE; value <= ALLOWED_BLEED_MAX_SIZE; value++) {
    let option = document.createElement('option');

    option.value = value;
    option.innerHTML = value;
    if (value === DEFAULT_BLEED) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const buildCardDistanceSelect = function() {
  const select = getCardDistanceSelect();

  for (let value = ALLOWED_CARD_DISTANCE_MIN_SIZE; value <= ALLOWED_CARD_DISTANCE_MAX_SIZE; value++) {
    let option = document.createElement('option');

    option.value = value;
    option.innerHTML = value;
    if (value === DEFAULT_CARD_DISTANCE) {
      option.selected = 'selected';
    }
    select.appendChild(option);
  }
}

const mm2px = function(milimeters) {
  const ppi = getPpiSelect().value;
  const pixels = milimeters * ppi / 25.4;

  return pixels;
}

const px2mm = function(pixels) {
  const ppi = getPpiSelect().value;
  const milimeters = pixels * 25.4 / ppi;

  return milimeters;
}

const getPrintableAreaSize = function() {
  const format = getPaperFormatSelect().value;
  const orientation = getPaperOrientationSelect().value;
  const margin = getMarginSizeSelect().value;
  const size = getFormatVerticalSize(format);

  let width = Math.max(0, size.width - 2 * margin);
  let height = Math.max(0, size.height - 2 * margin);

  if (orientation == DEFAULT_PAPER_ORIENTATION) {
    let tmp = width;
    width = height;
    height = tmp;
  }

  return {
    'width': width,
    'height': height
  };
}

const getFormatVerticalSize = function(format) {
  let formatArray = format.split('');

  const formatType = formatArray.shift();
  const formatSize = formatArray.join('');

  let width = VERTICAL_PAPER_FORMATS[formatType + '0']?.width ?? getOneCardWidthBySettings();
  let height = VERTICAL_PAPER_FORMATS[formatType + '0']?.height ?? getOneCardHeightBySettings();

  for (let size = 1; size <= formatSize; size++) {
    let heightHalf = Math.floor(height / 2);
    height = width;
    width = heightHalf;
  }

  return {
    'width': width,
    'height': height
  };
}

const buildCanvas = async function() {
  const size = getPrintableAreaSize();
  const width = mm2px(size.width);
  const height = mm2px(size.height);

  scaleCanvas(width, height);
  drawPreparedCanvasArea(width, height);
  calculateCardsCoordinatesAndActivity(width, height);
  for (const cardId in cardsData) {
    drawCard(cardId);
  }
  await buildCardsForms();
}

const scaleCanvas = function(width, height) {
  const canvas = getCanvas();
  const context = getContext();

  canvas.width = width;
  canvas.height = height;

  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';

  var scaleFactor = getQualitySelect().value;
  canvas.width = Math.ceil(canvas.width * scaleFactor);
  canvas.height = Math.ceil(canvas.height * scaleFactor);

  context.scale(scaleFactor, scaleFactor);
}

const drawPreparedCanvasArea = function(width, height) {
  clearRectangle(0, 0, width, height);
  drawFilledRectangle(0, 0, width, height, 'white');
  drawEmptyRectangle(0, 0, width, height, 'black');
  drawLinearScales(width, height);
}

const clearRectangle = function(x, y, width, height) {
  const context = getContext();

  context.clearRect(x, y, width, height);
}

const drawEmptyRectangle = function(x, y, width, height, borderColor) {
  const context = getContext();

  context.lineWidth = 1;
  context.strokeStyle = borderColor;
  context.strokeRect(x, y, width, height);
}

const drawFilledRectangle = function(x, y, width, height, backgroundColor) {
  const context = getContext();

  context.fillStyle = backgroundColor;
  context.fillRect(x, y, width, height);
}

const getTriangleHeight = function(size) {
  return Math.sqrt(3 / 4 * size * size);
}

const drawBorderedAndFilledTriangle = function(x, y, size, borderColor, backgroundColor) {
  const context = getContext();

  const h = getTriangleHeight(size);

  context.beginPath();
  context.moveTo(x, y + h);
  context.lineTo(x + size, y + h);
  context.lineTo(x + size / 2, y);
  context.closePath();

  context.lineWidth = 1;
  context.strokeStyle = borderColor;
  context.stroke();

  context.fillStyle = backgroundColor;
  context.fill();
}

const drawBorderedAndFilledTetragon = function(x1, y1, x2, y2, x3, y3, x4, y4, borderColor, backgroundColor) {
  const context = getContext();

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x4, y4);
  context.closePath();

  context.lineWidth = 1;
  context.strokeStyle = borderColor;
  context.stroke();

  context.fillStyle = backgroundColor;
  context.fill();
}

const drawBorderedAndFilledCircle = function(x, y, r, borderColor, backgroundColor, startingAngle = 0, endingAngle = 2 * Math.PI) {
  const context = getContext();

  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle = borderColor;
  context.arc(x, y, r, startingAngle, endingAngle);
  context.stroke();

  context.fillStyle = backgroundColor;
  context.fill();
}

const drawLinearScales = function(width, height) {
  const context = getContext();
  const milimeterPixels = mm2px(1);
  const shortLineLength = mm2px(LINEAR_SCALE_SHORT_LINE_LENGTH);
  const cardDistance = mm2px(getCardDistance());
  const topLeftEdgeDistance = Math.max(cardDistance, mm2px(CARD_MINIMAL_TOP_LEFT_MARGIN));

  context.lineWidth = 1;
  context.strokeStyle = "black";

  let lineNumber = 0;
  for (let x = topLeftEdgeDistance; x < width; x += milimeterPixels) {
    const lineLength = getLinearScaleLineLength(lineNumber, shortLineLength);
    lineNumber++;

    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, lineLength);
    context.stroke();
  }

  lineNumber = 0;
  for (let y = topLeftEdgeDistance; y < height; y += milimeterPixels) {
    const lineLength = getLinearScaleLineLength(lineNumber, shortLineLength);
    lineNumber++;

    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(lineLength, y);
    context.stroke();
  }
}

const getLinearScaleLineLength = function (lineNumber, shortLineLength) {
  let multi = 1;

  if (lineNumber % 10 === 0) {
    multi = 4;
  } else if (lineNumber % 5 === 0) {
    multi = 2;
  }

  return multi * shortLineLength;
}

const printCanvas = function() {
  //working in milimeters not pixels
  const paperFormat = getPaperFormatSelect().value;
  const paperOrientation = getPaperOrientationSelect().value;
  const marginSize = Number(getMarginSizeSelect().value);
  const quality = Number(getQualitySelect().value);

  const canvas = getCanvas();
  const width = px2mm(canvas.width / quality);
  const height = px2mm(canvas.height / quality);

  const pdfOrientation = paperOrientation == 'v' ? 'portrait' : 'landscape';
  const pdfUnit = 'mm';
  const pdfFormat = getPaperFormatToPrint(paperFormat, width, height);

  const imgData = canvas.toDataURL("image/jpeg", 1);
  const pdf = new jspdf.jsPDF(pdfOrientation, pdfUnit, pdfFormat);

  pdf.addImage(imgData, 'JPEG', marginSize, marginSize, width, height);
  pdf.save("cards.pdf");
}

const getPaperFormatToPrint = function(paperFormat, width, height) {
  if (paperFormat == SINGLE_CARD_PAPER_FORMAT) {
    return [width, height];
  }

  return paperFormat.toLowerCase();
}

const calculateCardsCoordinatesAndActivity = function(areaWidth, areaHeight) {
  const cardWidth = mm2px(CARD_WIDTH);
  const cardHeight = mm2px(CARD_HEIGHT);
  const cardDistance = mm2px(getCardDistance());
  const topLeftEdgeDistance = Math.max(cardDistance, mm2px(CARD_MINIMAL_TOP_LEFT_MARGIN));

  const widthStep = cardWidth + cardDistance;
  const heightStep = cardHeight + cardDistance;

  let cardId = 0;
  if (getPaperFormatSelect().value == SINGLE_CARD_PAPER_FORMAT) {
    const bleedSize = mm2px(getBleedSelect().value);
    cardId++;
    setCardIdCoordinatesAndActivity(cardId, bleedSize, bleedSize);
  } else {
    for (let y = topLeftEdgeDistance; y + heightStep <= areaHeight; y += heightStep) {
      for (let x = topLeftEdgeDistance; x + widthStep <= areaWidth; x += widthStep) {
        cardId++;
        setCardIdCoordinatesAndActivity(cardId, x, y);
      }
    }
  }

  const cardsDataLength = cardsData.length;
  for (cardId = cardId + 1; cardId < cardsDataLength; cardId++) {
    setCardIdInactivity(cardId);
  }
}

const getInitialCardData = function() {
  let result = {};

  result[CARD_DATA_FIELD_IS_ACTIVE] = false;
  result[CARD_DATA_FIELD_X] = 0;
  result[CARD_DATA_FIELD_Y] = 0;
  result[CARD_DATA_FIELD_PATH] = '';
  result[CARD_DATA_FIELD_REFRESHED_PARAMS_PATH] = '';
  result[CARD_DATA_FIELD_FILE_DATA] = {};
  result[CARD_DATA_FIELD_PARAMS] = {};

  return result;
}

const setCardIdCoordinatesAndActivity = function(cardId, x, y) {
  if (cardsData[cardId] === undefined) {
    cardsData[cardId] = getInitialCardData();
  }

  cardsData[cardId][CARD_DATA_FIELD_IS_ACTIVE] = true;
  cardsData[cardId][CARD_DATA_FIELD_X] = x;
  cardsData[cardId][CARD_DATA_FIELD_Y] = y;
}

const setCardIdInactivity = function(cardId) {
  if (cardsData[cardId] === undefined) {
    cardsData[cardId] = getInitialCardData();
  }

  cardsData[cardId][CARD_DATA_FIELD_IS_ACTIVE] = false;
}

const drawCardIdIdentifierText = function(cardId, x, y) {
  if (getCardDistanceSelect().value < CARD_ID_IDENTIFIER_MIN_CARD_DISTANCE_TO_SHOW || getBleedSelect().value > CARD_ID_IDENTIFIER_MAX_BLEED_TO_SHOW) {
    return;
  }

  context = getContext();

  context.font = mm2px(CARD_ID_IDENTIFIER_TEXT_FONT_SIZE) + 'px ' + CARD_ID_IDENTIFIER_TEXT_FONT_FAMILY;
  context.fillStyle = 'black';
  context.fillText(cardId + ':', x, y + mm2px(CARD_ID_IDENTIFIER_TEXT_Y_CHANGE));
}

const buildCardsForms = async function() {
  let cardsFormsDiv = getCardsFormsDiv();

  for (const cardId in cardsData) {
    const cardFormId = CARD_FORM_ID_PREFIX + cardId;
    const cardData = cardsData[cardId];
    const div = document.getElementById(cardFormId);

    if (cardData[CARD_DATA_FIELD_IS_ACTIVE]) {
      if (div === null) {
        const subDiv = document.createElement('div');
        subDiv.id = cardFormId;
        cardsFormsDiv.appendChild(subDiv);

        await rebuildCardForm(cardId);
      }
    } else if (div !== null) {
      cardsFormsDiv.removeChild(div);
    }
  }
}

const getFileContent = async function(path) {
  if (filesContents[path] !== undefined) {
    return filesContents[path];
  } else if (filesContentsErrors[path] !== undefined) {
    throw new Error(filesContentsErrors[path]);
  }

  let response = await fetch(path);
  if (!response.ok) {
    const errorMessage = 'HTTP status: ' + response.status;
    filesContentsErrors[path] = errorMessage;
    throw new Error(errorMessage);
  }

  const result = await response.text();
  filesContents[path] = result;

  return result;
}

const getJsonFromFile = async function(path) {
  const content = await getFileContent(path);

  return JSON.parse(content);
}

const getIndexData = async function(path) {
  let indexData = {};

  if (path != CARD_TYPES_EMPTY_ROOT_PATH) {
    try {
      indexData = await getJsonFromFile(path + '/index.generated.json');
    } catch (error) {
      try {
        indexData = await getJsonFromFile(path + '/index.json');
      } catch (error) {
      }
    }
  }

  return indexData;
}

const getHostname = function() {
  return window.location.hostname.toLowerCase().replace(DEV_HOSTNAME_REMOVE_STRING + '.', '.');
}

const getProtocol = function() {
  return window.location.protocol;
}

const getLanguage = function() {
  const hostname = getHostname();

  return hostname.replace(/\..*$/, '');
}

const getLanguageVariable = function(variable, capitalize) {
  let result = LANGUAGE_MISSING_VARIABLE_SIGN;

  const variableTranslations = languageVariables[variable];
  if (variableTranslations === undefined) {
    return result;
  }

  let language = getLanguage();
  let translation = variableTranslations[language];
  let foundLanguageTranslation = true;

  if (translation === undefined) {
    foundLanguageTranslation = false;
    for (language in variableTranslations) {
      result = variableTranslations[language];
      break;
    }
  } else {
    result = translation;
  }

  if (capitalize) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  if (!foundLanguageTranslation) {
    result += ' [' + language + ']';
  }

  return result;
}

const getCategoriesLanguageVariables = function(categories) {
  let result = [];
  let language = getLanguage();

  for (const category of categories) {
    let translation = patronCategories[category][language] ?? category + LANGUAGE_MISSING_VARIABLE_SIGN;
    result.push(translation);
  }

  return result;
}

const getGroupedLanguageVariables = function(data) {
  let result = [];

  let language = getLanguage();

  for (const row of data) {
    let translation = row[language];

    if (translation == undefined) {
      for (let value of Object.values(row)) {
        translation = value + LANGUAGE_MISSING_VARIABLE_SIGN;
        break;
      }
    }

    result.push(translation);
  }

  return result;
}

const getTranslatedNameData = function(data, key) {
  const names = data[key];
  let language = getLanguage();
  let nameOtherLanguageSuffix = '';

  if (names[language] === undefined) {
    language = Object.keys(names)[0];
    nameOtherLanguageSuffix = ' [' + language + ']';
  }

  let name = names[language];
  if (name instanceof Array) {
    name = [...name].shift();
  }

  return [name + nameOtherLanguageSuffix, name, language];
}

const addHrChildElement = function(element) {
  let hr = document.createElement('hr');
  element.appendChild(hr);
}

const addBrChildElement = function(element) {
  let br = document.createElement('br');
  element.appendChild(br);
}

const addSpanChildElement = function(element, text, className = null) {
  let span = document.createElement('span');
  span.innerHTML = text;
  if (className != null) {
    span.className = className;
  }
  element.appendChild(span);

  return span;
}

const addInputChildElement = function(element, cardId, name, value) {
  let input = document.createElement('input');
  input.name = name;
  input.id = name + '-' + cardId;
  input.value = value;
  input.className = CLASSNAME_FOR_INPUT;
  element.appendChild(input);

  return input;
}

const addDateInputChildElement = function(element, cardId, name, value, onChangeFunction) {
  let input = addInputChildElement(element, cardId, name, value);
  input.onchange = onChangeFunction;
  input.type = 'date';
}

const addHiddenInputChildElement = function(element, cardId, name, value) {
  let input = addInputChildElement(element, cardId, name, value);
  input.type = 'hidden';
}

const addTextAreaChildElement = function(element, id, cols, rows, value) {
  let textArea = document.createElement('textarea');
  textArea.id = id;
  textArea.value = value;
  textArea.cols = cols;
  textArea.rows = rows;
  element.appendChild(textArea);
}

const addButtonChildElement = function(element, name, onClickFunction, id = null) {
  let button = document.createElement('button');
  button.onclick = onClickFunction;
  button.innerHTML = name;
  button.className = CLASSNAME_FOR_BUTTON;
  if (id != null) {
    button.id = id;
  }
  element.appendChild(button);

  return button;
}

const addImageSelectGallery = function(element, cardId, imagesData) {
  for (let imageId in imagesData) {
    let link = document.createElement('a');
    let image = document.createElement('img');

    image.src = imagesData[imageId][IMAGE_DATA_FIELD_FILE_URL];
    image.className = CLASSNAME_FOR_IMAGE_CHANGE_ICON;
    link.onclick = function() {
      setValueToInputElement(CARD_DATA_PARAMS_FIELD_IMAGE_FILE_URL + "-" + cardId, imagesData[imageId][IMAGE_DATA_FIELD_FILE_URL] ?? '');
      setValueToInputElement(CARD_DATA_PARAMS_FIELD_IMAGE_PAGE_URL + "-" + cardId, imagesData[imageId][IMAGE_DATA_FIELD_PAGE_URL] ?? '');
      setValueToInputElement(CARD_DATA_PARAMS_FIELD_IMAGE_ATTRIBUTION + "-" + cardId, imagesData[imageId][IMAGE_DATA_FIELD_ATTRIBUTION] ?? '');

      setValueToInputElement(CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_X + "-" + cardId, imagesData[imageId][IMAGE_DATA_FIELD_AREA_CENTER_X] ?? EMPTY_IMAGE_X_COORDINATE);
      setValueToInputElement(CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_Y + "-" + cardId, imagesData[imageId][IMAGE_DATA_FIELD_AREA_CENTER_Y] ?? EMPTY_IMAGE_Y_COORDINATE);
      setValueToInputElement(CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_TO_EDGE_DISTANCE + "-" + cardId, imagesData[imageId][IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE] ?? EMPTY_IMAGE_CENTER_TO_EDGE_DISTANCE);

      saveInputValuesIntoCardParams(cardId);
      hideButtonAction(cardId);
      drawCard(cardId);
    };

    link.appendChild(image);
    element.appendChild(link);
  }
}

const addInputFieldsFormDivChildElement = function(element, cardId, cardType, cardDataParams, imagesData) {
  const divId = CARD_FORM_INPUTS_DIV_ID_PREFIX + cardId;

  let div = document.createElement('div');
  div.id = divId;
  div.className = CLASSNAME_FOR_INPUT_GROUP;
  div.style = CSS_INVISIBLE;

  if (Object.keys(imagesData).length > 0) {
    addHrChildElement(div);
    addImageSelectGallery(div, cardId, imagesData);
  }

  addHrChildElement(div);

  for (const field in cardDataParams) {
    let fieldSpan = addSpanChildElement(div, getLanguageVariable(field, true) + ':&nbsp;', CLASSNAME_FOR_INPUT_SPAN);

    if (CARD_DATA_PARAMS_MY_FIELDS_ORDER.indexOf(field) != -1) {
      let destinationElementId = field + '-' + cardId;
      let sourceElementId = CARD_DATA_PARAMS_SOURCE_FIELD_NAME_PREFIX + destinationElementId;
      let dateInputValue = '';
      if (field == CARD_DATA_PARAMS_FIELD_WITH_CURRENT_DATE && cardDataParams[field] == getMonthAndDayFromFullDate(getCurrentDate())) {
        dateInputValue = getCurrentDate();
      }

      addDateInputChildElement(div, cardId, CARD_DATA_PARAMS_SOURCE_FIELD_NAME_PREFIX + field, dateInputValue, function() {
        let date = event.target.value;
        document.getElementById(destinationElementId).value = getMonthAndDayFromFullDate(date);
      });

      if (field != CARD_DATA_PARAMS_FIELD_WITH_CURRENT_DATE) {
        addButtonChildElement(fieldSpan, getLanguageVariable(LANGUAGE_VARIABLE_CLEAR_FIELD_BUTTON), function() {
          document.getElementById(sourceElementId).value = '';
          document.getElementById(destinationElementId).value = '';
        });
      }

      addHiddenInputChildElement(div, cardId, field, cardDataParams[field]);
    } else {
      addInputChildElement(div, cardId, field, cardDataParams[field]);
    }
  }
  addBrChildElement(div);
  addButtonChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_REFRESH_BUTTON, true), function() {
    saveInputValuesIntoCardParams(cardId);
    drawCard(cardId);
  });

  addHrChildElement(div);

  if (CARD_TYPES_WITH_JSON_IMPORT_EXPORT.indexOf(cardType) != -1) {
    addBrChildElement(div);
    addSpanChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_CARD_FORM_DATA_CONTACT_INFO, true), CLASSNAME_FOR_CARD_FORM_DATA_CONTACT_INFO);

    addBrChildElement(div);
    addInputChildElement(div, cardId, JSON_VALUES_INPUT_ID_PREFIX, '');

    addButtonChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_EXPORT_VALUES_TO_JSON_BUTTON, true), function() {
      saveInputValuesIntoCardParams(cardId);
      drawCard(cardId);
      document.getElementById(JSON_VALUES_INPUT_ID_PREFIX + '-' + cardId).value = getJsonFormExportedData(cardDataParams, JSON_VALUES_FIELDS_PREFIX, JSON_VALUES_SECTIONS_PREFIXES);
    });
    addSpanChildElement(div, '&nbsp;|&nbsp;');
    addButtonChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_IMPORT_VALUES_FROM_JSON_BUTTON, true), function() {
      const jsonValueToImport = document.getElementById(JSON_VALUES_INPUT_ID_PREFIX + '-' + cardId).value;
      setJsonFormImportedData(cardId, JSON_VALUES_FIELDS_PREFIX, jsonValueToImport);
      saveInputValuesIntoCardParams(cardId);
      drawCard(cardId);
    });
    addSpanChildElement(div, '&nbsp;|&nbsp;');
    addButtonChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_COPY_TO_CLIPBOARD_BUTTON, true), function() {
      const jsonValueInputElement = document.getElementById(JSON_VALUES_INPUT_ID_PREFIX + '-' + cardId);
      jsonValueInputElement.select();
      jsonValueInputElement.setSelectionRange(0, 99999);
      document.execCommand('copy');
    });

    addHrChildElement(div);
  }

  element.appendChild(div);
}

const addCardFormSelectElement = function(element, id, options, selectedOption, onChangeFunction) {
  let select = document.createElement('select');
  select.id = id;
  select.onchange = onChangeFunction;
  select.className = CLASSNAME_FOR_SELECT;

  options.forEach(function(value, key) {
    let option = document.createElement('option');
    option.value = key;
    option.innerHTML = value;
    if (key === selectedOption) {
      option.selected = 'selected';
    }

    select.appendChild(option);
  });

  element.appendChild(select);
}

const getCardTypeOptions = async function() {
  let result = new Map();

  const rootPaths = CARD_TYPES_ROOT_PATHS;
  for (const cardType in rootPaths) {
    const rootPath = rootPaths[cardType];
    const indexData = await getIndexData(rootPath);

    if (indexData[cardType] !== undefined) {
      result.set(cardType, getTranslatedNameData(indexData, cardType)[0]);
    } else if (rootPath === CARD_TYPES_EMPTY_ROOT_PATH) {
      result.set(cardType, getLanguageVariable(JSON_VALUES_FIELDS_PREFIX + cardType, true));
    }
  }

  return result;
}

const getCardTypeRootPath = function(cardType) {
  return CARD_TYPES_ROOT_PATHS[cardType];
}

const getJsonFileData = async function(filePath) {
  let result = {};

  try {
    result = await getJsonFromFile(filePath);
  } catch (error) {
  }

  return result;
}

const prepareSelectOptions = function(options) {
  let unselectedValue;
  for (const key of options.keys()) {
    const intKey = parseInt(key);
    if (key === CARD_FORM_UNSELECTED_VALUE) {
      unselectedValue = options.get(key);
    } else if (intKey === 'NaN' || key.toString().length !== intKey.toString().length) {
      return options;
    }
  }

  if (unselectedValue !== undefined) {
    options.delete(CARD_FORM_UNSELECTED_VALUE);
  }

  const orderedOptions = new Map([...options.entries()].sort((a, b) => a[1] > b[1]));
  const result = new Map();

  if (unselectedValue !== undefined) {
    result.set(CARD_FORM_UNSELECTED_VALUE, unselectedValue);
  }
  orderedOptions.forEach(function(value, key) {
    result.set(key.toString(), value);
  });

  return result;
}

const buildCardFormSelects = async function(cardId, path, contextPath, options) {
  const cardFormId = CARD_FORM_ID_PREFIX + cardId;
  const parentElement = document.getElementById(cardFormId);
  const stepNumber = contextPath.length + 1;
  const selectedOption = path[stepNumber - 1];
  const cardFormSelectId = cardFormId + '-' + stepNumber;

  if (options !== {}) {
    const onChangeFunction = function() {
      saveCardDataPath(cardId, stepNumber);
    }
    const preparedOptions = prepareSelectOptions(options);
    addCardFormSelectElement(parentElement, cardFormSelectId, preparedOptions, selectedOption, onChangeFunction);
  }

  if (selectedOption === undefined || options.get(selectedOption) === undefined) {
    return;
  }

  contextPath.push(selectedOption);
  const rootPath = getCardTypeRootPath(path[0]);
  const fullContextPathString = rootPath + '/' + contextPath.join('/');

  if (rootPath === CARD_TYPES_EMPTY_ROOT_PATH) {
    cardsData[cardId][CARD_DATA_FIELD_FILE_DATA] = {};
    drawCard(cardId);

    return;
  } else if (selectedOption !== CARD_FORM_UNSELECTED_VALUE) {
    const fileData = await getJsonFileData(fullContextPathString + '.json');
    if (Object.keys(fileData).length > 0) {
      cardsData[cardId][CARD_DATA_FIELD_FILE_DATA] = fileData;
      drawCard(cardId);

      return;
    }
  }

  const indexData = await getIndexData(fullContextPathString);
  if (Object.keys(indexData).length === 0) {
    return;
  }

  const nextOptions = new Map();
  nextOptions.set(CARD_FORM_UNSELECTED_VALUE, CARD_FORM_UNSELECTED_NAME);
  for (const option in indexData) {
    nextOptions.set(option, getTranslatedNameData(indexData, option)[0]);
  }

  await buildCardFormSelects(cardId, path, contextPath, nextOptions);
}

const rebuildCardForm = async function(cardId) {
  const cardFormId = CARD_FORM_ID_PREFIX + cardId;
  const cardData = cardsData[cardId];
  const cardType = getCardTypeFromDataPath(cardData[CARD_DATA_FIELD_PATH]);

  //remove existing elements
  const div = document.getElementById(cardFormId);
  while (div.lastChild) {
    div.removeChild(div.lastChild);
  }

  //label
  addSpanChildElement(div, cardId + ': ');

  //card path selects
  let path = cardData[CARD_DATA_FIELD_PATH];
  let pathArr = path.split('/').filter(o => o);
  const options = await getCardTypeOptions();
  if (pathArr.length === 0) {
    pathArr.push(CARD_TYPE_SELECTED);
  }
  await buildCardFormSelects(cardId, pathArr, [], options);

  //card input fields
  console.log(cardData);
  let isEditButtonVisible = Object.keys(cardData[CARD_DATA_FIELD_PARAMS]).length > 0;

  addSpanChildElement(div, '&nbsp;&nbsp;&nbsp;');
  let editButton = addButtonChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_EDIT_BUTTON, true), function() {
    editButtonAction(cardId);
  }, CARD_FORM_INPUTS_DIV_EDIT_BUTTON_ID_PREFIX + cardId);
  editButton.style = isEditButtonVisible ? '' : CSS_INVISIBLE;

  let hideButton = addButtonChildElement(div, getLanguageVariable(LANGUAGE_VARIABLE_HIDE_BUTTON, true), function() {
    hideButtonAction(cardId);
  }, CARD_FORM_INPUTS_DIV_HIDE_BUTTON_ID_PREFIX + cardId);
  hideButton.style = CSS_INVISIBLE;

  const imagesData = cardData[CARD_DATA_FIELD_FILE_DATA][FILE_DATA_IMAGES_KEY] ?? {};
  addInputFieldsFormDivChildElement(div, cardId, cardType, cardData[CARD_DATA_FIELD_PARAMS], imagesData);
}

const editButtonAction = function(cardId) {
  document.getElementById(CARD_FORM_INPUTS_DIV_ID_PREFIX + cardId).style = '';
  document.getElementById(CARD_FORM_INPUTS_DIV_EDIT_BUTTON_ID_PREFIX + cardId).style = CSS_INVISIBLE;
  document.getElementById(CARD_FORM_INPUTS_DIV_HIDE_BUTTON_ID_PREFIX + cardId).style = '';
}

const hideButtonAction = function(cardId) {
  document.getElementById(CARD_FORM_INPUTS_DIV_ID_PREFIX + cardId).style = CSS_INVISIBLE;
  document.getElementById(CARD_FORM_INPUTS_DIV_EDIT_BUTTON_ID_PREFIX + cardId).style = '';
  document.getElementById(CARD_FORM_INPUTS_DIV_HIDE_BUTTON_ID_PREFIX + cardId).style = CSS_INVISIBLE;
}

const getJsonFormExportedData = function(cardData, prefixToRemove, sections) {
  let result = {};

  for (let srcField in cardData) {
    const value = cardData[srcField];
    let dstField = srcField.replace(new RegExp('^' + prefixToRemove), '');

    let foundSection = false;
    for (let section of sections) {
      if (dstField.search(new RegExp('^' + section + '-')) > -1) {
        dstField = dstField.replace(new RegExp('^' + section + '-'), '');

        if (result[section] == undefined) {
          result[section] = {};
        }
        result[section][dstField] = value;
        foundSection = true;

        break;
      }
    }

    if (!foundSection) {
      result[dstField] = value;
    }
  }

  return JSON.stringify(result);
}

const setJsonFormImportedData = function(cardId, prefixToAdd, jsonToImport) {
  try {
    const data = JSON.parse(jsonToImport);
    if (typeof data === 'object' && data !== null) {
      for (let field in data) {
        let dstField = prefixToAdd + field;
        let value = '';

        if (typeof data[field] === 'object' && data[field] !== null) {
          for (let subfield in data[field]) {
            const dstField = prefixToAdd + field + '-' + subfield + '-' + cardId;
            setValueToInputElement(dstField, data[field][subfield]);
          }
        } else {
          const dstField = prefixToAdd + field + '-' + cardId;
          setValueToInputElement(dstField, data[field]);
        }
      }
    }
  } catch (e) {
    //do nothing
  }
}

const setValueToInputElement = function(id, value) {
  let element = document.getElementById(id);
  if (element != null) {
    if (typeof value == 'string' || typeof value == 'number') {
      element.value = value;
    }
  }
}

const saveInputValuesIntoCardParams = function(cardId) {
  const div = document.getElementById(CARD_FORM_INPUTS_DIV_ID_PREFIX + cardId);
  for (const child of div.childNodes) {
    if (child.tagName === 'INPUT' && child.name !== JSON_VALUES_INPUT_ID_PREFIX) {
      const oldValue = cardsData[cardId][CARD_DATA_FIELD_PARAMS][child.name];
      let valueToSet = child.value;
      if (Number.isInteger(oldValue)) {
        valueToSet = Number(valueToSet);
      }
      cardsData[cardId][CARD_DATA_FIELD_PARAMS][child.name] = valueToSet;
    }
  }

  const params = cardsData[cardId][CARD_DATA_FIELD_PARAMS];
  if (params[CARD_DATA_PARAMS_FIELD_QR_CODE_URL].match(new RegExp(CARD_TYPE_I_QR_CODE_URL_PREFIX))) {
    const newQrCodeUrl = getICardQrCodeUrl(params);

    cardsData[cardId][CARD_DATA_FIELD_PARAMS][CARD_DATA_PARAMS_FIELD_QR_CODE_URL] = newQrCodeUrl;
    document.getElementById(CARD_DATA_PARAMS_FIELD_QR_CODE_URL + "-" + cardId).value = newQrCodeUrl;
  }
}

const saveCardDataPath = async function(cardId, selectId) {
  const cardFormId = CARD_FORM_ID_PREFIX + cardId;

  let pathArr = [];
  let formId = 0;
  while (true) {
    formId++;

    if (selectId < formId) {
      break;
    }

    const cardFormSelectId = cardFormId + '-' + formId;
    const element = document.getElementById(cardFormSelectId);
    if (element === null) {
      break;
    }

    const selectedValue = element.value;
    if (selectedValue === CARD_FORM_UNSELECTED_VALUE) {
      break;
    }

    pathArr.push(selectedValue);
  }
  cardsData[cardId][CARD_DATA_FIELD_PATH] = pathArr.join('/');

  await rebuildCardForm(cardId);
}

const drawImage = function(imageData, x, y, width, height, onLoadFunction, bleedSize = 0) {
  const imageUrl = imageData[IMAGE_DATA_FIELD_FILE_URL];

  //new coordinates ...
  const imageAreaCenterX = imageData[IMAGE_DATA_FIELD_AREA_CENTER_X];
  const imageAreaCenterY = imageData[IMAGE_DATA_FIELD_AREA_CENTER_Y];
  const imageAreaCenterToEdgeDistanceWidth = imageData[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE];
  const imageAreaCenterToEdgeDistanceHeight = imageData[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE] * height / width;

  //bleed
  const xWithBleed = x - bleedSize;
  const yWithBleed = y - bleedSize;
  const widthWithBleed = width + 2 * bleedSize;
  const heightWithBleed = height + 2 * bleedSize;

  const widthBleedCoeff = widthWithBleed / width;
  const heightBleedCoeff = heightWithBleed / height;
  const bleedCoeff = Math.min(widthBleedCoeff, heightBleedCoeff);

  //... are converted to old
  const imageAreaTopLeftX = imageAreaCenterX - imageAreaCenterToEdgeDistanceWidth * bleedCoeff;
  const imageAreaTopLeftY = imageAreaCenterY - imageAreaCenterToEdgeDistanceHeight * bleedCoeff;
  const imageAreaBottomRightX = imageAreaCenterX + imageAreaCenterToEdgeDistanceWidth * bleedCoeff;
  const imageAreaBottomRightY = imageAreaCenterY + imageAreaCenterToEdgeDistanceHeight * bleedCoeff;

  const imageAreaWidth = imageAreaBottomRightX - imageAreaTopLeftX;
  const imageAreaHeight = imageAreaBottomRightY - imageAreaTopLeftY;

  const widthCoeff = width / imageAreaWidth;
  const heightCoeff = height / imageAreaHeight;
  let coeff = widthCoeff;
  if (Math.abs(1 - widthCoeff) > Math.abs(1 - heightCoeff)) {
    coeff = heightCoeff;
  }

  //fix problem with scale in greater PPI's
  if (widthCoeff + heightCoeff >= 2) {
    if (coeff === heightCoeff) {
      coeff = widthCoeff;
    } else {
      coeff = heightCoeff;
    }
  }

  const imageWidth = imageAreaWidth * coeff / heightCoeff;
  const imageHeight = imageAreaHeight * coeff / widthCoeff;
  const imageMoveX = imageWidth / 2 - imageAreaWidth / 2;
  const imageMoveY = imageHeight / 2 - imageAreaHeight / 2;

  if (imageUrl.length > 0) {
    drawFilledRectangle(x, y, width, height, CARD_IMAGE_BACKGROUND_COLOR);
  }

  let image = new Image();
  image.onload = function() {
    const context = getContext();
    context.drawImage(
      image,
      imageAreaTopLeftX - imageMoveX, imageAreaTopLeftY - imageMoveY, imageWidth, imageHeight,
      xWithBleed, yWithBleed, widthWithBleed, heightWithBleed
    );
    onLoadFunction();
  }

  image.setAttribute('crossorigin', 'anonymous');
  image.src = imageUrl;
}

const drawQrCode = function(url, x, y, size, darkColor, lightColor) {
  const context = getContext();
  const divElement = document.createElement('div');
  const qualityFactor = QR_CODE_QUALITY_FACTOR;

  const options = {
    width: size * qualityFactor,
    height: size * qualityFactor,
    colorDark : darkColor,
    colorLight : lightColor,
    correctLevel : QRCode.CorrectLevel.H
  };
  let qrCode = new QRCode(divElement, options);
  qrCode.makeCode(url);

  let image = divElement.querySelector('img');
  image.onload = function() {
    context.drawImage(image, x, y, image.width / qualityFactor, image.height / qualityFactor);
  }
}

const drawText = function(text, x, y, width, height, fontColor, fontStyle = FONT_STYLE_NORMAL, align = TEXT_ALIGN_CENTER, rotate = 0) {
  const context = getContext();

  const fontSize = DRAW_TEXT_MATCH_FONT_SIZE_COEFF * height;
  context.font = fontStyle + ' ' + fontSize + 'px ' + DEFAULT_FONT_FAMILY;
  context.textAlign = TEXT_ALIGN_LEFT;
  context.textBaseline = TEXT_BASELINE;
  context.fillStyle = fontColor;

  const textWidth = context.measureText(text).width;

  context.save();
  context.translate(x, y);
  if (textWidth > width || align === TEXT_ALIGN_JUSTIFY) {
    context.rotate(-rotate * Math.PI / 180);
    context.scale(width / textWidth, 1);
    context.fillText(text, 0, 0);
  } else {
    let moveX = 0;
    if (align === TEXT_ALIGN_RIGHT) {
      moveX = width - textWidth;
    } else if (align === TEXT_ALIGN_CENTER) {
      moveX = (width - textWidth) / 2;
    }
    context.rotate(-rotate * Math.PI / 180);
    context.fillText(text, moveX, 0);
  }
  context.restore();
}

const getDataFileParams = function(cardType, data, dataPath) {
  let result = {};

  if (cardType === CARD_TYPE_PATRONS || cardType === CARD_TYPE_GOD) {
    const nameData = getTranslatedNameData(data, FILE_DATA_NAMES_KEY);
    const imageData = (data[FILE_DATA_IMAGES_KEY] ?? {})[IMAGES_DATA_DEFAULT_KEY] ?? {};
    const qrCodeUrl = getProtocol() + '//' + getHostname() + '/' + dataPath;

    result[CARD_DATA_PARAMS_FIELD_NAME] = nameData[1];
    result[CARD_DATA_PARAMS_FIELD_LANGUAGE] = nameData[2];
    result[CARD_DATA_PARAMS_FIELD_IMAGE_FILE_URL] = imageData[IMAGE_DATA_FIELD_FILE_URL] ?? '';
    result[CARD_DATA_PARAMS_FIELD_IMAGE_PAGE_URL] = imageData[IMAGE_DATA_FIELD_PAGE_URL] ?? '';
    result[CARD_DATA_PARAMS_FIELD_IMAGE_ATTRIBUTION] = imageData[IMAGE_DATA_FIELD_ATTRIBUTION] ?? '';
    result[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_X] = imageData[IMAGE_DATA_FIELD_AREA_CENTER_X] ?? EMPTY_IMAGE_X_COORDINATE;
    result[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_Y] = imageData[IMAGE_DATA_FIELD_AREA_CENTER_Y] ?? EMPTY_IMAGE_Y_COORDINATE;
    result[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_TO_EDGE_DISTANCE] = imageData[IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE] ?? EMPTY_IMAGE_CENTER_TO_EDGE_DISTANCE;
    result[CARD_DATA_PARAMS_FIELD_DEATH] = DEATH_SYMBOL_CHARACTER + ' ' + getDeathDate(data[FILE_DATA_DEATH_KEY]);
    result[CARD_DATA_PARAMS_FIELD_CATEGORIES] = data[FILE_DATA_CATEGORIES_KEY] ? getCategoriesLanguageVariables(data[FILE_DATA_CATEGORIES_KEY]).join(', ') : '';
    result[CARD_DATA_PARAMS_FIELD_ORDER] = data[FILE_DATA_ORDER_KEY] ? data[FILE_DATA_ORDER_KEY].join(', ') : '';
    result[CARD_DATA_PARAMS_FIELD_QR_CODE_URL] = qrCodeUrl;
    result[CARD_DATA_PARAMS_FIELD_FORENAMES] = data[FILE_DATA_FORENAMES_KEY] ? getGroupedLanguageVariables(data[FILE_DATA_FORENAMES_KEY]).join(', ') : '';
    result[CARD_DATA_PARAMS_FIELD_SURNAMES] = data[FILE_DATA_SURNAMES_KEY] ? getGroupedLanguageVariables(data[FILE_DATA_SURNAMES_KEY]).join(', ').replace(new RegExp(LANGUAGE_MISSING_VARIABLE_SIGN), '') : '';
    result[CARD_DATA_PARAMS_FIELD_EPITHETS] = data[FILE_DATA_EPITHETS_KEY] ? getGroupedLanguageVariables(data[FILE_DATA_EPITHETS_KEY]).join(', ') : '';
  //} else if (cardType === CARD_TYPE_I) {
    //const currentDate = getCurrentDate();

    //result[CARD_DATA_PARAMS_FIELD_NAME] = '?';
    //result[CARD_DATA_PARAMS_FIELD_IMAGE_FILE_URL] = '';
    //result[CARD_DATA_PARAMS_FIELD_IMAGE_PAGE_URL] = '';
    //result[CARD_DATA_PARAMS_FIELD_IMAGE_ATTRIBUTION] = '';
    //result[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_X] = EMPTY_IMAGE_X_COORDINATE;
    //result[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_Y] = EMPTY_IMAGE_Y_COORDINATE;
    //result[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_TO_EDGE_DISTANCE] = EMPTY_IMAGE_CENTER_TO_EDGE_DISTANCE;

    //for (let fieldId of CARD_DATA_PARAMS_MY_FIELDS_ORDER) {
      //result[fieldId] = (fieldId == CARD_DATA_PARAMS_FIELD_WITH_CURRENT_DATE) ? getMonthAndDayFromFullDate(currentDate) : "";
    //}
    //result[CARD_DATA_PARAMS_FIELD_QR_CODE_URL] = getICardQrCodeUrl(result);
  }

  return result;
}

const getICardQrCodeUrl = function(data) {
  let resultArr = [];
  const urlPrefix = getProtocol() + '//' + getHostname() + CARD_TYPE_I_QR_CODE_URL_PREFIX;

  for (let fieldId of CARD_DATA_PARAMS_MY_FIELDS_ORDER) {
    resultArr.push(data[fieldId]);
  }

  return urlPrefix + '/' + resultArr.join(',');
}

const getDeathDate = function(dates) {
  if ((dates ?? []).length === 0) {
    return UNKNOWN;
  } else if (dates.length === 1) {
    return dates[0];
  }

  let showMonthAndDay = true;
  let prevMonthAndDay = null;
  let date;
  for (date of dates) {
    const monthAndDay = date.replace(/^.+(-[0-1][0-9]-[0-3][0-9])$/, '$1');
    if (showMonthAndDay) {
      if (monthAndDay !== date) {
        if (prevMonthAndDay === null) {
          prevMonthAndDay = monthAndDay;
        } else if (prevMonthAndDay !== monthAndDay) {
          showMonthAndDay = false;
        }
      } else {
        showMonthAndDay = false;
      }
    }
  }
  if (!showMonthAndDay) {
    date = date.replace(/^([~<>-]*[0-9]+)-.+$/, '$1');
  }

  if (!isNaN(date[0]) && !isNaN(parseInt(date[0]))) {
    return '~' + date;
  }

  return date;
}

const drawGodTriangle = function(x, y, size) {
  const context = getContext();

  //drawBorderedAndFilledTriangle(x, y, size, 'black', 'white');

  let image = new Image();
  image.onload = function() {
    context.drawImage(image, x, y, size, size);
  }

  image.setAttribute('crossorigin', 'anonymous');
  image.src = TRINITY_SYMBOL_URL;
}

const drawStatusTriangle = function(x, y, size) {
  const height = getTriangleHeight(size);

  const smallTriangleCoeff = 1/3.25;
  const circleSizeCoeff = 1/21;
  const circleSize = size * circleSizeCoeff;

  const smallTriangleSize = size * smallTriangleCoeff;
  const smallTriangleHeight = height * smallTriangleCoeff;

  const mediumTriangleHeight = height - 1.5 * smallTriangleHeight;
  const mediumTriangleSize = size - 1.5 * smallTriangleSize;

  const mediumTriangleTopX = x + size / 2;
  const mediumTriangleTopY = y + smallTriangleHeight;
  const mediumTriangleLeftX = mediumTriangleTopX - mediumTriangleSize / 2;
  const mediumTriangleLeftY = y + height - smallTriangleHeight / 2;
  const mediumTriangleRightX = mediumTriangleTopX + mediumTriangleSize / 2;
  const mediumTriangleRightY = mediumTriangleLeftY;

  const smallSideTrianglesCircleMoveX = smallTriangleSize / 2.7;
  const whiteTriangleY = mediumTriangleLeftY - 1.5 * smallTriangleHeight;

  drawBorderedAndFilledTriangle(x, y, size, 'white', STATUS_COLOR_BORDER);

  drawBorderedAndFilledTriangle(x + size / 2 - smallTriangleSize / 2, y, smallTriangleSize, STATUS_COLOR_BORDER, STATUS_COLOR_YELLOW);
  drawBorderedAndFilledTriangle(x, y + height - smallTriangleHeight , smallTriangleSize, STATUS_COLOR_BORDER, STATUS_COLOR_BLUE);
  drawBorderedAndFilledTriangle(x + size - smallTriangleSize, y + height - smallTriangleHeight , smallTriangleSize, STATUS_COLOR_BORDER, STATUS_COLOR_RED);

  //green tetragon
  drawBorderedAndFilledTetragon(
    mediumTriangleTopX, mediumTriangleTopY,
    mediumTriangleLeftX, mediumTriangleLeftY,
    x + smallTriangleSize / 2, y + height - smallTriangleHeight,
    mediumTriangleTopX - smallTriangleSize / 2, mediumTriangleTopY,
    STATUS_COLOR_BORDER, STATUS_COLOR_GREEN
  );
  //orange tetragon
  drawBorderedAndFilledTetragon(
    mediumTriangleTopX, mediumTriangleTopY,
    mediumTriangleRightX, mediumTriangleRightY,
    x + size - smallTriangleSize / 2, y + height - smallTriangleHeight,
    mediumTriangleTopX + smallTriangleSize / 2, mediumTriangleTopY,
    STATUS_COLOR_BORDER, STATUS_COLOR_ORANGE
  );
  //violet tetragon
  drawBorderedAndFilledTetragon(
    mediumTriangleLeftX, mediumTriangleLeftY,
    mediumTriangleRightX, mediumTriangleRightY,
    x + size - smallTriangleSize, y + height,
    x + smallTriangleSize, y + height,
    STATUS_COLOR_BORDER, STATUS_COLOR_VIOLET
  );

  //indigo triangle
  drawBorderedAndFilledTriangle(mediumTriangleTopX - mediumTriangleSize / 2, mediumTriangleTopY, mediumTriangleSize, STATUS_COLOR_BORDER, STATUS_COLOR_INDIGO);
  //white triangle
  drawBorderedAndFilledTriangle(x + size / 2 - smallTriangleSize / 2, whiteTriangleY, smallTriangleSize, STATUS_COLOR_BORDER, STATUS_COLOR_WHITE);

  //yellow circle
  drawBorderedAndFilledCircle(x + size / 2, y + smallTriangleHeight / 2 , circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);
  //blue circle
  drawBorderedAndFilledCircle(x + smallSideTrianglesCircleMoveX, y + height - smallTriangleHeight * 1 / 4 , circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);
  //red circle
  drawBorderedAndFilledCircle(x + size - smallSideTrianglesCircleMoveX, y + height - smallTriangleHeight * 1 / 4 , circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);

  //violet circle
  drawBorderedAndFilledCircle(x + size / 2, y + height - smallTriangleHeight / 4 , circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);
  //green circle
  drawBorderedAndFilledCircle(x + smallTriangleSize, whiteTriangleY + smallTriangleHeight / 2, circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);
  //orange circle
  drawBorderedAndFilledCircle(x + size - smallTriangleSize, whiteTriangleY + smallTriangleHeight / 2, circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);

  //indigo circle
  drawBorderedAndFilledCircle(x + size / 2, y + height - smallTriangleHeight * 3 / 4, circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);
  //white circle
  drawBorderedAndFilledCircle(x + size / 2, whiteTriangleY + smallTriangleHeight / 2, circleSize, STATUS_COLOR_BORDER, STATUS_COLOR_CIRCLE);
}

const drawStatusPath = function(x, y, width, height, inputableFieldBackgroundColor) {
  const circleBorderColor = 'black';
  const circleSizeCoeff = 2/15;
  const circleSize = width * circleSizeCoeff;

  const textWidth = circleSize * 1.5;
  const textHeight = circleSize * 1.2;
  const textMoveX = -textWidth / 2;
  const textMoveY = -textHeight / 3;

  const xCenter = x + width / 2;
  const yForLevel0 = y + height * 9/10;
  const yForLevel1 = y + height * 7/10;
  const yForLevel2 = y + height * 5/10;
  const yForLevel3 = y + height * 3/10;
  const yForLevel4 = y + height * 1/10;

  drawFilledRectangle(x, y, width, height, inputableFieldBackgroundColor);
  drawEmptyRectangle(x, y, width, height, 'black');

  //level 0
  let textColor = 'white';
  let circleY = yForLevel0;
  let circleX = xCenter
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_BLACK);
  drawText('I', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  //level 1
  textColor = 'black';
  circleY = yForLevel1;

  circleX = xCenter - width / 3;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_YELLOW);
  drawText('T', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  circleX = xCenter;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_BLUE);
  drawText('A', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  circleX = xCenter + width / 3;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_RED);
  drawText('U', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  //level 2
  textColor = 'white';
  circleY = yForLevel2;

  circleX = xCenter - width / 2;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_ORANGE, 1.5 * Math.PI, 0.5 * Math.PI);
  drawText('   +U', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  circleX = xCenter - width / 6;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_GREEN);
  drawText('T+A', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  circleX = xCenter + width / 6;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_VIOLET);
  drawText('A+U', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  circleX = xCenter + width / 2;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_ORANGE, 0.5 * Math.PI, 1.5 * Math.PI);
  drawText('T+   ', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  //level 3
  textColor = 'white';
  circleY = yForLevel3;

  circleX = xCenter;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_INDIGO);
  drawText('T+A+U', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);

  //level 4
  textColor = 'black';
  circleY = yForLevel4;

  circleX = xCenter;
  drawBorderedAndFilledCircle(circleX, circleY , circleSize, circleBorderColor, STATUS_COLOR_WHITE);
  drawText('P', circleX + textMoveX, circleY + textMoveY, textWidth, textHeight, textColor);
}

const drawPatronProgress = function(x, y, width, height, columns, rows) {
  const columnSize = width / columns;
  const rowSize = height / rows;
  const rowTopMargin = rowSize / 6;

  drawFilledRectangle(x, y, width, height, 'white');
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      drawEmptyRectangle(x + column * columnSize, y + row * rowSize, columnSize, rowSize, PATRON_PROGRESS_BORDER_COLOR);
      const value = (rows - row - 1) * columns + (column + 1);
      drawText(' ' + value + ' ', x + column * columnSize, y + row * rowSize + rowTopMargin, columnSize, rowSize, COLOR_LIGHTGRAY);
    }
  }
}

const drawCardBackground = function(x, y, width, height, bleedSize, cardType, onLoadFunction) {
  const imageData = CARD_TYPE_BACKGROUND_IMAGES[cardType];

  drawImage(imageData, x, y, width, height, onLoadFunction, bleedSize);
}

const getCardTypeFromDataPath = function(dataPath) {
    return dataPath.replace(/\/.*$/, '');
}

const drawCard = function(cardId) {
  const cardData = cardsData[cardId];
  if (!cardData[CARD_DATA_FIELD_IS_ACTIVE]) {
    return;
  }

  const cardWidth = mm2px(CARD_WIDTH);
  const cardHeight = mm2px(CARD_HEIGHT);

  const x = cardData[CARD_DATA_FIELD_X];
  const y = cardData[CARD_DATA_FIELD_Y];
  const data = cardData[CARD_DATA_FIELD_FILE_DATA];

  drawCardIdIdentifierText(cardId, x, y);
  clearRectangle(x, y, cardWidth, cardHeight);
  drawFilledRectangle(x, y, cardWidth, cardHeight, 'white');
  drawEmptyRectangle(x, y, cardWidth, cardHeight, 'black');

  if (cardData[CARD_DATA_FIELD_PATH].length > 0) {
    const dataPath = cardData[CARD_DATA_FIELD_PATH];
    const refreshedParamsPath = cardData[CARD_DATA_FIELD_REFRESHED_PARAMS_PATH];
    const cardType = getCardTypeFromDataPath(dataPath);

    const fontColor = DEFAULT_FONT_COLOR;
    const fontStyle = FONT_STYLE_NORMAL;
    const textAlign = TEXT_ALIGN_CENTER;

    let params = cardData[CARD_DATA_FIELD_PARAMS];
    if (refreshedParamsPath !== dataPath) {
      params = getDataFileParams(cardType, data, dataPath);
      cardData[CARD_DATA_FIELD_REFRESHED_PARAMS_PATH] = dataPath;
      cardData[CARD_DATA_FIELD_PARAMS] = params;
      cardsData[cardId] = cardData;
    }

    //background
    const bleedSize = mm2px(getBleedSelect().value);
    drawCardBackground(x, y, cardWidth, cardHeight, bleedSize, cardType, function() {

      const isEmptyCardBackgroundMode = CARD_TYPE_BACKGROUND_IMAGES[cardType][IMAGE_DATA_FIELD_FILE_URL] == EMPTY_CARD_BACKGROUND_FILE;

      if (bleedSize == 0) {
        drawEmptyRectangle(x, y, cardWidth, cardHeight, 'black');
      }

      switch (cardType) {
        //case CARD_TYPE_BASE_FOR_FEAST:
          //if (isEmptyCardBackgroundMode) {
            //drawFeastBaseCardBackground(x, y, cardWidth, cardHeight); //you can use this code to build background png
          //}
          //drawFeastBaseCard(x, y, cardWidth, cardHeight);
          //return;

        //case CARD_TYPE_BASE_FOR_PERSON:
          //if (isEmptyCardBackgroundMode) {
            //drawPersonBaseCardBackground(x, y, cardWidth, cardHeight); //you can use this code to build background png
          //}
          //drawPersonBaseCard(x, y, cardWidth, cardHeight);
          //return;

        //case CARD_TYPE_CHALLENGES:
          //if (isEmptyCardBackgroundMode) {
            //drawChallengesCardBackground(x, y, cardWidth, cardHeight); //you can use this code to build background png
          //}
          //drawChallengesCard(x, y, cardWidth, cardHeight);
          //return;

        //case CARD_TYPE_REVERSE:
          //return;
      }

      if (cardType == CARD_TYPE_REVERSE) {

        //image
        const imageSize = mm2px(30);
        const imageWidth = imageSize;
        const imageHeight = imageSize;
        const imageX = x + cardWidth / 2 - imageSize / 2;
        const imageY = y;
        const imageData = {
          [IMAGE_DATA_FIELD_FILE_URL]: params[CARD_DATA_PARAMS_FIELD_IMAGE_FILE_URL],
          [IMAGE_DATA_FIELD_AREA_CENTER_X]: params[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_X],
          [IMAGE_DATA_FIELD_AREA_CENTER_Y]: params[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_Y],
          [IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: params[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_TO_EDGE_DISTANCE],
        }
        drawImage(imageData, imageX, imageY, imageWidth, imageHeight, function() {});

        return;
      }

      //temporary test mode text
      drawText('   XXXXXXXXXXXXXXXX   ', x + mm2px(2), y + mm2px(3), mm2px(100), mm2px(10), 'red', FONT_STYLE_NORMAL, TEXT_ALIGN_JUSTIFY, 310);

      //image
      const imageSize = mm2px(30);
      const imageWidth = imageSize;
      const imageHeight = imageSize;
      const imageX = x + cardWidth / 2 - imageSize / 2;
      const imageY = y;
      const imageData = {
        [IMAGE_DATA_FIELD_FILE_URL]: params[CARD_DATA_PARAMS_FIELD_IMAGE_FILE_URL],
        [IMAGE_DATA_FIELD_AREA_CENTER_X]: params[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_X],
        [IMAGE_DATA_FIELD_AREA_CENTER_Y]: params[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_Y],
        [IMAGE_DATA_FIELD_AREA_CENTER_TO_EDGE_DISTANCE]: params[CARD_DATA_PARAMS_FIELD_IMAGE_AREA_CENTER_TO_EDGE_DISTANCE],
      }
      drawImage(imageData, imageX, imageY, imageWidth, imageHeight, function() {});

      //name
      const nameWidth = cardWidth;
      const nameHeight = mm2px(5);
      const nameX = x;
      const nameY = y + mm2px(32);
      const nameAlign = textAlign;
      const nameColor = 'black';
      if (params[CARD_DATA_PARAMS_FIELD_NAME] !== undefined) {
        drawText(params[CARD_DATA_PARAMS_FIELD_NAME], nameX, nameY, nameWidth, nameHeight, nameColor, fontStyle, nameAlign);
      }

      //death
      if (cardType === CARD_TYPE_GOD || cardType === CARD_TYPE_PATRONS) {
        const deathWidth = cardWidth;
        const deathHeight = mm2px(3);
        const deathX = x;
        const deathY = y + mm2px(37);
        const deathColor = 'black';
        const deathAlign = textAlign;
        if (params[CARD_DATA_PARAMS_FIELD_DEATH] !== undefined) {
          drawText(params[CARD_DATA_PARAMS_FIELD_DEATH], deathX, deathY, deathWidth, deathHeight, deathColor, fontStyle, deathAlign);
        }
      }

      //QR code
      const qrCodeSize = mm2px(16);
      const qrCodeX = x + cardWidth / 2 - qrCodeSize / 2;
      const qrCodeY = y + mm2px(40);
      const qrCodeDarkColor = 'black';
      const qrCodeLightColor = 'white';
      if (params[CARD_DATA_PARAMS_FIELD_QR_CODE_URL] !== undefined) {
        drawQrCode(params[CARD_DATA_PARAMS_FIELD_QR_CODE_URL], qrCodeX, qrCodeY, qrCodeSize, qrCodeDarkColor, qrCodeLightColor);
      }

      //language
      const languageWidth = cardWidth;
      const languageHeight = mm2px(2);
      const languageX = x
      const languageY = y + mm2px(57);
      const languageColor = 'black';
      const languageAlign = TEXT_ALIGN_CENTER;
      if (params[CARD_DATA_PARAMS_FIELD_LANGUAGE] !== undefined) {
        drawText(params[CARD_DATA_PARAMS_FIELD_LANGUAGE].toUpperCase(), languageX, languageY, languageWidth, languageHeight, languageColor, fontStyle, languageAlign);
      }

      //image attribution
      const attributionWidth = cardWidth
      const attributionHeight = mm2px(1);
      const attributionX = x;
      const attributionY = y + mm2px(59);
      const attributionColor = 'black';
      const attributionAlign = TEXT_ALIGN_CENTER;
      const attributionRotate = 90 - 90;
      if (params[CARD_DATA_PARAMS_FIELD_IMAGE_ATTRIBUTION] !== undefined) {
        drawText(params[CARD_DATA_PARAMS_FIELD_IMAGE_ATTRIBUTION], attributionX, attributionY, attributionWidth, attributionHeight, attributionColor, fontStyle, attributionAlign, attributionRotate);
      }

      //project name
      const projectNameText = "Gratia Dei's via My Patrons";
      const projectNameWidth = cardWidth;
      const projectNameHeight = mm2px(2);
      const projectNameX = x
      const projectNameY = y + mm2px(62);
      const projectNameColor = 'black';
      const projectNameAlign = TEXT_ALIGN_CENTER;
      drawText(projectNameText, projectNameX, projectNameY, projectNameWidth, projectNameHeight, projectNameColor, fontStyle, projectNameAlign);

      //categories
      if (cardType === CARD_TYPE_GOD || cardType === CARD_TYPE_PATRONS) {
        const categoriesWidth = cardWidth;
        const categoriesHeight = mm2px(5);
        const categoriesX = x;
        const categoriesY = y + mm2px(65);
        const categoriesColor = 'black';
        const categoriesAlign = TEXT_ALIGN_CENTER;
        if (params[CARD_DATA_PARAMS_FIELD_CATEGORIES] !== undefined) {
          drawText(params[CARD_DATA_PARAMS_FIELD_CATEGORIES], categoriesX, categoriesY, categoriesWidth, categoriesHeight, categoriesColor, fontStyle, categoriesAlign);
        }
      }

      //order
      if (cardType === CARD_TYPE_GOD || cardType === CARD_TYPE_PATRONS) {
        const orderWidth = cardWidth;
        const orderHeight = mm2px(3);
        const orderX = x;
        const orderY = y + mm2px(70);
        const orderColor = 'black';
        const orderAlign = TEXT_ALIGN_CENTER;
        if (params[CARD_DATA_PARAMS_FIELD_ORDER] !== undefined) {
          drawText(params[CARD_DATA_PARAMS_FIELD_ORDER].replace(/,([^ ])/g, ', $1'), orderX, orderY, orderWidth, orderHeight, orderColor, fontStyle, orderAlign);
        }
      }

      //God symbol or patron status
      //const triangleSize = mm2px(30);
      //const triangleX = x + cardWidth - triangleSize;
      //const triangleY = qrCodeY + qrCodeSize;
      //if (cardType === CARD_TYPE_GOD) {
        //drawGodTriangle(triangleX, triangleY, triangleSize);
      //} else if (cardType === CARD_TYPE_PATRONS) {
        //drawStatusTriangle(triangleX, triangleY, triangleSize);
      //}

      //patron rank
      //const rankWidth = mm2px(PATRON_RANK_COLUMNS * PATRON_RANK_CELL_SIZE);
      //const rankHeight = mm2px(PATRON_RANK_ROWS * PATRON_RANK_CELL_SIZE);
      //const rankX = x;
      //const rankY = orderY + orderHeight;
      //drawPatronProgress(rankX, rankY, rankWidth, rankHeight, PATRON_RANK_COLUMNS, PATRON_RANK_ROWS);

      //forenames
      if (cardType === CARD_TYPE_GOD || cardType === CARD_TYPE_PATRONS) {
        const forenamesWidth = cardWidth;
        const forenamesHeight = mm2px(3);
        const forenamesX = x;
        const forenamesY = y + mm2px(79);
        const forenamesColor = 'black';
        const forenamesAlign = TEXT_ALIGN_CENTER;
        if (params[CARD_DATA_PARAMS_FIELD_FORENAMES] !== undefined) {
          drawText(params[CARD_DATA_PARAMS_FIELD_FORENAMES], forenamesX, forenamesY, forenamesWidth, forenamesHeight, forenamesColor, fontStyle, forenamesAlign);
        }
      }

      //surnames
      if (cardType === CARD_TYPE_GOD || cardType === CARD_TYPE_PATRONS) {
        const surnamesWidth = cardWidth;
        const surnamesHeight = mm2px(3);
        const surnamesX = x;
        const surnamesY = y + mm2px(82);
        const surnamesColor = 'black';
        const surnamesAlign = TEXT_ALIGN_CENTER;
        if (params[CARD_DATA_PARAMS_FIELD_SURNAMES] !== undefined) {
          drawText(params[CARD_DATA_PARAMS_FIELD_SURNAMES], surnamesX, surnamesY, surnamesWidth, surnamesHeight, surnamesColor, fontStyle, surnamesAlign);
        }
      }

      //epithets
      if (cardType === CARD_TYPE_GOD || cardType === CARD_TYPE_PATRONS) {
        const epithetsWidth = cardWidth;
        const epithetsHeight = mm2px(3);
        const epithetsX = x;
        const epithetsY = y + mm2px(85);
        const epithetsColor = 'black';
        const epithetsAlign = TEXT_ALIGN_CENTER;
        if (params[CARD_DATA_PARAMS_FIELD_EPITHETS] !== undefined) {
          drawText(params[CARD_DATA_PARAMS_FIELD_EPITHETS], epithetsX, epithetsY, epithetsWidth, epithetsHeight, epithetsColor, fontStyle, epithetsAlign);
        }
      }
    });
  }
}

const drawPersonBaseCardBackground = function(x, y, cardWidth, cardHeight) {
  const context = getContext();

  const cardMargin = mm2px(CARD_MARGIN);
  const printAreaLeftX = x + cardMargin;
  const printAreaRightX = x + cardWidth - cardMargin;
  const printAreaTopY = y + cardMargin;
  const printAreaBottomY = y + cardHeight - cardMargin;

  context.lineWidth = 1;

  //name line between main name and other
  context.strokeStyle = "black";
  let lineY = printAreaTopY + mm2px(14);
  context.beginPath();
  context.moveTo(printAreaLeftX, lineY);
  context.lineTo(printAreaRightX, lineY);
  context.stroke();

  //name code boxes
  let boxWidth = mm2px(6);
  let boxHeight = mm2px(8);
  let fromX = printAreaRightX - boxWidth;
  lineY -= mm2px(1);
  for (let i = 0; i < 3; i++) {
    drawFilledRectangle(fromX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
    drawEmptyRectangle(fromX, lineY, boxWidth, boxHeight, 'black');
    fromX -= boxWidth;
  }

  //line between two additional name lines
  context.strokeStyle = "gray";
  lineY = printAreaTopY + mm2px(22);
  context.beginPath();
  context.moveTo(printAreaLeftX, lineY);
  context.lineTo(printAreaRightX, lineY);
  context.stroke();

  //death date top line
  context.strokeStyle = "black";
  lineY = printAreaTopY + mm2px(30);
  context.beginPath();
  context.moveTo(printAreaLeftX, lineY);
  context.lineTo(printAreaRightX, lineY);
  context.stroke();

  //death date boxes
  boxWidth = (printAreaRightX - printAreaLeftX) / 14;
  boxHeight = mm2px(6);
  fromX = printAreaRightX - boxWidth;
  lineY += mm2px(3);
  for (let i = 0; i < 14; i++) {
    drawFilledRectangle(fromX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
    drawEmptyRectangle(fromX, lineY, boxWidth, boxHeight, 'black');
    fromX -= boxWidth;
  }
  drawText(DEATH_SYMBOL_CHARACTER, printAreaLeftX, lineY + mm2px(1), boxWidth, boxHeight, 'black');

  //statuses
  const statusWidth = mm2px(16);
  const statusHeight = mm2px(30);
  const statusX = printAreaRightX - statusWidth;
  const statusY = printAreaBottomY - mm2px(40);
  drawStatusPath(statusX, statusY, statusWidth, statusHeight, COLOR_LIGHTGRAY);

  //task ids
  lineY = printAreaTopY + mm2px(37);
  let columnHeight = mm2px(5);
  let columnWidth = mm2px(12);
  let firstColumnWidth = mm2px(5);
  let prevLineY = 0;
  let columnLabelSuffixCharacter = '.';
  for (let i = 0; i < 7; i++) {
    if (i == 6) {
      columnLabelSuffixCharacter = '+';
    }

    lineY += columnHeight;
    context.beginPath();
    context.moveTo(printAreaLeftX, lineY);
    context.lineTo(printAreaLeftX + columnWidth, lineY);
    context.stroke();

    if (i < 5) {
      //date boxes
      boxWidth = (statusX - (printAreaLeftX + columnWidth)) / 10 - mm2px(0.2);
      fromX = printAreaLeftX + columnWidth + mm2px(1);
      for (let j = 0; j < 10; j++) {
        drawFilledRectangle(fromX, lineY, boxWidth, columnHeight, COLOR_LIGHTGRAY);
        drawEmptyRectangle(fromX, lineY, boxWidth, columnHeight, 'black');
        if (j == 4 || j == 7) {
          drawText(DATE_HYPHEN_SYMBOL_CHARACTER, fromX, lineY + mm2px(1), boxWidth, columnHeight, 'black');
        }
        fromX += boxWidth;
      }
    }
    if (i > 0) {
      drawFilledRectangle(printAreaLeftX, prevLineY, firstColumnWidth, columnHeight, 'black');
      drawFilledRectangle(printAreaLeftX + firstColumnWidth, prevLineY, columnWidth - firstColumnWidth, columnHeight, COLOR_LIGHTGRAY);
      drawEmptyRectangle(printAreaLeftX + firstColumnWidth, prevLineY, columnWidth - firstColumnWidth, columnHeight, 'black');

      let columnsXList = [printAreaLeftX, printAreaLeftX + firstColumnWidth, printAreaLeftX + columnWidth];
      for (let lineX of columnsXList) {
        context.beginPath();
        context.moveTo(lineX, lineY);
        context.lineTo(lineX, prevLineY);
        context.stroke();
      }

      drawText(i + columnLabelSuffixCharacter, printAreaLeftX, prevLineY + mm2px(1), firstColumnWidth, columnHeight - mm2px(1), 'white');
      if (i == 6) {
        drawText(CHECK_MARK_SYMBOL_CHARACTER, printAreaLeftX + firstColumnWidth, prevLineY + mm2px(1), columnWidth - firstColumnWidth, columnHeight, 'white');
      }
    }

    prevLineY = lineY;
  }

  //entrusted missions
  let circleX = printAreaLeftX + mm2px(16);
  const circleY = lineY;
  const circleBorderColor = 'black';
  const circleSizeCoeff = 2/15;
  const circleSize = statusWidth * circleSizeCoeff;

  for (let i = 1; i <= 5; i++) {
    drawBorderedAndFilledCircle(circleX, circleY, circleSize, circleBorderColor, COLOR_LIGHTGRAY);
    circleX += 2 * circleSize + mm2px(1);
  }

  //notes
  lineY += mm2px(3);
  boxX = printAreaLeftX;
  boxWidth = printAreaRightX - printAreaLeftX;
  boxHeight = printAreaBottomY - lineY;
  drawFilledRectangle(boxX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
  drawEmptyRectangle(boxX, lineY, boxWidth, boxHeight, 'black');

  //initiative text info
  const textSize = mm2px(3);
  drawText(INITIATIVE_TEXT_INFO, printAreaLeftX, printAreaTopY, printAreaRightX - printAreaLeftX, textSize, 'black', FONT_STYLE_NORMAL, TEXT_ALIGN_LEFT);
}

const drawPersonBaseCard = function(x, y, cardWidth, cardHeight) {
  const context = getContext();

  const cardMargin = mm2px(CARD_MARGIN);
  const printAreaLeftX = x + cardMargin;
  const printAreaRightX = x + cardWidth - cardMargin;
  const printAreaTopY = y + cardMargin;
  const printAreaBottomY = y + cardHeight - cardMargin;

  const nameFontColor = 'gray';
  const headerFontColor = 'black';
  const fontSize = mm2px(2);
  const fontStyle = FONT_STYLE_NORMAL;

  let language = getLanguage().toUpperCase();
  if (language.length > 3) {
    language = UNKNOWN;
  }

  //language
  let textWidth = mm2px(5);
  let textX = printAreaRightX - textWidth;
  let textY = printAreaTopY;
  let textContent = language;
  drawText(textContent, textX, textY, textWidth, fontSize + mm2px(1), headerFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //main name
  textWidth = mm2px(38);
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(12.3);
  textContent = getLanguageVariable('lang-main-name', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_LEFT);

  //code
  textWidth = mm2px(18);
  textX = printAreaRightX - textWidth;
  textY = printAreaTopY + mm2px(11.3);
  textContent = getLanguageVariable('lang-patron-code', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //second or further name
  textWidth = mm2px(38);
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(20.3);
  textContent = getLanguageVariable('lang-second-or-further-name', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_LEFT);

  //further name
  textWidth = printAreaRightX - printAreaLeftX;
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(28.3);
  textContent = getLanguageVariable('lang-further-name', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_LEFT);

  //death date
  textWidth = printAreaRightX - printAreaLeftX;
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(31.3);
  textContent = getLanguageVariable('lang-death-date-year-or-century', true) + ':';
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_CENTER);

  //initial challenges
  textWidth = mm2px(40);
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(40.3);
  textContent = getLanguageVariable('lang-early-challenges', true) + ':';
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_LEFT);

  //statuses
  textWidth = mm2px(16);
  textX = printAreaRightX - textWidth;
  textY = printAreaTopY + mm2px(40.3);
  textContent = getLanguageVariable('lang-status-color-changes', true) + ':';
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //entrusted missions
  textWidth = mm2px(25);
  textX = printAreaLeftX + mm2px(14);
  textY = printAreaTopY + mm2px(68.0);
  textContent = getLanguageVariable('lang-entrusted-missions', true) + ':';
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_CENTER);

  //notes
  textWidth = mm2px(20);
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(73.3);
  textContent = getLanguageVariable('lang-notes', true) + ':';
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_LEFT);
}

const drawChallengesCardBackground = function(x, y, cardWidth, cardHeight) {
  const context = getContext();

  const cardMargin = mm2px(CARD_MARGIN);
  const printAreaLeftX = x + cardMargin;
  const printAreaRightX = x + cardWidth - cardMargin;
  const printAreaTopY = y + cardMargin;
  const printAreaBottomY = y + cardHeight - cardMargin;

  context.lineWidth = 1;

  //name line between main name and other
  context.strokeStyle = "black";
  let lineY = printAreaTopY + mm2px(9);
  context.beginPath();
  context.moveTo(printAreaLeftX, lineY);
  context.lineTo(printAreaRightX, lineY);
  context.stroke();

  //name code boxes
  let boxWidth = mm2px(6);
  let boxHeight = mm2px(8);
  let fromX = printAreaRightX - boxWidth;
  lineY -= boxHeight - mm2px(2);
  for (let i = 0; i < 3; i++) {
    drawFilledRectangle(fromX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
    drawEmptyRectangle(fromX, lineY, boxWidth, boxHeight, 'black');
    fromX -= boxWidth;
  }

  //challenges
  const challengesTopY = printAreaTopY + mm2px(12);
  const chBoxWidth = printAreaRightX - printAreaLeftX;
  const chBoxHeight = mm2px(4.5);
  const totalHeight = printAreaBottomY - challengesTopY;
  const rowsCount = 15;
  const marginHeight = (totalHeight - (chBoxHeight * rowsCount)) / (rowsCount - 1);

  let chBoxX = printAreaLeftX;
  let chBoxY = challengesTopY;
  for (let i = 0; i < rowsCount; i++) {
      drawChallengeBox(chBoxX, chBoxY, chBoxWidth, chBoxHeight);
      chBoxY += (chBoxHeight + marginHeight);
  }

  //initiative text info
  const textSize = mm2px(3);
  drawText(INITIATIVE_TEXT_INFO, printAreaLeftX, printAreaTopY, printAreaRightX - printAreaLeftX, textSize, 'black', FONT_STYLE_NORMAL, TEXT_ALIGN_LEFT);
}

const drawChallengeBox = function(x, y, width, height) {
  const marginBetweenColumns = mm2px(2);
  const challengeColumnX = x + marginBetweenColumns;
  const challengeColumnWidth = mm2px(12);
  const challengeColumnBoxesCount = 1;
  const challengeColumnBoxWidth = challengeColumnWidth / challengeColumnBoxesCount;
  const dateColumnX = challengeColumnX + challengeColumnWidth + marginBetweenColumns;
  const dateColumnWidth = mm2px(32);
  const dateColumnBoxesCount = 10;
  const dateColumnsWithHyphen = [5, 8];
  const dateColumnBoxWidth = dateColumnWidth / dateColumnBoxesCount;
  const progressColumnX = dateColumnX + dateColumnWidth + marginBetweenColumns;
  const progressColumnWidth = x + width - progressColumnX;
  const progressColumnBoxesCount = 2;
  const progressColumnBoxWidth = progressColumnWidth / progressColumnBoxesCount;

  //challenge ID
  for (let i = 0; i < challengeColumnBoxesCount; i++) {
    drawFilledRectangle(challengeColumnX + i * challengeColumnBoxWidth, y, challengeColumnBoxWidth, height, COLOR_LIGHTGRAY);
    drawEmptyRectangle(challengeColumnX + i * challengeColumnBoxWidth, y, challengeColumnBoxWidth, height, 'black');
  }

  //date
  for (let i = 0; i < dateColumnBoxesCount; i++) {
    drawFilledRectangle(dateColumnX + i * dateColumnBoxWidth, y, dateColumnBoxWidth, height, COLOR_LIGHTGRAY);
    drawEmptyRectangle(dateColumnX + i * dateColumnBoxWidth, y, dateColumnBoxWidth, height, 'black');
  }
  for (let i of dateColumnsWithHyphen) {
    drawText(DATE_HYPHEN_SYMBOL_CHARACTER, dateColumnX + (i - 1) * dateColumnBoxWidth, y + mm2px(0.5), dateColumnBoxWidth, height, 'black');
  }

  //progress
  for (let i = 0; i < progressColumnBoxesCount; i++) {
    drawFilledRectangle(progressColumnX + i * progressColumnBoxWidth, y, progressColumnBoxWidth, height, COLOR_LIGHTGRAY);
    drawEmptyRectangle(progressColumnX + i * progressColumnBoxWidth, y, progressColumnBoxWidth, height, 'black');
  }
}

const drawChallengesCard = function(x, y, cardWidth, cardHeight) {
  const context = getContext();

  const cardMargin = mm2px(CARD_MARGIN);
  const printAreaLeftX = x + cardMargin;
  const printAreaRightX = x + cardWidth - cardMargin;
  const printAreaTopY = y + cardMargin;
  const printAreaBottomY = y + cardHeight - cardMargin;

  const nameFontColor = 'gray';
  const headersFontColor = 'black';
  const headerFontColor = 'black';
  const headerFontSize = mm2px(1.5);
  const fontSize = mm2px(2);
  const fontStyle = FONT_STYLE_NORMAL;
  const rotatedTextMoveX = mm2px(0.65);

  let language = getLanguage().toUpperCase();
  if (language.length > 3) {
    language = UNKNOWN;
  }

  //language
  let textWidth = mm2px(5);
  let textX = printAreaRightX - textWidth;
  let textY = printAreaTopY;
  let textContent = language;
  drawText(textContent, textX, textY, textWidth, fontSize + mm2px(1), headerFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //main name
  textWidth = mm2px(38);
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(9.3);
  textContent = getLanguageVariable('lang-main-name', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_LEFT);

  //code
  textWidth = mm2px(18);
  textX = printAreaRightX - textWidth - mm2px(18.5);
  textY = printAreaTopY + mm2px(9.3);
  textContent = getLanguageVariable('lang-patron-code', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //challenge boxes column headers
  textWidth = printAreaBottomY - printAreaTopY - mm2px(12);
  textY = printAreaBottomY;

  // - challenge column
  textX = printAreaLeftX + rotatedTextMoveX;
  textContent = getLanguageVariable('lang-challenges-card-challenge-column-header', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, headerFontSize, headersFontColor, fontStyle, TEXT_ALIGN_RIGHT, 90);

  // - date column
  textX = printAreaLeftX + mm2px(12 + 2) + rotatedTextMoveX;
  textContent = getLanguageVariable('lang-challenges-card-date-column-header', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, headerFontSize, headersFontColor, fontStyle, TEXT_ALIGN_RIGHT, 90);

  // - progress column
  textX = printAreaLeftX + mm2px(12 + 32 + 2 * 2) + rotatedTextMoveX;
  textContent = getLanguageVariable('lang-challenges-card-progress-column-header', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, headerFontSize, headersFontColor, fontStyle, TEXT_ALIGN_RIGHT, 90);
}

const drawFeastBaseCardBackground = function(x, y, cardWidth, cardHeight) {
  const context = getContext();

  const cardMargin = mm2px(CARD_MARGIN);
  const printAreaLeftX = x + cardMargin;
  const printAreaRightX = x + cardWidth - cardMargin;
  const printAreaTopY = y + cardMargin;
  const printAreaBottomY = y + cardHeight - cardMargin;

  context.lineWidth = 1;

  //name line between main name and other
  context.strokeStyle = "black";
  let lineY = printAreaTopY + mm2px(9);
  context.beginPath();
  context.moveTo(printAreaLeftX, lineY);
  context.lineTo(printAreaRightX, lineY);
  context.stroke();

  //person code boxes
  let codeBoxesCount = 3;
  let boxWidth = mm2px(6);
  let boxHeight = mm2px(8);
  let fromX = printAreaRightX - boxWidth;
  lineY -= boxHeight - mm2px(2);
  for (let i = 0; i < 3; i++) {
    drawFilledRectangle(fromX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
    drawEmptyRectangle(fromX, lineY, boxWidth, boxHeight, 'black');
    fromX -= boxWidth;
  }
  lineY += mm2px(11);

  //feast code boxes
  boxWidth = mm2px(9);
  boxHeight = mm2px(12);
  fromX = (printAreaRightX + printAreaLeftX) / 2 - (codeBoxesCount * boxWidth / 2);
  for (let i = 0; i < 3; i++) {
    drawFilledRectangle(fromX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
    drawEmptyRectangle(fromX, lineY, boxWidth, boxHeight, 'black');
    fromX += boxWidth;
  }
  lineY += boxHeight;

  //line between code and feast name lines
  lineY += mm2px(1);
  context.strokeStyle = "black";
  context.beginPath();
  context.moveTo(printAreaLeftX, lineY);
  context.lineTo(printAreaRightX, lineY);
  context.stroke();

  //other lines
  lineY += mm2px(3);
  context.strokeStyle = "gray";
  for (let i = 0; i < 3; i++) {
    lineY += mm2px(10);
    context.beginPath();
    context.moveTo(printAreaLeftX, lineY);
    context.lineTo(printAreaRightX, lineY);
    context.stroke();
  }
  lineY += mm2px(4);

  //chalenge ID box
  boxWidth = mm2px(13);
  boxHeight = mm2px(8);
  boxX = printAreaLeftX;
  drawFilledRectangle(boxX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
  drawEmptyRectangle(boxX, lineY, boxWidth, boxHeight, 'black');

  //date boxes
  let dateBoxesCount = 10;
  fromX = printAreaLeftX + boxWidth + mm2px(2);
  boxWidth = (printAreaRightX - fromX) / dateBoxesCount;
  for (let j = 0; j < dateBoxesCount; j++) {
    drawFilledRectangle(fromX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
    drawEmptyRectangle(fromX, lineY, boxWidth, boxHeight, 'black');
    if (j == 4 || j == 7) {
      drawText(DATE_HYPHEN_SYMBOL_CHARACTER, fromX, lineY + mm2px(1), boxWidth, boxHeight, 'black');
    }
    fromX += boxWidth;
  }
  lineY += boxHeight;

  //notes
  lineY += mm2px(3);
  boxX = printAreaLeftX;
  boxWidth = printAreaRightX - printAreaLeftX;
  boxHeight = printAreaBottomY - lineY;
  drawFilledRectangle(boxX, lineY, boxWidth, boxHeight, COLOR_LIGHTGRAY);
  drawEmptyRectangle(boxX, lineY, boxWidth, boxHeight, 'black');

  //initiative text info
  const textSize = mm2px(3);
  drawText(INITIATIVE_TEXT_INFO, printAreaLeftX, printAreaTopY, printAreaRightX - printAreaLeftX, textSize, 'black', FONT_STYLE_NORMAL, TEXT_ALIGN_LEFT);
}

const drawFeastBaseCard = function(x, y, cardWidth, cardHeight) {
  const context = getContext();

  const cardMargin = mm2px(CARD_MARGIN);
  const printAreaLeftX = x + cardMargin;
  const printAreaRightX = x + cardWidth - cardMargin;
  const printAreaTopY = y + cardMargin;
  const printAreaBottomY = y + cardHeight - cardMargin;

  const nameFontColor = 'gray';
  const headerFontColor = 'black';
  const fontSize = mm2px(2);
  const fontStyle = FONT_STYLE_NORMAL;

  let language = getLanguage().toUpperCase();
  if (language.length > 3) {
    language = UNKNOWN;
  }

  //language
  let textWidth = mm2px(5);
  let textX = printAreaRightX - textWidth;
  let textY = printAreaTopY;
  let textContent = language;
  drawText(textContent, textX, textY, textWidth, fontSize + mm2px(1), headerFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //main name
  textWidth = mm2px(38);
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(9.3);
  textContent = getLanguageVariable('lang-main-name', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_LEFT);

  //person code
  textWidth = mm2px(18);
  textX = printAreaRightX - textWidth - mm2px(18.5);
  textY = printAreaTopY + mm2px(9.3);
  textContent = getLanguageVariable('lang-patron-code', true);
  drawText(textContent, textX, textY, textWidth, fontSize, nameFontColor, fontStyle, TEXT_ALIGN_RIGHT);

  //feast code
  textWidth = mm2px(37);
  textX = printAreaLeftX + mm2px(10);
  textY = printAreaTopY + mm2px(12.3);
  textContent = getLanguageVariable('lang-feast-code', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_CENTER);

  //feast name
  textWidth = printAreaRightX - printAreaLeftX;
  textX = printAreaLeftX;
  textY = printAreaTopY + mm2px(28.3);
  textContent = getLanguageVariable('lang-feast-name', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_CENTER);

  //feast challenge data
  textY = printAreaTopY + mm2px(62.3);
  textContent = getLanguageVariable('lang-feast-challenge-data', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_CENTER);

  //notes
  textY += mm2px(11);
  textContent = getLanguageVariable('lang-notes', true) + COLON_SYMBOL_CHARACTER;
  drawText(textContent, textX, textY, textWidth, fontSize, headerFontColor, fontStyle, TEXT_ALIGN_CENTER);
}

buildForm();
