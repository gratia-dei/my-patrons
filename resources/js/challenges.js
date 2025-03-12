requirejs(
  ["common", "const", "date", "document", "env", "file", "language", "location", "notification", "sort", "useful", "marked"],
  function(uCommon, uConst, uDate, uDocument, uEnv, uFile, uLanguage, uLocation, uNotification, uSort, uUseful, libMarked
) {

  uConst
    .set("ADD_NEW_CHALLENGE", addNewChallenge)
    .set("ADD_NEW_CHALLENGE_RESET", addNewChallengeReset)
    .set("CHANGE_NOTE_ITEM_MODE_TO_EDIT", changeNoteItemModeToEdit)
    .set("CHALLENGE_INFO_RESET", challengeInfoReset)
    .set("CHECKLIST_LIST_RESET", checklistListReset)
    .set("CLEAR_NOTIFICATIONS", clearNotifications)
    .set("CREATE_NEW_EMPTY_NOTE", createNewEmptyNote)
    .set("DRAW_CHECKLIST_INFO", drawChecklistInfo)
    .set("LOAD_FILE", loadFile)
    .set("MOVE_CHALLENGE", moveChallenge)
    .set("MOVE_CHALLENGE_RESET", moveChallengeReset)
    .set("MOVE_DOWN_NOTE", moveDownNote)
    .set("MOVE_UP_NOTE", moveUpNote)
    .set("NOTES_RESET", notesReset)
    .set("RELOAD_CHALLENGES_TAB", reloadChallengesTab)
    .set("RELOAD_FILE_TAB", reloadFileTab)
    .set("RELOAD_JSON_EDITOR_TAB", reloadJsonEditorTab)
    .set("REMOVE_CHALLENGE", removeChallenge)
    .set("REMOVE_CHALLENGE_RESET", removeChallengeReset)
    .set("REMOVE_NOTE", removeNote)
    .set("REMOVE_NOTE_DURING_ADD_NEW_CHALLENGE", removeNoteDuringAddNewChallenge)
    .set("REMOVE_NOTE_MODAL_RESET", removeNoteModalReset)
    .set("RESET_ADDITION_SELECT", resetAdditionSelect)
    .set("RESET_CHALLENGE_TYPE_SELECT", resetChallengeTypeSelect)
    .set("RESET_PERSON_SELECT", resetPersonSelect)
    .set("RESET_PERSON_TYPE_SELECT", resetPersonTypeSelect)
    .set("RESET_REQUIRED_NOTES", resetRequiredNotes)
    .set("SAVE_FILE", saveFile)
    .set("SET_CHECKLIST_STATUS", setChecklistStatus)
    .set("SET_CHECKLIST_STATUS_WITH_NOTES_RESET", setChecklistStatusWithNotesReset)
    .set("SET_FILE_CONTENT_FROM_JSON_EDITOR", setFileContentFromJsonEditor)
    .set("SET_NOTE_SELL_MODE_TO_FORM", setNoteCellModeToForm)
    .set("SET_RANDOM_BIBLE_CHAPTER", setRandomBibleChapter)
    .set("SET_VALUE_AS_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION",setValueAsAddDatetimeSuffixToFilenameWithoutExtension)
    .set("SET_VALUE_AS_FILENAME_WITHOUT_EXTENSION", setValueAsFilenameWithoutExtension)
    .set("SET_VALUE_AS_OWNER", setValueAsOwner)
    .set("SHOW_LOAD_FILE_WARNING_IF_NEEDED", showLoadFileWarningIfNeeded)

    .set("SELECT_NAME", '...')
    .set("SELECT_SEPARATOR", '----------')

    .set("ANCHOR_CHARACTER", '#')
    .set("UNIQUENESS_STRING_SEPARATOR", '|#|#|')
    .set("UNIQUENESS_FIELD_MODIFIER_SEPARATOR", '|')

    .set("IMMOVABLE_DATES_PATRONS_LIST_CHARACTER", '#')
    .set("IMMOVABLE_DATES_TAKEN_CHALLENGES_LIST", ['B', 'SB', 'SC', 'SE', 'SP', 'SA', 'SO', 'SM']) //order is important!

    .set("MONTH_WITH_DAY_LEAP_YEAR_SEPARATOR_IN_IMMOVABLE_DATES_SITE", '!')
    .set("MONTH_WITH_DAY_LEAP_YEAR_SEPARATOR", 'b')
    .set("MONTH_WITH_DAY_NON_LEAP_YEAR_SEPARATOR", 'n')

    .set("MISSING_TABLE_HEADER_NOTE_NAME", '?')
    .set("EMPTY_NOTE_ID", 0)
    .set("EMPTY_ROW_ID", 0)
    .set("NOTE_QUANTITY_INFINITY_MAX", 0)
    .set("NOTES_IDS_SKIPPED_AFTER_PREDEFINED_LIST", 1000)

    .set("MISSING_NOTE_ID_SIGN", '!!!')
    .set("NOTES_CONFIG_JSON_FILE", '/files/data/notes-types.json')
    .set("PERSONS_DATA_JSON_FILE", '/files/data/generated/persons-data.generated.json')
    .set("BIBLE_CHAPTERS_DATA_JSON_FILE", '/files/data/bible-chapters.json')
    .set("DATES_FEASTS_IMMOVABLE_JSON_FILE", '/files/data/generated/dates-feasts-immovable.generated.json')
    .set("DATES_PATRONS_IMMOVABLE_JSON_FILE", '/files/data/generated/dates-patrons-immovable.generated.json')
    .set("LITURGICAL_SEASONS_JSON_FILE", '/files/data/generated/liturgical-seasons.generated.json')

    .set("PARSE_CHALLENGE_MANY_PERSONS_SIGN", '*')

    .set("CHALLENGE_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-challenge-item.html')
    .set("CHALLENGE_ITEM_TO_REMOVE_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-challenge-to-remove-item.html')
    .set("CHECKLIST_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-checklist-item.html')
    .set("NOTE_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-note-item.html')
    .set("DESCRIPTION_CONTENT_BLOCK_TEMPLATE_FILE_PATH", '/files/resources/html/content-blocks/challenges-description-content-block.html')
    .set("READ_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-read-mode-note-cell-item.html')
    .set("EDIT_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-edit-mode-note-cell-item.html')
    .set("FORM_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-form-mode-note-cell-item.html')
    .set("CREATE_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/challenges-create-mode-note-cell-item.html')
    .set("MARKDOWN_FILES_ROOT_PATH", '/files/resources/md/')

    .set("DEFAULT_JSON_FILENAME", '')
    .set("DEFAULT_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION_VALUE", true)
    .set("MIN_CHALLENGE_DATE_ALLOWED", '1901-01-01')

    .set("MOVE_CHALLENGE_DIRECTION_UP", 'up')
    .set("MOVE_CHALLENGE_DIRECTION_DOWN", 'down')

    .set("JSON_EDITOR_BUTTON_ELEMENT_ID", 'json-editor-button')
    .set("CHALLENGE_ROW_ELEMENT_ID_PREFIX", 'id-')
    .set("CHALLENGES_ELEMENT_ID", 'challenges')
    .set("JSON_EDITOR_TEXTAREA_ELEMENT_ID", 'json-editor-textarea')
    .set("CHALLENGE_DATE_INPUT_ELEMENT_ID", 'challenge-date-input')
    .set("CHALLENGE_TYPE_SELECT_ELEMENT_ID", 'challenge-type-select')
    .set("LAST_SELECTED_CHALLENGE_TYPE_ELEMENT_ID", 'last-selected-challenge-type')
    .set("CHALLENGE_TYPE_DIV_ELEMENT_ID", 'challenge-type-div')
    .set("CHALLENGE_DESCRIPTION_DIV_ELEMENT_ID", 'challenge-description-div')
    .set("CHALLENGE_DESCRIPTION_INFO_DIV_ELEMENT_ID", 'challenge-description-info-div')
    .set("CHALLENGE_DESCRIPTION_INFO_VALUE_ELEMENT_ID", 'challenge-description-info-value')
    .set("PERSON_DESCRIPTION_DIV_ELEMENT_ID", 'person-description-div')
    .set("PERSON_DESCRIPTION_INFO_DIV_ELEMENT_ID", 'person-description-info-div')
    .set("PERSON_DESCRIPTION_INFO_VALUE_ELEMENT_ID", 'person-description-info-value')
    .set("ADD_NEW_CHALLENGE_BUTTON_ELEMENT_ID", 'add-new-challenge-button')
    .set("PERSON_DIV_ELEMENT_ID", 'person-div')
    .set("PERSON_TYPE_SELECT_ELEMENT_ID", 'person-type-select')
    .set("PERSON_SELECT_ELEMENT_ID", 'person-select')
    .set("ADDITION_SELECT_ELEMENT_ID", 'addition-select')
    .set("PERSON_URL_ELEMENT_ID_PREFIX", 'person-url-')
    .set("ADDITION_URL_ELEMENT_ID_PREFIX", 'addition-url-')
    .set("CHECKLIST_LIST_MODAL_BODY_ELEMENT_ID", 'checklist-list-modal-body')
    .set("NOTES_LIST_ELEMENT_ID", 'notes-list')
    .set("NOTES_LIST_FOR_ADD_NEW_CHALLENGE_ELEMENT_ID", 'notes-list-for-add-new-challenge')
    .set("CHECKLIST_ITEM_DESCRIPTION_ELEMENT_ID", 'checklist-item-description')
    .set("CHECKLIST_ITEM_MODAL_TOGGLE_LABEL_ELEMENT_ID", 'checklist-item-modal-toggle-label')
    .set("CHECKLIST_BUTTON_CLOSE_ELEMENT_ID", 'checklist-button-close')
    .set("CHECKLIST_BUTTON_ABORTED_ELEMENT_ID", 'checklist-button-aborted')
    .set("CHECKLIST_BUTTON_OPTIONAL_WAITING_ELEMENT_ID", 'checklist-button-optional-waiting')
    .set("CHECKLIST_BUTTON_WAITING_ELEMENT_ID", 'checklist-button-waiting')
    .set("CHECKLIST_BUTTON_DONE_ELEMENT_ID", 'checklist-button-done')
    .set("CHECKLIST_ITEM_MODAL_ROW_ID_ELEMENT_ID", 'checklist-item-modal-row-id')
    .set("CHECKLIST_ITEM_MODAL_ITEM_TYPE_ELEMENT_ID", 'checklist-item-modal-item-type')
    .set("CHALLENGE_TO_REMOVE_ELEMENT_ID", 'challenge-to-remove')
    .set("REMOVE_CHALLENGE_MODAL_ROW_ID_ELEMENT_ID", 'remove-challenge-modal-row-id')
    .set("MOVE_CHALLENGE_MODAL_ROW_ID_ELEMENT_ID", 'move-challenge-modal-row-id')
    .set("MOVE_CHALLENGE_MODAL_DIRECTION_ELEMENT_ID", 'move-challenge-modal-direction')
    .set("MOVE_CHALLENGE_UP_BUTTON_ELEMENT_ID_PREFIX", 'move-challenge-up-button-')
    .set("MOVE_CHALLENGE_DOWN_BUTTON_ELEMENT_ID_PREFIX", 'move-challenge-down-button-')
    .set("REQUIRED_NOTES_DIV_ELEMENT_ID", 'required-notes-div')
    .set("REQUIRED_CHECKLIST_STEPS_DIV_ELEMENT_ID", 'required-checklist-steps-div')
    .set("REQUIRED_NOTES_DONE_INPUT_ELEMENT_ID", 'required-notes-done')
    .set("REQUIRED_CHECKLIST_STEPS_DONE_INPUT_ELEMENT_ID", 'required-checklist-steps-done')
    .set("REQUIRED_CHECKLIST_STEPS_LIST_ELEMENT_ID", 'required-checklist-steps-list')
    .set("REQUIRED_CHECKLIST_STEPS_INFO_ELEMENT_ID", 'required-checklist-steps-info')
    .set("NOTE_CELL_ELEMENT_ID_PREFIX", 'note-cell-')
    .set("NOTE_CELL_EDIT_BUTTON_ELEMENT_ID_SUFFIX", '-edit-button')
    .set("NOTE_CELL_MOVE_UP_BUTTON_ELEMENT_ID_SUFFIX", '-move-up-button')
    .set("NOTE_CELL_MOVE_DOWN_BUTTON_ELEMENT_ID_SUFFIX", '-move-down-button')
    .set("NOTE_CELL_REMOVE_BUTTON_ELEMENT_ID_SUFFIX", '-remove-button')
    .set("NOTE_CELL_REMOVE_DURING_ADD_NEW_CHALLENGE_BUTTON_ELEMENT_ID_SUFFIX", '-remove-during-add-new-challenge-button')
    .set("NOTE_CELL_HINT_ELEMENT_ID_SUFFIX", '-hint')
    .set("NOTE_ITEM_ELEMENT_ID_PREFIX", 'note-item-')
    .set("NOTE_VALUE_ELEMENT_ID_PREFIX", 'note-value-')
    .set("NOTE_VALUE_TABLE_BODY_ELEMENT_ID_SUFFIX", '-table-body')
    .set("REMOVE_NOTE_MODAL_ROW_ID_ELEMENT_ID", 'remove-note-modal-row-id')
    .set("REMOVE_NOTE_MODAL_CHALLENGE_TYPE_ELEMENT_ID", 'remove-note-modal-challenge-type')
    .set("REMOVE_NOTE_MODAL_ITEM_TYPE_ELEMENT_ID", 'remove-note-modal-item-type')
    .set("REMOVE_NOTE_MODAL_ITEM_PATH_ELEMENT_ID", 'remove-note-modal-item-path')
    .set("NOTE_CELL_INPUT_ELEMENT_ID", 'note-cell-input')
    .set("NOTE_CELL_SELECT_ELEMENT_ID", 'note-cell-select')
    .set("NOTE_CELL_SET_EXISTING_NOTE_BUTTON", 'note-cell-set-existing-note-button')
    .set("NOTE_CELL_SET_NEW_NOTE_BUTTON", 'note-cell-set-new-note-button')
    .set("CHALLENGE_SUCCESS_STATUS_ICON_TODO_ELEMENT_ID_PREFIX", 'challenge-success-status-icon-todo-')
    .set("CHALLENGE_SUCCESS_STATUS_ICON_ABORTED_ELEMENT_ID_PREFIX", 'challenge-success-status-icon-aborted-')
    .set("CHALLENGE_SUCCESS_STATUS_ICON_WAITING_ELEMENT_ID_PREFIX", 'challenge-success-status-icon-waiting-')
    .set("CHALLENGE_SUCCESS_STATUS_ICON_WAITING_WITH_ONLY_LONG_TERM_STEPS_REMAINING_ELEMENT_ID_PREFIX", 'challenge-success-status-icon-waiting-with-only-long-term-steps-remaining-')
    .set("CHALLENGE_SUCCESS_STATUS_ICON_DONE_ELEMENT_ID_PREFIX", 'challenge-success-status-icon-done-')
    .set("CHALLENGE_SUCCESS_STATUS_ICON_DONE_WITHOUT_ANY_OPTIONAL_STEPS_ELEMENT_ID_PREFIX", 'challenge-success-status-icon-done-without-any-optional-steps-')
    .set("RANDOM_BIBLE_CHAPTERS_BUTTON_ELEMENT_ID", 'random-bible-chapter')
    .set("CHALLENGES_SHOW_FOR_NO_ROWS_CLASS_ID", 'challenges-show-for-no-rows')
    .set("CHALLENGES_SHOW_FOR_ANY_ROWS_CLASS_ID", 'challenges-show-for-any-rows')

    .set("CHECKLIST_ITEM_TARGET_ATTRIBUTE_NAME", 'data-bs-target')
    .set("CHECKLIST_ITEM_BACK_TO_CHECKLIST_LIST_MODAL_TARGET", '#checklist-list-modal-toggle')
    .set("CHECKLIST_ITEM_BACK_TO_ADD_NEW_CHALLENGE_MODAL_TARGET", '#add-new-challenge-modal-toggle')

    .set("PROGRESS_DONE_ELEMENT_ID_PREFIX", 'progress-done-')
    .set("PROGRESS_OPTIONAL_ELEMENT_ID_PREFIX", 'progress-optional-')
    .set("PROGRESS_ABORTED_ELEMENT_ID_PREFIX", 'progress-aborted-')

    .set("PERSON_ADDITION_SEPARATOR", '@')

    .set("INPUT_FOR_FILENAME_WITHOUT_EXTENSION_ELEMENT_ID", 'input-for-filename-without-extension')
    .set("DATETIME_CHECKBOX_FOR_FILENAME_WITHOUT_EXTENSION_ELEMENT_ID", 'datetime-checkbox-for-filename-without-extension')
    .set("INPUT_FOR_OWNER_ELEMENT_ID", 'input-for-owner')

    .set("PERSONS_DATA_FIELD_NAMES", 'names')

    .set("DATA_FIELD_CHALLENGES", uCommon.getConst("DATA_FIELD_CHALLENGES"))
    .set("DATA_FIELD_FILENAME_WITHOUT_EXTENSION", uCommon.getConst("DATA_FIELD_FILENAME_WITHOUT_EXTENSION"))
    .set("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION", uCommon.getConst("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION"))
    .set("DATA_FIELD_OWNER", uCommon.getConst("DATA_FIELD_OWNER"))
    .set("DATA_FIELD_CHECKLIST", uCommon.getConst("DATA_FIELD_CHECKLIST"))
    .set("DATA_FIELD_NOTES", uCommon.getConst("DATA_FIELD_NOTES"))

    .set("CONFIG_FIELD_ADDITION_TYPE", uCommon.getConst("CONFIG_FIELD_ADDITION_TYPE"))
    .set("CONFIG_FIELD_CHECKLIST", uCommon.getConst("CONFIG_FIELD_CHECKLIST"))
    .set("CONFIG_FIELD_LONG_TERM_STEP", uCommon.getConst("CONFIG_FIELD_LONG_TERM_STEP"))
    .set("CONFIG_FIELD_NOTES", uCommon.getConst("CONFIG_FIELD_NOTES"))
    .set("CONFIG_FIELD_SELECTABLE", uCommon.getConst("CONFIG_FIELD_SELECTABLE"))
    .set("CONFIG_FIELD_TO_COMPLETE_ON_SELECTED_DATE", uCommon.getConst("CONFIG_FIELD_TO_COMPLETE_ON_SELECTED_DATE"))

    .set("PERSON_PREFIX_NEEDED", 'patrons')
    .set("COPY_PERSON_TYPE_TO_NAME_IDS", ['me'])
    .set("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL", 'god')

    .set("REQUIREMENT_ANYBODY_HAVING_CHALLENGES", 'anybody-having-challenges')
    .set("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_1_DAY", 'anybody-having-challenges-in-last-1-day')
    .set("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_7_DAYS", 'anybody-having-challenges-in-last-7-days')
    .set("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_40_DAYS", 'anybody-having-challenges-in-last-40-days')
    .set("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_100_DAYS", 'anybody-having-challenges-in-last-100-days')
    .set("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_ON_THE_SAME_DAY", 'anybody-having-challenges-on-the-same-day')
    .set("REQUIREMENT_EVERYBODY_NOT_HAVING_CHALLENGES", 'everybody-not-having-challenges')
    .set("REQUIREMENT_EVERYBODY_NOT_HAVING_CHALLENGES_ON_THE_SAME_DAY", 'everybody-not-having-challenges-on-the-same-day')
    .set("REQUIREMENT_GOD_HAVING_NEEDED_CHALLENGES", 'god-having-needed-challenges')
    .set("REQUIREMENT_GOD_OR_ANY_PATRON", 'god-or-any-patron')
    .set("REQUIREMENT_PERSON_HAVING_ANY_CHALLENGE", 'person-having-any-challenge')
    .set("REQUIREMENT_PERSON_HAVING_CHALLENGES", 'person-having-challenges')
    .set("REQUIREMENT_PERSON_NOT_HAVING_CHALLENGES", 'person-not-having-challenges')
    .set("REQUIREMENT_PERSON_ADDITION_IS_NOT_EMPTY", 'person-addition-is-not-empty')
    .set("REQUIREMENT_PERSON_ADDITION_HAVING_CHALLENGES", 'person-addition-having-challenges')
    .set("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES", 'person-addition-not-having-challenges')
    .set("REQUIREMENT_DAY_OF_WEEK_HAVING_WHITELIST", 'day-of-week-having-whitelist')
    .set("REQUIREMENT_MONTH_HAVING_WHITELIST", 'month-having-whitelist')
    .set("REQUIREMENT_CHALLENGE_DATE_IS_IN_LITURGICAL_SEASONS", 'challenge-date-is-in-liturgical-seasons')
    .set("REQUIREMENT_DAY_OF_MONTH_HAVING_MAXIMUM", 'day-of-month-having-maximum')
    .set("REQUIREMENT_FIRST_CHALLENGE_DATE_MUST_BE_EARLIER_THAN_DAYS_BEFORE_LITURGICAL_SEASON_END", 'first-challenge-date-must-be-earlier-than-days-before-liturgical-season-end')
    .set("REQUIREMENT_CHALLENGE_TYPE_NAME_PREFIX", 'challenge-type-name-prefix')
    .set("REQUIREMENT_CHALLENGE_REQUIREMENTS_TO_COPY", 'challenge-requirements-to-copy')
    .set("REQUIREMENT_CHALLENGE_REQUIREMENTS_TO_COPY_FROM_OTHER", 'challenge-requirements-to-copy-from-other')
    .set("REQUIREMENT_NOTES_WITH_CHALLENGE_TYPES_HAVE_ANY_POSSIBLE_VALUE", 'notes-with-challenge-types-have-any-possible-value')

    .set("PARSE_REQUIREMENTS_SINCE_ACTIVE_DATES", {
      [uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES")]: {
        I: '2022-02-01',
        MM: '2023-06-01'
      },
      [uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES")]: {
        MM: '2023-06-01'
      },
      [uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_40_DAYS")]: {
        SPA: '2024-01-01'
      }
    })

    .set("NOTE_CONFIG_SOURCE_TYPE_VALUES", 'values')
    .set("NOTE_CONFIG_SOURCE_TYPE_VALUES_TYPE_SORTED", 'sorted')
    .set("NOTE_CONFIG_SOURCE_TYPE_VALUES_TYPE_LAST_YEAR_OR_10_CHALLENGES_SORTED", 'last-year-or-10-challenges-sorted')
    .set("NOTE_CONFIG_SOURCE_TYPE_LIST", 'list')
    .set("NOTE_CONFIG_SOURCE_TYPE_PATRONS", 'patrons')
    .set("NOTE_CONFIG_SOURCE_TYPE_CHALLENGE_TYPES", 'challenge-types')

    .set("JSON_MIME_TYPE", 'application/json')
    .set("JSON_DATA_FILE_EXTENSION", '.mypatrons.json')
    .set("MARKDOWN_FILE_EXTENSION", '.md')

    .set("DESCRIPTION_VALUE_PARAM", 'value')

    .set("JSON_STRINGIFY_SPACES", 2)
    .set("MAX_NOTE_OBJECT_STRUCTURE_LEVELS", 5)

    .set("LANGUAGE_VARIABLE_PREFIX", 'lang-')
    .set("WEEKDAY_LANGUAGE_VARIABLES_PREFIX", 'lang-weekday-abbreviation-')
    .set("MONTH_LANGUAGE_VARIABLES_PREFIX", 'lang-month-')

    .set("SELECTED_PERSON_IN_GENERAL_LANGUAGE_VARIABLE_NAME", 'lang-without-addition-selection')

    .set("CHECKLIST_STATUS_WAITING", 'waiting')
    .set("CHECKLIST_STATUS_OPTIONAL_WAITING", 'optional-waiting')
    .set("CHECKLIST_STATUS_ABORTED", 'aborted')
    .set("CHECKLIST_STATUS_DONE", 'done')
    .set("CHECKLIST_STATUSES", {
      [uConst.get("CHECKLIST_STATUS_WAITING")]: {variable: 'lang-checklist-status-waiting', color: uConst.get("CHECKLIST_STATUS_WAITING")},
      [uConst.get("CHECKLIST_STATUS_OPTIONAL_WAITING")]: {variable: 'lang-checklist-status-optional-waiting', color: uConst.get("CHECKLIST_STATUS_OPTIONAL_WAITING")},
      [uConst.get("CHECKLIST_STATUS_ABORTED")]: {variable: 'lang-checklist-status-aborted', color: uConst.get("CHECKLIST_STATUS_ABORTED")},
      [uConst.get("CHECKLIST_STATUS_DONE")]: {variable: 'lang-checklist-status-done', color: uConst.get("CHECKLIST_STATUS_DONE")}
    })

    .set("CHALLENGE_SUCCESS_STATUS_IN_DATA_ABORTED", uCommon.getConst("CHALLENGE_STATUS_IN_DATA_ABORTED"))
    .set("CHALLENGE_SUCCESS_STATUS_IN_DATA_WAITING", uCommon.getConst("CHALLENGE_STATUS_IN_DATA_WAITING"))
    .set("CHALLENGE_SUCCESS_STATUS_IN_DATA_DONE", uCommon.getConst("CHALLENGE_STATUS_IN_DATA_DONE"))

    .set("CHALLENGE_SUCCESS_STATUS_TODO", uCommon.getConst("CHALLENGE_STATUS_TODO"))
    .set("CHALLENGE_SUCCESS_STATUS_ABORTED", uCommon.getConst("CHALLENGE_STATUS_ABORTED"))
    .set("CHALLENGE_SUCCESS_STATUS_WAITING", uCommon.getConst("CHALLENGE_STATUS_WAITING"))
    .set("CHALLENGE_SUCCESS_STATUS_DONE", uCommon.getConst("CHALLENGE_STATUS_DONE"))

    .set("HTML_TAGS_TO_ESCAPE", {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    })
  ;

  let challengesConfig = {};
  let notesTypesConfig = {};
  let personsData = {};
  let personsDataSubelementsCache = {};
  let personsAdditionDataElementsCache = {};
  let immovableDatesPatronsData = {};
  let liturgicalSeasonsData = {};

  let fileName = uConst.get("DEFAULT_JSON_FILENAME");
  let fileContent = '{}';
  let fileData = {};
  let unchangedFileContent = fileContent;
  let isDataValid = true;

  let lastEditedNoteItem = [];
  let lastFormModeNoteCellElementIdSuffix = {};
  let newChallengeChecklistValues = {};
  let newChallengeNotesValues = {};

  async function build() {
    window.onbeforeunload = function() {
        if (unchangedFileContent !== fileContent) {
            return true;
        }
    }

    await uLanguage.loadTranslationsFile();
    challengesConfig = await uCommon.getChallengesConfig();
    notesTypesConfig = await uFile.getJsonFromFile(uConst.get("NOTES_CONFIG_JSON_FILE"));
    personsData = await uFile.getJsonFromFile(uConst.get("PERSONS_DATA_JSON_FILE"));
    immovableDatesPatronsData = await getImmovableDatesPatronsData([uConst.get("DATES_FEASTS_IMMOVABLE_JSON_FILE"), uConst.get("DATES_PATRONS_IMMOVABLE_JSON_FILE")]);
    liturgicalSeasonsData = await uFile.getJsonFromFile(uConst.get("LITURGICAL_SEASONS_JSON_FILE"));

    doActionsDependentOfAdvancedMode();
    reloadFileTab();

    infoNotification(uLanguage.getTranslation('lang-challenges-form-info', true));
  }

  function getDateFormat(dateString) {
    const weekday = uDate.getWeekdayName(dateString);
    const prefix = uLanguage.getTranslation(uConst.get("WEEKDAY_LANGUAGE_VARIABLES_PREFIX") + weekday.toLowerCase());

    return prefix + ' ' + dateString;
  }

  function isAdvancedMode() {
    const search = uLocation.getSearch();

    return (search.match(/[?&]mode=advanced(&.*)?$/) !== null);
  }

  function doActionsDependentOfAdvancedMode() {
    const advancedMode = isAdvancedMode();

    const jsonEditorButton = uDocument.getElementById(uConst.get("JSON_EDITOR_BUTTON_ELEMENT_ID"));
    uUseful.setVisibility(jsonEditorButton, advancedMode);
  }

  function getHtmlTagsEscapedString(string) {
    return string.replace(/[&<>]/g, function(str) {
      return uConst.get("HTML_TAGS_TO_ESCAPE")[str] || str;
    });
  }

  function getPersonsDataDirName(id) {
    return id.replace(new RegExp('[/' + uConst.get("PERSON_ADDITION_SEPARATOR") + '][^/' + uConst.get("PERSON_ADDITION_SEPARATOR") + ']+[/' + uConst.get("PERSON_ADDITION_SEPARATOR") + ']?$'), '');
  }

  function getPersonsDataBaseName(id) {
    return id.replace(new RegExp('^.*[/' + uConst.get("PERSON_ADDITION_SEPARATOR") + ']'), '');
  }

  function getPersonsDataRootName(id) {
    return id.replace(new RegExp('[/' + uConst.get("PERSON_ADDITION_SEPARATOR") + '].*$'), '');
  }

  function getPreparedNotificationMessageAndLink(message, rowId) {
    if (rowId > uConst.get("EMPTY_ROW_ID")) {
      const link = uConst.get("ANCHOR_CHARACTER") + uConst.get("CHALLENGE_ROW_ELEMENT_ID_PREFIX") + rowId;
      return ['[#' + rowId + '] ' + message, link];
    } else {
      return [message, null];
    }
  }

  function showLoadFileWarningIfNeeded() {
    clearNotifications();
    const message = uLanguage.getTranslation('lang-load-file-warning', true);
    if (unchangedFileContent !== fileContent) {
      warningNotification(message);
    }
  }

  function clearNotifications() {
    uNotification.clear();
  }

  function errorNotification(message, rowId = uConst.get("EMPTY_ROW_ID")) {
    const [newMessage, link] = getPreparedNotificationMessageAndLink(message, rowId);
    uNotification.error(newMessage, link);
  }

  function warningNotification(message, rowId = uConst.get("EMPTY_ROW_ID")) {
    const [newMessage, link] = getPreparedNotificationMessageAndLink(message, rowId);
    uNotification.warning(newMessage, link);
  }

  function infoNotification(message, rowId = uConst.get("EMPTY_ROW_ID")) {
    [newMessage, link] = getPreparedNotificationMessageAndLink(message, rowId);
    uNotification.info(newMessage, link);
  }

  function successNotification(message, rowId = uConst.get("EMPTY_ROW_ID")) {
    const [newMessage, link] = getPreparedNotificationMessageAndLink(message, rowId);
    uNotification.success(newMessage, link);
  }

  function gotoChallenge(rowId) {
    location.hash = uConst.get("ANCHOR_CHARACTER") + uConst.get("CHALLENGE_ROW_ELEMENT_ID_PREFIX") + rowId;
  }

  async function getImmovableDatesPatronsData(filePaths) {
    let result = {};

    const personPrefixNeeded = uConst.get("PERSON_PREFIX_NEEDED");

    for (const filePath of filePaths) {
      const fileData = await uFile.getJsonFromFile(filePath);
      for (const monthWithDay of Object.keys(fileData)) {
        const dayData = fileData[monthWithDay] ?? {};
        for (const patronWithAdditionId of Object.keys(dayData)) {
          if (!patronWithAdditionId.match(new RegExp('/' + personPrefixNeeded + '/'))) {
            continue;
          }

          const patronId = patronWithAdditionId
            .replace(/[#].+$/, '')
            .replace(new RegExp('^.*/' + personPrefixNeeded + '/'), personPrefixNeeded + '/')
          ;

          if (result[monthWithDay] == undefined) {
            result[monthWithDay] = {};
          }
          result[monthWithDay][patronId] = true;
        }
      }
    }

    return result;
  }

  function synchronizeFileData() {
    clearNotifications();

    sortChallengesByDate();
    recalculateFileData();

    fileContent = JSON.stringify(fileData);
    fileData = parseFileDataFromContent(fileContent);

    setDivVisibilities((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? []).length);
  }

  function setDivVisibilities(challengesCount) {
    noRowsElements = uDocument.getElementsByClassName(uConst.get("CHALLENGES_SHOW_FOR_NO_ROWS_CLASS_ID"));
    anyRowsElements = uDocument.getElementsByClassName(uConst.get("CHALLENGES_SHOW_FOR_ANY_ROWS_CLASS_ID"));

    for (const element of noRowsElements) {
      uUseful.setVisibility(element, (challengesCount <= 0));
    }
    for (const element of anyRowsElements) {
      uUseful.setVisibility(element, (challengesCount > 0));
    }
  }

  async function loadFile(input) {
    try {
      clearNotifications();

      const data = input.files[0];

      fileName = data.name.replace(new RegExp('[0-9]{8}-[0-9]{6}' + uConst.get("JSON_DATA_FILE_EXTENSION") + '$'), '');
      fileContent = await data.text();
      fileData = parseFileDataFromContent(fileContent);

      if (fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")]) {
        fileName = fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")];
      } else {
        fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")] = fileName;
      }

      synchronizeFileData();
      reloadFileTab();
      await reloadChallengesTab();

      unchangedFileContent = fileContent;

      successNotification(uLanguage.getTranslation('lang-file-loaded-successfully', true));
    } catch (e) {
      errorNotification(e.message);
    }
  }

  async function saveFile() {
    try {
      clearNotifications();

      try {
        JSON.parse(fileContent);
        synchronizeFileData();
      } catch (e) {
        throw new Error(uLanguage.getTranslation('lang-cannot-save-invalid-data', true));
      }

      fileContent = JSON.stringify(fileData);
      await reloadChallengesTab();

      if ((fileData[uConst.get("DATA_FIELD_OWNER")] ?? '').length === 0) {
        throw new Error(uLanguage.getTranslation('lang-missing-file-owner', true));
      } else if ((fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")] ?? '').length === 0) {
        throw new Error(uLanguage.getTranslation('lang-missing-filename-without-extension', true));
      } else if (!isDataValid) {
        throw new Error(uLanguage.getTranslation('lang-cannot-save-invalid-data', true));
      }

      let datetimeSuffix = '';
      if (true === (fileData[uConst.get("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION")] ?? uConst.get("DEFAULT_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION_VALUE"))) {
        datetimeSuffix = '-' + uDate.getUtcDatetime().replace(/[^ 0-9]/g, '').replace(/ /, '-');
      }

      var blob = new Blob([fileContent], {type: uConst.get("JSON_MIME_TYPE")});
      var a = uDocument.createElement('a');
      a.download = fileName + datetimeSuffix + uConst.get("JSON_DATA_FILE_EXTENSION");
      a.href = uEnv.getWindow().URL.createObjectURL(blob);
      a.click();

      unchangedFileContent = fileContent;

      successNotification(uLanguage.getTranslation('lang-file-prepared-to-save-successfully', true));
    } catch (e) {
      errorNotification(e.message);
    }
  }

  function reloadFileTab() {
    try {
      clearNotifications();

      let inputForOwner = uDocument.getElementById(uConst.get("INPUT_FOR_OWNER_ELEMENT_ID"));
      let inputForFilenameWithoutExtension = uDocument.getElementById(uConst.get("INPUT_FOR_FILENAME_WITHOUT_EXTENSION_ELEMENT_ID"));
      let datetimeCheckboxForFilenameWithoutExtension = uDocument.getElementById(uConst.get("DATETIME_CHECKBOX_FOR_FILENAME_WITHOUT_EXTENSION_ELEMENT_ID"));

      inputForOwner.value = '';
      inputForFilenameWithoutExtension.value = '';
      datetimeCheckboxForFilenameWithoutExtension.checked = false;
      fileData = parseFileDataFromContent(fileContent);

      inputForOwner.value = fileData[uConst.get("DATA_FIELD_OWNER")] ?? '';
      inputForFilenameWithoutExtension.value = fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")] ?? uConst.get("DEFAULT_JSON_FILENAME");
      datetimeCheckboxForFilenameWithoutExtension.checked = fileData[uConst.get("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION")] ?? uConst.get("DEFAULT_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION_VALUE");
    } catch (e) {
      errorNotification(e.message);
    }
  }

  async function reloadChallengesTab() {
    try {
      synchronizeFileData();

      const challengesData = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
      await fillChallenges(challengesData);

      parseChallenges(challengesData);
    } catch (e) {
      errorNotification(e.message);
    }
  }

  function reloadJsonEditorTab() {
    try {
      clearNotifications();

      parseFileDataFromContent(fileContent);

      let content = fileContent;
      content = JSON.stringify(fileData, null, uConst.get("JSON_STRINGIFY_SPACES"));

      uDocument.getElementById(uConst.get("JSON_EDITOR_TEXTAREA_ELEMENT_ID")).value = content;
      fileData = parseFileDataFromContent(fileContent);
    } catch (e) {
      errorNotification(e.message);
    }
  }

  async function setFileContentFromJsonEditor() {
    try {
      clearNotifications();
      fileContent = uDocument.getElementById(uConst.get("JSON_EDITOR_TEXTAREA_ELEMENT_ID")).value;
      fileData = parseFileDataFromContent(fileContent);
      await reloadChallengesTab();
    } catch (e) {
      errorNotification(e.message);
    }
  }

  function parseFileDataFromContent(content) {
    let data = {};
    try {
      data = JSON.parse(content);
    } catch (e) {
      let message = uLanguage.getTranslation('lang-invalid-json-file', true);
      throw new Error(message + ' (' + e.message + ')');
    }

    return data;
  }

  function parseChallenges(challengesData) {
    let rowId = 0;
    try {
      let contextData = {
        persons: {
          counts: {},
          dates: {}
        },
        additions: {
          counts: {}
        },
        uniqs: {},
        lastNumbers: {}
      };
      for (const challenge of challengesData) {
        rowId++;
        parseChallenge(rowId, challenge, contextData);
      }

      isDataValid = true;
    } catch (e) {
      let message = e.message;
      if (uConst.get("LANGUAGE_VARIABLE_PREFIX") === message.substring(0, uConst.get("LANGUAGE_VARIABLE_PREFIX").length)) {
        message = uLanguage.getTranslation(message, true);
      }
      const data = e.data ?? [];

      isDataValid = false;
      warningNotification(message + ((data.length > 0) ? ': ["' + data.join('", "') + '"]' : ''), rowId);
    }
  }

  function parseChallenge(rowId, challenge, contextData) {
    const challengeType = challenge.type ?? '';
    const challengeDate = challenge.date ?? uDate.getToday();
    const challengePerson = challenge.person ?? '';
    const challengeAddition = challenge.addition ?? '';
    const challengePersonWithAddition = challengePerson + uConst.get("PERSON_ADDITION_SEPARATOR") + challengeAddition;
    const challengeChecklist = challenge[uConst.get("DATA_FIELD_CHECKLIST")] ?? {};
    const challengeNotes = challenge[uConst.get("DATA_FIELD_NOTES")] ?? {};
    const challengeStatus = getChallengeSuccessStatus(rowId);
    const challengeNumber = (contextData.lastNumbers[challengeType] ?? 0) + 1;

    const config = challengesConfig[challengeType] ?? null;
    if (config === null) {
      throw {
        message: 'lang-challenge-parse-error-missing-configuration-for-challenge-type',
        data: [challengeType]
      };
    } else if (!uDate.isValid(challengeDate)) {
      throw {
        message: 'lang-challenge-parse-error-invalid-challenge-date',
        data: [challengeDate]
      };
    } else if (!personsData[challengePerson]) {
      throw {
        message: 'lang-challenge-parse-error-invalid-person',
        data: [challengePerson]
      };
    }

    const configPersonData = config.person ?? {};
    const configPersonReqsData = configPersonData.requirements ?? {};
    const configUniqueness = config.uniqueness ?? [];
    const configChecklist = config[uConst.get("CONFIG_FIELD_CHECKLIST")] ?? {};
    const configNotes = config[uConst.get("CONFIG_FIELD_NOTES")] ?? {};

    const manyPersonsCountsContext = contextData.persons.counts[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")] ?? {};
    const specifiedPersonCountsContext = contextData.persons.counts[challengePerson] ?? {};
    const specifiedPersonAdditionCountsContext = contextData.additions.counts[challengePersonWithAddition] ?? {};
    const manyPersonsDatesContext = contextData.persons.dates[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")] ?? {};
    const specifiedPersonDatesContext = contextData.persons.dates[challengePerson] ?? {};
    const uniqs = contextData.uniqs[challengeType] ?? [];

    let isPersonGodHavingNeededChallenges = false;

    //check requirements
    for (const personReq of Object.entries(configPersonReqsData)) {
      const reqName = personReq[0] ?? '';
      const reqTypes = personReq[1] ?? [];
      let reqTypesWithDuplications = reqTypes;
      if (Array.isArray(reqTypes)) {
        reqTypesWithDuplications = getTypesArrayWithDuplications(reqTypes);
      }

      switch (reqName) {
        case uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES"):
          let neededCounts = {};
          for (const type of reqTypesWithDuplications) {
            neededCounts[type] = (neededCounts[type] ?? 0) + 1;

            const neededCount = neededCounts[type] ?? 1;
            if (!isWarningIgnoredForOldChallenges(challengeDate, type, reqName)
              && (manyPersonsCountsContext[type] ?? 0) < neededCount
            ) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-anybody-having-challenges',
                data: [neededCount + 'x' + type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_1_DAY"):
          for (const type of reqTypes) {
            if ((manyPersonsDatesContext[type] ?? null) === null
              || uDate.getDatesDiffInDays(challengeDate, manyPersonsDatesContext[type]) > 1
            ) {
              if (challengeType !== type || (manyPersonsCountsContext[type] ?? null) !== null) {
                throw {
                  message: 'lang-challenge-parse-error-for-requirement-anybody-having-challenges-in-last-1-day',
                  data: [type]
                };
              }
            }
          }
          break;

        case uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_7_DAYS"):
          for (const type of reqTypes) {
            if ((manyPersonsDatesContext[type] ?? null) === null
              || uDate.getDatesDiffInDays(challengeDate, manyPersonsDatesContext[type]) > 7
            ) {
              if (!isWarningIgnoredForOldChallenges(challengeDate, type, reqName)
                && (challengeType !== type || (manyPersonsCountsContext[type] ?? null) !== null)
              ) {
                throw {
                  message: 'lang-challenge-parse-error-for-requirement-anybody-having-challenges-in-last-7-days',
                  data: [type]
                };
              }
            }
          }
          break;

        case uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_40_DAYS"):
          for (const type of reqTypes) {
            if ((manyPersonsDatesContext[type] ?? null) === null
              || uDate.getDatesDiffInDays(challengeDate, manyPersonsDatesContext[type]) > 40
            ) {
              if (!isWarningIgnoredForOldChallenges(challengeDate, type, reqName)
                && (challengeType !== type || (manyPersonsCountsContext[type] ?? null) !== null)
              ) {
                throw {
                  message: 'lang-challenge-parse-error-for-requirement-anybody-having-challenges-in-last-40-days',
                  data: [type]
                };
              }
            }
          }
          break;

        case uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_100_DAYS"):
          for (const type of reqTypes) {
            if ((manyPersonsDatesContext[type] ?? null) === null
              || uDate.getDatesDiffInDays(challengeDate, manyPersonsDatesContext[type]) > 100
            ) {
              if (!isWarningIgnoredForOldChallenges(challengeDate, type, reqName)
                && (challengeType !== type || (manyPersonsCountsContext[type] ?? null) !== null)
              ) {
                throw {
                  message: 'lang-challenge-parse-error-for-requirement-anybody-having-challenges-in-last-100-days',
                  data: [type]
                };
              }
            }
          }
          break;

        case uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_ON_THE_SAME_DAY"):
          for (const type of reqTypes) {
            if ((manyPersonsDatesContext[type] ?? null) === null
              || uDate.getDatesDiffInDays(challengeDate, manyPersonsDatesContext[type]) !== 0
            ) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-anybody-having-challenges-on-the-same-day',
                data: [type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_EVERYBODY_NOT_HAVING_CHALLENGES"):
          let exceededCounts = {};
          for (const type of reqTypesWithDuplications) {
            exceededCounts[type] = (exceededCounts[type] ?? 0) + 1;
          }
          for (const type of reqTypesWithDuplications) {
            if ((manyPersonsCountsContext[type] ?? 0) >= (exceededCounts[type] ?? 0)) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-everybody-not-having-challenges',
                data: [exceededCounts[type] + 'x' + type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_EVERYBODY_NOT_HAVING_CHALLENGES_ON_THE_SAME_DAY"):
          for (const type of reqTypes) {
            if ((manyPersonsDatesContext[type] ?? null) === challengeDate) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-everybody-not-having-challenges-on-the-same-day',
                data: [type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_PERSON_ADDITION_HAVING_CHALLENGES"):
          for (const type of reqTypes) {
            if ((specifiedPersonAdditionCountsContext[type] ?? 0) === 0
              && challengeAddition !== ''
            ) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-person-addition-having-challenges',
                data: [type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES"):
          for (const type of reqTypes) {
            if ((specifiedPersonAdditionCountsContext[type] ?? null) !== null) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-person-addition-not-having-challenges',
                data: [type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_PERSON_ADDITION_IS_NOT_EMPTY"):
          if (challengeAddition === '') {
            throw {
              message: 'lang-challenge-parse-error-for-requirement-person-addition-is-not-empty'
            };
          }
          break;

        case uConst.get("REQUIREMENT_GOD_HAVING_NEEDED_CHALLENGES"):
          const subelements = getPersonsDataSubelements(uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL"));
          if (uUseful.inArray(challengePerson, subelements)) {
            isPersonGodHavingNeededChallenges = true;
          }
          break;

        case uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES"):
          for (const type of reqTypes) {
            if ((specifiedPersonCountsContext[type] ?? 0) === 0
              && !isPersonGodHavingNeededChallenges
            ) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-person-having-challenges',
                data: [type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_PERSON_HAVING_ANY_CHALLENGE"):
          let foundAny = false;
          for (const type of reqTypes) {
            if ((specifiedPersonCountsContext[type] ?? 0) > 0
              || isPersonGodHavingNeededChallenges
            ) {
              foundAny = true;
            }

            if (foundAny) {
              break;
            }
          }

          if (!foundAny && uUseful.inArray(uConst.get("IMMOVABLE_DATES_PATRONS_LIST_CHARACTER"), reqTypes)) {
            for (const challengeTypeToCheck of uConst.get("IMMOVABLE_DATES_TAKEN_CHALLENGES_LIST")) {
              const dateToCheck = manyPersonsDatesContext[challengeTypeToCheck] ?? null;
              if (dateToCheck == null) {
                continue;
              }

              const monthWithDay = dateToCheck.substring(5);
              if (true === ((immovableDatesPatronsData[monthWithDay] ?? {})[challengePerson] ?? false)) {
                foundAny = true;
                break;
              }

              const isDateToCheckYearLeap = uDate.isYearLeap(dateToCheck.substring(0, 4));
              const leapYearSeparator = isDateToCheckYearLeap ? uConst.get("MONTH_WITH_DAY_LEAP_YEAR_SEPARATOR") : uConst.get("MONTH_WITH_DAY_NON_LEAP_YEAR_SEPARATOR");
              if (true === ((immovableDatesPatronsData[monthWithDay.replace('-', leapYearSeparator)] ?? {})[challengePerson] ?? false)) {
                foundAny = true;
                break;
              }
            }
          }

          if (!foundAny) {
            throw {
              message: 'lang-challenge-parse-error-for-requirement-person-having-any-challenge',
              data: reqTypes
            };
          }
          break;

        case uConst.get("REQUIREMENT_PERSON_NOT_HAVING_CHALLENGES"):
          for (const type of reqTypes) {
            if ((specifiedPersonCountsContext[type] ?? null) !== null) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-person-not-having-challenges',
                data: [type]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_DAY_OF_WEEK_HAVING_WHITELIST"):
          const weekday = uDate.getWeekdayName(challengeDate);
          const allowedDaysOfWeek = reqTypes;
          if (!uUseful.inArray(weekday, allowedDaysOfWeek)) {
            let daysNames = [];
            for (const englishName of allowedDaysOfWeek) {
              daysNames.push(uLanguage.getTranslation(uConst.get("WEEKDAY_LANGUAGE_VARIABLES_PREFIX") + englishName));
            }
            throw {
              message: 'lang-challenge-parse-error-for-requirement-day-of-week-having-whitelist',
              data: daysNames
            };
          }
          break;

        case uConst.get("REQUIREMENT_MONTH_HAVING_WHITELIST"):
          const month = uDate.getMonthName(challengeDate);
          const allowedMonths = reqTypes;
          if (!uUseful.inArray(month, allowedMonths)) {
            let monthsNames = [];
            for (const englishName of allowedMonths) {
              monthsNames.push(uLanguage.getTranslation(uConst.get("MONTH_LANGUAGE_VARIABLES_PREFIX") + englishName));
            }
            throw {
              message: 'lang-challenge-parse-error-for-requirement-month-having-whitelist',
              data: monthsNames
            };
          }
          break;

        case uConst.get("REQUIREMENT_DAY_OF_MONTH_HAVING_MAXIMUM"):
          const dayOfMonth = uDate.getIntDay(challengeDate);
          const maxAllowedDayOfMonth = reqTypes;
          if (dayOfMonth > maxAllowedDayOfMonth) {
            throw {
              message: 'lang-challenge-parse-error-for-requirement-day-of-month-having-maximum',
              data: [maxAllowedDayOfMonth]
            };
          }
          break;

        case uConst.get("REQUIREMENT_CHALLENGE_DATE_IS_IN_LITURGICAL_SEASONS"):
          for (const liturgicalSeason of reqTypes) {
            if (!isChallengeDateInLiturgicalSeason(challengeDate, liturgicalSeason)) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-challenge-date-is-in-liturgical-seasons',
                data: [liturgicalSeason]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_FIRST_CHALLENGE_DATE_MUST_BE_EARLIER_THAN_DAYS_BEFORE_LITURGICAL_SEASON_END"):
          for (const liturgicalSeasonDaysDiff of reqTypes) {
            if (challengeNumber <= 1 && !isChallengeDateEarlierThanDaysBeforeLiturgicalSeasonEnd(challengeDate, liturgicalSeasonDaysDiff)) {
              throw {
                message: 'lang-challenge-parse-error-for-requirement-first-challenge-date-must-be-earlier-than-days-before-liturgical-season-end',
                data: [liturgicalSeasonDaysDiff]
              };
            }
          }
          break;

        case uConst.get("REQUIREMENT_NOTES_WITH_CHALLENGE_TYPES_HAVE_ANY_POSSIBLE_VALUE"):
          for (const noteId of reqTypes) {
            const noteTypes = configNotes[noteId].type ?? {};
            for (const noteTypeId of Object.keys(noteTypes)) {
              const noteConfigForType = notesTypesConfig[noteTypeId] ?? {};
              const noteReqs = (noteConfigForType.source ?? {})[uConst.get("NOTE_CONFIG_SOURCE_TYPE_CHALLENGE_TYPES")] ?? null;
              if (noteReqs == null) {
                continue;
              }

              let challengeTypes = getChallengeTypesWithRequirements(noteReqs, challengeDate);
              if (Object.keys(challengeTypes).length <= 0) {
                throw {
                  message: 'lang-challenge-parse-error-for-requirement-notes-with-challenge-types-have-any-possible-value',
                  data: [noteId]
                };
              }
            }
          }
          break;

        default:
          throw {
            message: 'lang-challenge-parse-error-missing-assigned-to-challenge-persons-requirement-type',
            data: [reqName]
          };
          break;
      }
    }

    //check notes quantities
    for (const itemType of Object.keys(configNotes)) {
      const noteType = configNotes[itemType].type ?? {};
      const noteName = uLanguage.getTranslation('name', true, configNotes[itemType].name ?? {});
      if (!validateNotesQuantity(challengeNotes[itemType] ?? {}, noteType)) {
        throw {
          message: 'lang-challenge-parse-error-invalid-notes-quantities',
          data: [noteName]
        };
      }
    }

    //notes with persons requirements
    for (const itemType of Object.keys(configNotes)) {
      const noteType = configNotes[itemType].type ?? {};

      let noteLevel = 0;
      for (const noteConfigType of Object.keys(noteType)) {
        noteLevel++;

        const noteConfigForType = notesTypesConfig[noteConfigType] ?? {};
        const noteReqs = (noteConfigForType.source ?? {})[uConst.get("NOTE_CONFIG_SOURCE_TYPE_PATRONS")] ?? null;
        if (noteReqs == null) {
          continue;
        }

        const noteIndex = noteConfigForType.index ?? '';
        const notesIndexValues = (fileData[uConst.get("DATA_FIELD_NOTES")] ?? {})[noteIndex] ?? {};
        const noteIds = getNotesIdsForLevel(challengeNotes[itemType] ?? [], noteLevel);
        for (const noteId of Object.keys(noteIds)) {
          const notePerson = notesIndexValues[noteId];

          for (const reqName of Object.keys(noteReqs)) {
            const reqTypes = noteReqs[reqName] ?? [];
            const noteSpecifiedPersonCountsContext = contextData.persons.counts[notePerson] ?? {};

            switch (reqName) {
              case uConst.get("REQUIREMENT_GOD_OR_ANY_PATRON"):
                break;

              case uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES"):
                for (const type of reqTypes) {

                  if (!isWarningIgnoredForOldChallenges(challengeDate, type, reqName)
                    && (noteSpecifiedPersonCountsContext[type] ?? 0) === 0
                  ) {
                    throw {
                      message: 'lang-challenge-parse-error-for-requirement-person-having-challenges',
                      data: [itemType, noteConfigType, type]
                    };
                  }
                }
                break;

              default:
                throw {
                  message: 'lang-challenge-parse-error-missing-assigned-to-challenge-persons-requirement-type',
                  data: [itemType, noteConfigType, reqName]
                };
                break;
            }
          }
        }
      }
    }

    //check if checklist steps to complete on selected date are done
    for (const stepType of Object.keys(configChecklist)) {
      const stepName = uLanguage.getTranslation('name', true, configChecklist[stepType].name ?? {});
      const toCompleteOnSelectedDate = (configChecklist[stepType] ?? {})[uConst.get("CONFIG_FIELD_TO_COMPLETE_ON_SELECTED_DATE")] ?? false;
      if (toCompleteOnSelectedDate && true !== (challengeChecklist[stepType] ?? false)) {
        throw {
          message: 'lang-challenge-parse-error-invalid-status-in-checklist-step-to-complete-on-selected-date',
          data: [stepName]
        };
      }
    }

    //for aborted challenges we would not add its data to context
    if (isChallengeStatusToSkip(challengeStatus)) {
      return;
    }

    //check duplications
    for (configUniquenessRow of configUniqueness) {
      const uniq = getUniquenessString(challenge, configUniquenessRow);
      const foundUniq = uniqs[uniq] ?? '';
      if (foundUniq !== '') {
        throw {
          message: 'lang-challenge-parse-error-uniqueness',
          data: ['#' + foundUniq + ': ' + configUniquenessRow.join(', ')]
        };
      }

      if (contextData.uniqs[challengeType] === undefined) {
        contextData.uniqs[challengeType] = {};
      }
      contextData.uniqs[challengeType][uniq] = rowId;
    }

    //add context data
    if (contextData.persons.counts[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")] === undefined) {
      contextData.persons.counts[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")] = {};
    }
    if (contextData.persons.counts[challengePerson] === undefined) {
      contextData.persons.counts[challengePerson] = {};
    }
    contextData.persons.counts[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")][challengeType] = (contextData.persons.counts[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")][challengeType] ?? 0) + 1;
    contextData.persons.counts[challengePerson][challengeType] = (contextData.persons.counts[challengePerson][challengeType] ?? 0) + 1;

    if (contextData.persons.dates[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")] === undefined) {
      contextData.persons.dates[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")] = {};
    }
    if (contextData.persons.dates[challengePerson] === undefined) {
      contextData.persons.dates[challengePerson] = {};
    }
    contextData.persons.dates[uConst.get("PARSE_CHALLENGE_MANY_PERSONS_SIGN")][challengeType] = challengeDate;
    contextData.persons.dates[challengePerson][challengeType] = challengeDate;

    if (contextData.additions.counts[challengePersonWithAddition] === undefined) {
      contextData.additions.counts[challengePersonWithAddition] = {};
    }
    contextData.additions.counts[challengePersonWithAddition][challengeType] = (contextData.additions.counts[challengePersonWithAddition][challengeType] ?? 0) + 1;

    //challenge numer
    contextData.lastNumbers[challengeType] = challengeNumber;
  }

  function getUniquenessString(challenge, uniqFields) {
    let resultArr = [];

    for (const fieldPathWithModifiers of uniqFields) {
      const modifiers = fieldPathWithModifiers.split(uConst.get("UNIQUENESS_FIELD_MODIFIER_SEPARATOR"));
      const fieldPath = modifiers.shift();

      let context = challenge;
      const fields = fieldPath.split('/');

      for (const field of fields) {
        context = context[field] ?? '';
      }

      for (const modifier of modifiers) {
        switch (modifier) {

          case 'first-7-characters-only':
            context = context.substring(0, 7);
            break;
        }
      }

      const string = JSON.stringify(context);
      resultArr.push(string);
    }

    return resultArr.join(uConst.get("UNIQUENESS_STRING_SEPARATOR"));
  }

  function setValueAsOwner(value) {
    try {
      clearNotifications();
      fileData = parseFileDataFromContent(fileContent);

      fileData[uConst.get("DATA_FIELD_OWNER")] = value;

      fileContent = JSON.stringify(fileData);
    } catch (e) {
      errorNotification(e.message);
    }
  }

  function setValueAsFilenameWithoutExtension(value) {
    try {
      clearNotifications();
      fileData = parseFileDataFromContent(fileContent);

      fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")] = value;
      fileName = value;

      fileContent = JSON.stringify(fileData);
    } catch (e) {
      errorNotification(e.message);
    }
  }

  function setValueAsAddDatetimeSuffixToFilenameWithoutExtension(checked) {
    try {
      clearNotifications();
      fileData = parseFileDataFromContent(fileContent);

      fileData[uConst.get("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION")] = checked;

      fileContent = JSON.stringify(fileData);
    } catch (e) {
      errorNotification(e.message);
    }
  }

  async function fillChallenges(challenges) {
    const list = uDocument.getElementById(uConst.get("CHALLENGES_ELEMENT_ID"));
    list.innerHTML = '';

    const content = await uFile.getFileContent(uConst.get("CHALLENGE_ITEM_TEMPLATE_FILE_PATH"));

    let allRowsData = [];
    let numbers = {};
    let counter = 0;
    let innerHtmlToSet = '';
    for (let challenge of challenges) {
      counter++;

      let rowData = {};
      rowData.rowId = counter;
      rowData.date = challenge.date ?? '';
      rowData.personUrl = (challenge.person ?? '');
      rowData.addition = challenge.addition ?? '';
      rowData.additionUrl = rowData.addition.length > 0 ? rowData.addition : '';
      rowData.type = challenge.type ?? '';
      rowData.number = '';
      rowData.notes = challenge.notes ?? [];
      rowData.steps = challenge[uConst.get("DATA_FIELD_CHECKLIST")] ?? {};

      const config = challengesConfig[rowData.type] ?? {};
      const additionType = config[uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
      if (config.numbers ?? false) {
        if (numbers[rowData.type] == undefined) {
          numbers[rowData.type] = {};
        }
        numbers[rowData.type][rowData.personUrl] = (numbers[rowData.type][rowData.personUrl] ?? 0) + 1;
        rowData.number = numbers[rowData.type][rowData.personUrl];

        const challengeStatus = getChallengeSuccessStatus(rowData.rowId);
        if (isChallengeStatusToSkip(challengeStatus)) {
          numbers[rowData.type][rowData.personUrl]--;
        }
      }
      const typeName = uLanguage.getTranslation('name', true, config.name ?? {});

      innerHtmlToSet += content
        .replace(/#row-id#/g, rowData.rowId)
        .replace(/#date#/g, getDateFormat(rowData.date))
        .replace(/#type-name#/g, typeName)
        .replace(/#type#/g, rowData.type)
        .replace(/#number#/g, rowData.number)
        .replace(/#person-url#/g, rowData.personUrl)
        .replace(/#person#/g, getPersonDataName(rowData.personUrl))
        .replace(/#addition-url#/g, rowData.additionUrl.length > 0 ? rowData.additionUrl : '')
        .replace(/#addition#/g, rowData.additionUrl.length > 0 ? getPersonDataAdditionName(rowData.personUrl, additionType, rowData.additionUrl) : '')
      ;

      allRowsData.push(rowData);
    }

    list.innerHTML = innerHtmlToSet;

    for (let rowData of allRowsData) {
      const personUrlElement = uDocument.getElementById(uConst.get("PERSON_URL_ELEMENT_ID_PREFIX") + rowData.rowId);
      const additionUrlElement = uDocument.getElementById(uConst.get("ADDITION_URL_ELEMENT_ID_PREFIX") + rowData.rowId);
      const moveChallengeUpButton = uDocument.getElementById(uConst.get("MOVE_CHALLENGE_UP_BUTTON_ELEMENT_ID_PREFIX") + rowData.rowId);
      const moveChallengeDownButton = uDocument.getElementById(uConst.get("MOVE_CHALLENGE_DOWN_BUTTON_ELEMENT_ID_PREFIX") + rowData.rowId);

      if (rowData.date !== (challenges[rowData.rowId - 2] ?? {}).date ?? '') {
        uUseful.setVisibility(moveChallengeUpButton, false);

      }
      if (rowData.date !== (challenges[rowData.rowId] ?? {}).date ?? '') {
        uUseful.setVisibility(moveChallengeDownButton, false);
      }

      drawProgressBarValue(rowData.rowId);

      if (rowData.additionUrl == '') {
        additionUrlElement.removeAttribute('href');
      }

      const successStatusIconTodo = uDocument.getElementById(uConst.get("CHALLENGE_SUCCESS_STATUS_ICON_TODO_ELEMENT_ID_PREFIX") + rowData.rowId);
      const successStatusIconAborted = uDocument.getElementById(uConst.get("CHALLENGE_SUCCESS_STATUS_ICON_ABORTED_ELEMENT_ID_PREFIX") + rowData.rowId);
      const successStatusIconWaiting = uDocument.getElementById(uConst.get("CHALLENGE_SUCCESS_STATUS_ICON_WAITING_ELEMENT_ID_PREFIX") + rowData.rowId);
      const successStatusIconWaitingWithOnlyLongTermStepsRemaining = uDocument.getElementById(uConst.get("CHALLENGE_SUCCESS_STATUS_ICON_WAITING_WITH_ONLY_LONG_TERM_STEPS_REMAINING_ELEMENT_ID_PREFIX") + rowData.rowId);
      const successStatusIconDone = uDocument.getElementById(uConst.get("CHALLENGE_SUCCESS_STATUS_ICON_DONE_ELEMENT_ID_PREFIX") + rowData.rowId);
      const successStatusIconDoneWithoutAnyOptionalSteps = uDocument.getElementById(uConst.get("CHALLENGE_SUCCESS_STATUS_ICON_DONE_WITHOUT_ANY_OPTIONAL_STEPS_ELEMENT_ID_PREFIX") + rowData.rowId);

      uUseful.setVisibility(successStatusIconTodo, false);
      uUseful.setVisibility(successStatusIconAborted, false);
      uUseful.setVisibility(successStatusIconWaiting, false);
      uUseful.setVisibility(successStatusIconWaitingWithOnlyLongTermStepsRemaining, false);
      uUseful.setVisibility(successStatusIconDone, false);
      uUseful.setVisibility(successStatusIconDoneWithoutAnyOptionalSteps, false);

      switch (getChallengeSuccessStatus(rowData.rowId)) {
        case uConst.get("CHALLENGE_SUCCESS_STATUS_DONE"):
          let foundAnyUndone = false;
          for (let stepStatus of Object.values(rowData.steps)) {
            if (stepStatus !== true) {
              foundAnyUndone = true;
            }
          }

          if (foundAnyUndone) {
            uUseful.setVisibility(successStatusIconDoneWithoutAnyOptionalSteps, true);
          } else {
            uUseful.setVisibility(successStatusIconDone, true);
          }
          break;

        case uConst.get("CHALLENGE_SUCCESS_STATUS_ABORTED"):
          uUseful.setVisibility(successStatusIconAborted, true);
          break;

        case uConst.get("CHALLENGE_SUCCESS_STATUS_WAITING"):
          let foundOnlyLongTermStepRemaining = null;
          for (let stepId of Object.keys(rowData.steps)) {
            const stepStatus = rowData.steps[stepId];
            if (foundOnlyLongTermStepRemaining !== false && stepStatus === null) {
              const stepConfig = ((challengesConfig[rowData.type] ?? {})[uConst.get("CONFIG_FIELD_CHECKLIST")] ?? {})[stepId] ?? {};
              const isRequired = stepConfig.required ?? false;
              const isLongTermStep = stepConfig[uConst.get("CONFIG_FIELD_LONG_TERM_STEP")] ?? false;
              if (isLongTermStep) {
                foundOnlyLongTermStepRemaining = true;
              } else if (isRequired) {
                foundOnlyLongTermStepRemaining = false;
              }
            }
          }

          if (foundOnlyLongTermStepRemaining === true) {
            uUseful.setVisibility(successStatusIconWaitingWithOnlyLongTermStepsRemaining, true);
          } else {
            uUseful.setVisibility(successStatusIconWaiting, true);
          }
          break;

        case uConst.get("CHALLENGE_SUCCESS_STATUS_TODO"):
        default:
          uUseful.setVisibility(successStatusIconTodo, true);
          break;
      }
    }
  }

  function getChallengeSuccessStatus(rowId) {
    let result = uConst.get("CHALLENGE_SUCCESS_STATUS_TODO");

    const challenge = (fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? {})[rowId - 1] ?? {};
    const challengeType = challenge.type ?? '';
    const checklistData = challenge[uConst.get("DATA_FIELD_CHECKLIST")] ?? {};
    const config = (challengesConfig[challengeType] ?? {})[uConst.get("CONFIG_FIELD_CHECKLIST")] ?? {};

    for (const stepId of Object.keys(checklistData)) {
      if (result === uConst.get("CHALLENGE_SUCCESS_STATUS_TODO")) {
        result = uConst.get("CHALLENGE_SUCCESS_STATUS_DONE");
      }

      const status = checklistData[stepId] ?? uConst.get("CHALLENGE_SUCCESS_STATUS_IN_DATA_WAITING");
      const isRequired = (config[stepId] ?? {}).required ?? true;

      if (status === uConst.get("CHALLENGE_SUCCESS_STATUS_IN_DATA_WAITING") && isRequired) {
        return uConst.get("CHALLENGE_SUCCESS_STATUS_WAITING");
      }

      if (status === uConst.get("CHALLENGE_SUCCESS_STATUS_IN_DATA_ABORTED")) {
        result = uConst.get("CHALLENGE_SUCCESS_STATUS_ABORTED");
      }
    }

    return result;
  }

  function isChallengeStatusToSkip(challengeStatus) {
    return challengeStatus === uConst.get("CHALLENGE_SUCCESS_STATUS_ABORTED");
  }

  function sortChallengesByDate() {
    if (fileData[uConst.get("DATA_FIELD_CHALLENGES")] == undefined) {
      fileData[uConst.get("DATA_FIELD_CHALLENGES")] = [];
    }

    fileData[uConst.get("DATA_FIELD_CHALLENGES")].sort(function(a, b) {
      return uDate.getDateParse(a.date) - uDate.getDateParse(b.date);
    });
  }

  function addNewChallengeReset() {
    clearNotifications();

    const lastSelectedChallengeType = uDocument.getElementById(uConst.get("LAST_SELECTED_CHALLENGE_TYPE_ELEMENT_ID"));
    lastSelectedChallengeType.value = '';

    sortChallengesByDate();
    resetDateInput();
  }

  function getTypesArrayWithDuplications(array) {
    let result = [];
    for (let value of array) {
      if (value.match(/^[0-9]+x[A-Z]+$/)) {
        const xPos = value.indexOf('x');
        const times = value.substring(0, xPos);
        const type = value.substring(xPos + 1);

        for (let i = 0; i < times; i++) {
          result.push(type);
        }
      } else {
        result.push(value);
      }
    }

    return result;
  }

  function isChallengeDateInLiturgicalSeason(challengeDate, liturgicalSeason) {
    const year = uDate.getIntYear(challengeDate);
    const dateRangeString = (liturgicalSeasonsData[liturgicalSeason] ?? {})[year] ?? null;

    if (dateRangeString === null) {
      return false;
    }

    const dateRangeArray = dateRangeString.split(' ');

    const dateRangeFromNumber = Number(dateRangeArray[0].replace(/-/g, ''));
    const dateRangeToNumber = Number(dateRangeArray[1].replace(/-/g, ''));
    const challengeDateNumber = Number(challengeDate.replace(/-/g, ''));

    return dateRangeFromNumber <= challengeDateNumber && dateRangeToNumber >= challengeDateNumber;
  }

  function isChallengeDateEarlierThanDaysBeforeLiturgicalSeasonEnd(challengeDate, liturgicalSeasonDaysDiff) {
    const liturgicalSeasonDaysDiffArray = liturgicalSeasonDaysDiff.split(':');

    const liturgicalSeason = liturgicalSeasonDaysDiffArray[0] ?? null;
    if (liturgicalSeason === null) {
      return false;
    }
    const daysBeforeLiturgicalSeasonEnd = Number(liturgicalSeasonDaysDiffArray[1] ?? 0);

    const year = uDate.getIntYear(challengeDate);
    const dateRangeString = (liturgicalSeasonsData[liturgicalSeason] ?? {})[year] ?? null;
    if (dateRangeString === null) {
      return false;
    }
    const dateRangeArray = dateRangeString.split(' ');

    const daysDiff = uDate.getDatesDiffInDays(dateRangeArray[1], challengeDate);

    return daysDiff > daysBeforeLiturgicalSeasonEnd;
  }

  function checkExistingChallengeTypesBeforeDate(challengeType, requirements, challenges, checkDateString, numberOfDaysBeforeCheckDate = null) {
    const checkDate = uDate.getDateParse(checkDateString);

    let types = getTypesArrayWithDuplications(requirements);
    if (types.length > 0) {
      let foundAnyChallengeWithSameTypeBefore = false;
      let rowId = 0;
      for (let ch of challenges) {
        rowId++;
        const challengeStatus = getChallengeSuccessStatus(rowId);
        if (isChallengeStatusToSkip(challengeStatus)) {
          continue;
        }

        const type = ch.type;
        const date = ch.date;

        if (uDate.getDateParse(date) > checkDate) {
          continue;
        }

        if (type === challengeType) {
          foundAnyChallengeWithSameTypeBefore = true;
        }

        if (numberOfDaysBeforeCheckDate !== null) {
          const diffInDays = uDate.getDatesDiffInDays(checkDateString, date);
          if (diffInDays > numberOfDaysBeforeCheckDate) {
            continue;
          }
        }

        if (uUseful.inArray(type, types)) {
          const foundPosition = types.indexOf(type);
          types.splice(foundPosition, 1);

          if (types.length == 0) {
            return true;
          }
        }
      }

      if (!foundAnyChallengeWithSameTypeBefore) {
        for (let type of types) {
          if (type !== challengeType) {
            return false;
          }
        }

        return true;
      }

      return false;
    }

    return true;
  }

  function checkNotExistingChallengeTypes(requirements, challenges, checkDateString) {
    const checkDate = uDate.getDateParse(checkDateString);

    let types = reqTypesWithDuplications = getTypesArrayWithDuplications(requirements);
    if (types.length > 0) {
      let exceededCounts = [];
      for (const type of types) {
        exceededCounts[type] = (exceededCounts[type] ?? 0) + 1;
      }

      let rowId = 0;
      for (let ch of challenges) {
        rowId++;
        const challengeStatus = getChallengeSuccessStatus(rowId);
        if (isChallengeStatusToSkip(challengeStatus)) {
          continue;
        }
        if (checkDate && uDate.getDateParse(ch.date) > checkDate) {
          continue;
        }

        const type = ch.type;

        if (uUseful.inArray(type, types)) {
          if (exceededCounts[type] === 1) {
            return false;
          }

          exceededCounts[type]--;
        }
      }
    }

    return true;
  }

  function checkNotExistingChallengeTypesOnTheSameDay(requirements, challenges, checkDateString) {
    const checkDate = uDate.getDateParse(checkDateString);

    let types = requirements;
    if (types.length > 0) {
      let rowId = 0;
      for (let ch of challenges) {
        rowId++;
        const challengeStatus = getChallengeSuccessStatus(rowId);
        if (isChallengeStatusToSkip(challengeStatus)) {
          continue;
        }

        const type = ch.type;
        const date = ch.date;

        if (uDate.getDateParse(date) != checkDate) {
          continue;
        }

        if (uUseful.inArray(type, types)) {
          return false;
        }
      }
    }

    return true;
  }

  function checkIfAnyPersonOrAdditionPossibleForChallengeTypeRequirements(requirements, additionType, allPersonsToTake, challengeDate) {
    const addGodToListNeeded = requirements[uConst.get("REQUIREMENT_GOD_HAVING_NEEDED_CHALLENGES")] ?? false;
    const typesNotAllowed = requirements[uConst.get("REQUIREMENT_PERSON_NOT_HAVING_CHALLENGES")] ?? [];
    const typesNeeded = requirements[uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES")] ?? null;
    const typesNeededForAny = requirements[uConst.get("REQUIREMENT_PERSON_HAVING_ANY_CHALLENGE")] ?? null;

    let personsToSkip = {};
    let personsToTake = allPersonsToTake;
    let areAllPersonsTaken = true;

    if (typesNotAllowed.length > 0) {
      personsToSkip = getPersonsHavingAnyChallenge(typesNotAllowed, challengeDate);
    }

    if (typesNeeded != null) {
      personsToTake = getPersonsHavingAllChallenges(typesNeeded, challengeDate);
      areAllPersonsTaken = false;
    }

    if (typesNeededForAny != null) {
      personsToTakeForAny = getPersonsHavingAnyChallenge(typesNeededForAny, challengeDate);
      if (areAllPersonsTaken) {
        personsToTake = personsToTakeForAny;
        areAllPersonsTaken = false;
      } else {
        for (const personId of Object.keys(personsToTake)) {
          if (personsToTakeForAny[personId] == undefined) {
            delete personsToTake[personId];
          }
        }
      }
    }

    if (addGodToListNeeded) {
      const subelements = getPersonsDataSubelements(uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL"));
      for (let subelement of subelements) {
        personsToTake[subelement] = subelement;
      }
    }

    for (const personId of Object.keys(personsToSkip)) {
      delete personsToTake[personId];
    }
    if ((typesNeeded != null || typesNeededForAny != null) && Object.keys(personsToTake).length <= 0) {
      return false;
    }

    const additionIsNotEmpty = requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_IS_NOT_EMPTY")] ?? false;
    const additionNotHavingChallenges = requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES")] ?? [];
    if (additionIsNotEmpty) {
      let additionsToSkip = getPersonsAdditionsHavingAnyChallenge(additionNotHavingChallenges, challengeDate);

      let additionsCount = 0;
      for (let personId of Object.keys(personsToTake)) {
        const additionsElements = getPersonsAdditionDataElements(personId, additionType);
        additionsCount += additionsElements.length;
      }
      if (additionsCount <= Object.keys(additionsToSkip).length) {
        return false;
      }
    }

    return true;
  }

  function checkIfChallengeDayOfWeekIsOnWhitelist(allowedDaysOfWeek, challengeDate) {
    if (allowedDaysOfWeek.length > 0) {
      const weekday = uDate.getWeekdayName(challengeDate);

      return uUseful.inArray(weekday, allowedDaysOfWeek);
    }

    return true;
  }

  function checkIfChallengeMonthIsOnWhitelist(allowedMonths, challengeDate) {
    if (allowedMonths.length > 0) {
      const month = uDate.getMonthName(challengeDate);

      return uUseful.inArray(month, allowedMonths);
    }

    return true;
  }

  function checkIfChallengeDayOfMonthIsNotGreaterThanMaximum(maximum, challengeDate) {
    if (maximum > 0) {
      const dayOfMonth = uDate.getIntDay(challengeDate);

      return dayOfMonth <= maximum;
    }

    return true;
  }

  function checkIfChallengeDateIsInLiturgicalSeasons(liturgicalSeasons, challengeDate) {
    for (const liturgicalSeason of liturgicalSeasons) {
      if (!isChallengeDateInLiturgicalSeason(challengeDate, liturgicalSeason)) {
        return false;
      }
    }

    return true;
  }

  function checkIfChallengeDateIsEarlierThanDaysBeforeLiturgicalSeasonEnd(liturgicalSeasonDaysDiffs, challengeDate) {
    for (const liturgicalSeasonDaysDiff of liturgicalSeasonDaysDiffs) {
      if (!isChallengeDateEarlierThanDaysBeforeLiturgicalSeasonEnd(challengeDate, liturgicalSeasonDaysDiff)) {
        return false;
      }
    }

    return true;
  }

  function checkIfNotesWithChallengeTypesHaveAnyPossibleValue(noteIds, challengeDate, challengeConfig) {
    for (const noteId of noteIds) {
      const noteTypes = (challengeConfig[uConst.get("CONFIG_FIELD_NOTES")] ?? {})[noteId].type ?? {};
      for (const noteTypeId of Object.keys(noteTypes)) {
        const noteConfigForType = notesTypesConfig[noteTypeId] ?? {};
        const noteReqs = (noteConfigForType.source ?? {})[uConst.get("NOTE_CONFIG_SOURCE_TYPE_CHALLENGE_TYPES")] ?? null;
        if (noteReqs == null) {
          continue;
        }

        let challengeTypes = getChallengeTypesWithRequirements(noteReqs, challengeDate);
        if (Object.keys(challengeTypes).length <= 0) {
          return false;
        }
      }
    }

    return true;
  }

  function checkBasicRequirements(challengeType, requirements, challenges, challengeDate) {
    return (
      checkExistingChallengeTypesBeforeDate(challengeType, requirements[uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES")] ?? [], challenges, challengeDate)
      && checkExistingChallengeTypesBeforeDate(challengeType, requirements[uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_1_DAY")] ?? [], challenges, challengeDate, 1)
      && checkExistingChallengeTypesBeforeDate(challengeType, requirements[uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_7_DAYS")] ?? [], challenges, challengeDate, 7)
      && checkExistingChallengeTypesBeforeDate(challengeType, requirements[uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_40_DAYS")] ?? [], challenges, challengeDate, 40)
      && checkExistingChallengeTypesBeforeDate(challengeType, requirements[uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_IN_LAST_100_DAYS")] ?? [], challenges, challengeDate, 100)
      && checkExistingChallengeTypesBeforeDate(challengeType, requirements[uConst.get("REQUIREMENT_ANYBODY_HAVING_CHALLENGES_ON_THE_SAME_DAY")] ?? [], challenges, challengeDate, 0)
      && checkNotExistingChallengeTypes(requirements[uConst.get("REQUIREMENT_EVERYBODY_NOT_HAVING_CHALLENGES")] ?? [], challenges, challengeDate)
      && checkNotExistingChallengeTypesOnTheSameDay(requirements[uConst.get("REQUIREMENT_EVERYBODY_NOT_HAVING_CHALLENGES_ON_THE_SAME_DAY")] ?? [], challenges, challengeDate)
      && checkIfChallengeDayOfWeekIsOnWhitelist(requirements[uConst.get("REQUIREMENT_DAY_OF_WEEK_HAVING_WHITELIST")] ?? [], challengeDate)
      && checkIfChallengeMonthIsOnWhitelist(requirements[uConst.get("REQUIREMENT_MONTH_HAVING_WHITELIST")] ?? [], challengeDate)
      && checkIfChallengeDayOfMonthIsNotGreaterThanMaximum(requirements[uConst.get("REQUIREMENT_DAY_OF_MONTH_HAVING_MAXIMUM")] ?? 0, challengeDate)
      && checkIfChallengeDateIsInLiturgicalSeasons(requirements[uConst.get("REQUIREMENT_CHALLENGE_DATE_IS_IN_LITURGICAL_SEASONS")] ?? [], challengeDate)
    );
  }

  function getPersonDataName(personId) {
    const data = personsData[personId] ?? [];

    return uLanguage.getTranslation(uConst.get("PERSONS_DATA_FIELD_NAMES"), true, data[uConst.get("PERSONS_DATA_FIELD_NAMES")] ?? []);
  }

  function getPersonDataAdditionName(personId, additionType, additionId) {
    const data = ((personsData[personId] ?? {})[additionType] ?? {})[additionId] ?? {};

    return uLanguage.getTranslation(uConst.get("PERSONS_DATA_FIELD_NAMES"), true, data[uConst.get("PERSONS_DATA_FIELD_NAMES")] ?? []);
  }

  function getChallengeTypeName(challengeTypeId) {
    const nameLanguagesData = (challengesConfig[challengeTypeId] ?? {}).name ?? {};
    const name = uLanguage.getTranslation('name', false, nameLanguagesData);

    return name + ' [' + challengeTypeId + ']';
  }

  function getAllPersonsDataSubelements(personIdPrefix = '') {
    return Object.keys(personsData).filter(v =>
      (personIdPrefix === '' || v.substring(0, personIdPrefix.length + 1) == personIdPrefix + '/')
      && personsData[v].died != undefined
    );
  }

  function getPersonsDataSubelements(personIdPrefix) {
    let result = personsDataSubelementsCache[personIdPrefix] ?? null;

    if (result == null) {
      result = [];

      const personIdPrefixSlashesCount = personIdPrefix.split('/').length - 1;

      const data = Object.keys(personsData);
      for (let personId of data) {
        if (personId.substring(0, personIdPrefix.length + 1) == personIdPrefix + '/'
          && personId.split('/').length - 1 === personIdPrefixSlashesCount + 1
        ) {
          result.push(personId);
        }
      }

      personsDataSubelementsCache[personIdPrefix] = result;
    }

    return result;
  }

  function getPersonsAdditionDataElements(personId, additionType) {
    let result = (personsAdditionDataElementsCache[personId] ?? {})[additionType] ?? null;

    if (result == null) {
      result = [];

      const additions = Object.keys((personsData[personId] ?? {})[additionType] ?? {});
      for (const additionId of additions) {
        const addition = personId + uConst.get("PERSON_ADDITION_SEPARATOR") + getPersonsDataBaseName(additionId);
        result.push(addition);
      }

      if (personsAdditionDataElementsCache[personId] == undefined) {
        personsAdditionDataElementsCache[personId] = {};
      }
      personsAdditionDataElementsCache[personId][additionType] = result;
    }

    return result;
  }

  function getChallengeTypeMaxNumberForDate(challengeType, checkDateString = null) {
    let result = 0;
    let rowId = 0;

    const checkDate = null ? null : uDate.getDateParse(checkDateString);

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    for (let ch of challenges) {
      rowId++;

      const challengeStatus = getChallengeSuccessStatus(rowId);
      if (isChallengeStatusToSkip(challengeStatus)) {
        continue;
      }
      if (ch.type !== challengeType) {
        continue;
      }
      if (checkDate && uDate.getDateParse(ch.date) > checkDate) {
        continue;
      }

      result++;
    }

    return result;
  }

  function getPersonsHavingAllChallenges(types, checkDateString = null) {
    let result = {};
    let withAnyType = {};
    let rowId = 0;

    const checkDate = null ? null : uDate.getDateParse(checkDateString);

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    for (let ch of challenges) {
      rowId++;
      const challengeStatus = getChallengeSuccessStatus(rowId);
      if (isChallengeStatusToSkip(challengeStatus)) {
        continue;
      }
      if (checkDate && uDate.getDateParse(ch.date) > checkDate) {
        continue;
      }

      if (uUseful.inArray(ch.type, types)) {
        if (withAnyType[ch.person] == undefined) {
          withAnyType[ch.person] = {};
        }
        withAnyType[ch.person][ch.type] = true;
      }
    }

    for (let person in withAnyType) {
      if (Object.keys(withAnyType[person]).length == types.length) {
        result[person] = person;
      }
    }

    return result;
  }

  function getPersonsAdditionsHavingAllChallenges(types, checkDateString = null) {
    let result = {};
    let withAnyType = {};
    let rowId = 0;

    const checkDate = null ? null : uDate.getDateParse(checkDateString);

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    for (let ch of challenges) {
      rowId++;
      const challengeStatus = getChallengeSuccessStatus(rowId);
      if (isChallengeStatusToSkip(challengeStatus)) {
        continue;
      }
      if (checkDate && uDate.getDateParse(ch.date) > checkDate) {
        continue;
      }

      if (uUseful.inArray(ch.type, types) && ch.addition.length > 0) {
        if (withAnyType[ch.person] == undefined) {
          withAnyType[ch.person] = {};
        }
        if (withAnyType[ch.person][ch.addition] == undefined) {
          withAnyType[ch.person][ch.addition] = {};
        }
        withAnyType[ch.person][ch.addition][ch.type] = true;
      }
    }

    for (let person in withAnyType) {
      for (let addition in withAnyType[person]) {
        if (Object.keys(withAnyType[person][addition]).length == types.length) {
          const key = person + uConst.get("PERSON_ADDITION_SEPARATOR") + getPersonsDataBaseName(addition);
          result[key] = key;
        }
      }
    }

    return result;
  }

  function getPersonsHavingAnyChallenge(types, checkDateString) {
    let result = {};
    let rowId = 0;

    const isImmovableDatesChallengeType = uUseful.inArray(uConst.get("IMMOVABLE_DATES_PATRONS_LIST_CHARACTER"), types);
    let immovableTakenDates = {};

    const checkDate = null ? null : uDate.getDateParse(checkDateString);

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    for (let ch of challenges) {
      rowId++;
      const challengeStatus = getChallengeSuccessStatus(rowId);
      if (isChallengeStatusToSkip(challengeStatus)) {
        continue;
      }
      if (checkDate && uDate.getDateParse(ch.date) > checkDate) {
        continue;
      }

      if (uUseful.inArray(ch.type, types)) {
        result[ch.person] = ch.person;
      }

      if (isImmovableDatesChallengeType && uUseful.inArray(ch.type, uConst.get("IMMOVABLE_DATES_TAKEN_CHALLENGES_LIST"))) {
        immovableTakenDates[ch.date] = true;
      }
    }

    if (isImmovableDatesChallengeType) {
      const isCheckDateYearLeap = uDate.isYearLeap(checkDateString.substring(0, 4));

      let monthWithDayList = {};
      for (const dateString of Object.keys(immovableTakenDates)) {
        const isDateYearLeap = uDate.isYearLeap(dateString.substring(0, 4));
        const monthWithDay = dateString.substring(5);
        const leapYearSeparator = isDateYearLeap ? uConst.get("MONTH_WITH_DAY_LEAP_YEAR_SEPARATOR") : uConst.get("MONTH_WITH_DAY_NON_LEAP_YEAR_SEPARATOR");

        monthWithDayList[monthWithDay] = true;
        monthWithDayList[monthWithDay.replace('-', leapYearSeparator)] = true;
      }

      for (const monthWithDay of Object.keys(monthWithDayList)) {
        for (const patronId of Object.keys(immovableDatesPatronsData[monthWithDay] ?? {})) {
          result[patronId] = patronId;
        }
      }
    }

    return result;
  }

  function getPersonsAdditionsHavingAnyChallenge(types, checkDateString) {
    let result = {};
    let rowId = 0;

    const checkDate = null ? null : uDate.getDateParse(checkDateString);

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    for (let ch of challenges) {
      rowId++;
      const challengeStatus = getChallengeSuccessStatus(rowId);
      if (isChallengeStatusToSkip(challengeStatus)) {
        continue;
      }
      if (checkDate && uDate.getDateParse(ch.date) > checkDate) {
        continue;
      }

      if (uUseful.inArray(ch.type, types) && ch.addition.length > 0) {
        const key = ch.person + uConst.get("PERSON_ADDITION_SEPARATOR") + getPersonsDataBaseName(ch.addition);
        result[key] = key;
      }
    }

    return result;
  }

  function getChallengeTypesWithRequirements(config, challengeDate) {
    let result = {};

    const namePrefix = config[uConst.get("REQUIREMENT_CHALLENGE_TYPE_NAME_PREFIX")] ?? '';

    for (const challengeTypeId in challengesConfig) {
      if (namePrefix.length > 0 && challengeTypeId.substring(0, namePrefix.length) !== namePrefix) {
        continue;
      }

      const challengeRequirements = structuredClone((challengesConfig[challengeTypeId].person ?? {}).requirements ?? {});
      const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];

      let requirements = {};
      for (const reqName of config[uConst.get("REQUIREMENT_CHALLENGE_REQUIREMENTS_TO_COPY")] ?? []) {
        const reqValues = challengeRequirements[reqName] ?? null;
        if (reqValues !== null) {
          requirements[reqName] = reqValues;
        }
      }

      for (const [srcReqName, dstReqName] of config[uConst.get("REQUIREMENT_CHALLENGE_REQUIREMENTS_TO_COPY_FROM_OTHER")] ?? []) {
        requirements[dstReqName] = requirements[dstReqName] ?? [];

        const srcReqValues = challengeRequirements[srcReqName] ?? [];
        for (const srcReqValue of srcReqValues) {
          requirements[dstReqName].push(srcReqValue);
        }
      }

      if (!checkBasicRequirements(challengeTypeId, requirements, challenges, challengeDate)) {
        continue;
      }

      result[challengeTypeId] = challengeTypeId;
    }

    return result;
  }



  function resetDateInput() {
    let dateInput = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID"));
    dateInput.value = uDate.getToday();

    let challengeTypeSelect = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID"));
    challengeTypeSelect.value = '';

    resetChallengeTypeSelect();
  }

  function resetChallengeTypeSelect() {
    const advancedMode = isAdvancedMode();

    let challengeDate = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value;

    let challengeTypeDiv = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_DIV_ELEMENT_ID"));
    uUseful.setVisibility(challengeTypeDiv, false);

    let lastSelectedChallengeType = uDocument.getElementById(uConst.get("LAST_SELECTED_CHALLENGE_TYPE_ELEMENT_ID"));
    const selectedChallengeType = lastSelectedChallengeType.value;

    let challengeTypeSelect = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID"));
    challengeTypeSelect.innerHTML = '';
    challengeTypeSelect.value = '';

    if (challengeDate.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
      && uDate.getDateParse(challengeDate) >= uDate.getDateParse(uConst.get("MIN_CHALLENGE_DATE_ALLOWED"))
      && uDate.getDateParse(challengeDate) <= uDate.getDateParse(uDate.getToday())
    ) {
      uUseful.setVisibility(challengeTypeDiv, true);
      uDocument.addOptionToSelect(challengeTypeSelect, '', uConst.get("SELECT_NAME"));

      let allPersonsToTakeByPersonType = {};
      let lastPersonType = '';
      for (let key in personsData) {
        if (key.match(/^[a-zA-Z]+$/)) {
          lastPersonType = key[0].toUpperCase() + key.slice(1);
          allPersonsToTakeByPersonType[lastPersonType] = {};
        } else if (personsData[key].died != undefined) {
          allPersonsToTakeByPersonType[lastPersonType][key] = key;
        }
      }

      const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
      let options = {};
      for (let type in challengesConfig) {
        const challengeConfig = challengesConfig[type] ?? {};
        const name = getChallengeTypeName(type);
        const requirements = challengeConfig.person.requirements ?? {};
        const additionType = challengeConfig[uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
        const isSelectable = challengeConfig[uConst.get("CONFIG_FIELD_SELECTABLE")] ?? false;
        const newChallengeNumber = getChallengeTypeMaxNumberForDate(type, challengeDate) + 1;

        let allPersonsToTakeForChallengeType = {};
        for (let personType of challengeConfig.person.types ?? []) {
          allPersonsToTakeForChallengeType = {...allPersonsToTakeForChallengeType, ...allPersonsToTakeByPersonType[personType]};
        }

        if ((!isSelectable && !advancedMode)
          || !checkBasicRequirements(type, requirements, challenges, challengeDate)
          || !checkIfAnyPersonOrAdditionPossibleForChallengeTypeRequirements(requirements, additionType, allPersonsToTakeForChallengeType, challengeDate)
          || (newChallengeNumber <= 1 && !checkIfChallengeDateIsEarlierThanDaysBeforeLiturgicalSeasonEnd(requirements[uConst.get("REQUIREMENT_FIRST_CHALLENGE_DATE_MUST_BE_EARLIER_THAN_DAYS_BEFORE_LITURGICAL_SEASON_END")] ?? [], challengeDate))
          || !checkIfNotesWithChallengeTypesHaveAnyPossibleValue(requirements[uConst.get("REQUIREMENT_NOTES_WITH_CHALLENGE_TYPES_HAVE_ANY_POSSIBLE_VALUE")] ?? [], challengeDate, challengeConfig)
        ) {
          continue;
        }

        options[type] = name;
      }

      let sorted = uSort.getSortedObject(options);

      for (const [type, name] of sorted) {
        const isSelected = (type === selectedChallengeType);
        uDocument.addOptionToSelect(challengeTypeSelect, type, name, isSelected);
      }
    }

    resetPersonTypeSelect();
  }

  function resetPersonTypeSelect() {
    let challengeDate = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value;
    let challengeType = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID")).value;

    let personDiv = uDocument.getElementById(uConst.get("PERSON_DIV_ELEMENT_ID"));
    uUseful.setVisibility(personDiv, false);

    let challengeDescDiv = uDocument.getElementById(uConst.get("CHALLENGE_DESCRIPTION_DIV_ELEMENT_ID"));
    challengeDescDiv.innerHTML = '';

    let personDescDiv = uDocument.getElementById(uConst.get("PERSON_DESCRIPTION_DIV_ELEMENT_ID"));
    personDescDiv.innerHTML = '';

    let personTypeSelect = uDocument.getElementById(uConst.get("PERSON_TYPE_SELECT_ELEMENT_ID"));
    personTypeSelect.innerHTML = '';
    uUseful.setVisibility(personTypeSelect, false);
    personTypeSelect.value = '';

    if (challengeType.length > 0) {
      uUseful.setVisibility(personDiv, true);

      const descValues = {
        ['challenge-date']: challengeDate
      };

      const lastSelectedChallengeType = uDocument.getElementById(uConst.get("LAST_SELECTED_CHALLENGE_TYPE_ELEMENT_ID"));
      lastSelectedChallengeType.value = challengeType;

      const challengeDescData = challengesConfig[challengeType].description ?? {};
      const challengeDescFilePath = uLanguage.getTranslation('description', false, challengeDescData.template ?? {});
      const challengeDescParams = challengeDescData.params ?? [];
      importMarkdownDescription(challengeDescDiv, challengeDescFilePath, challengeDescParams, descValues);

      const personDescData = (challengesConfig[challengeType].person ?? {}).description ?? {};
      const personDescFilePath = uLanguage.getTranslation('description', false, personDescData.template ?? {});
      const personDescParams = personDescData.params ?? [];
      importMarkdownDescription(personDescDiv, personDescFilePath, personDescParams, descValues);

      const addGodToListNeeded = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_GOD_HAVING_NEEDED_CHALLENGES")] ?? false;
      let personsUnlocked = {};

      let personsTypesToList = {};
      const typesNeeded = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES")] ?? null;
      if (typesNeeded != null) {
        personsUnlocked = getPersonsHavingAllChallenges(typesNeeded, challengeDate);

        for (let personId of Object.keys(personsUnlocked)) {
          const personType = getPersonsDataRootName(personId);
          personsTypesToList[personType] = personType;
        }
      }

      let personsTypesToListForAny = {};
      let personsUnlockedForAny = {};
      const typesNeededForAny = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_HAVING_ANY_CHALLENGE")] ?? null;
      if (typesNeededForAny != null) {
        personsUnlockedForAny = getPersonsHavingAnyChallenge(typesNeededForAny, challengeDate);

        for (let personId of Object.keys(personsUnlockedForAny)) {
          const personType = getPersonsDataRootName(personId);
          personsTypesToListForAny[personType] = personType;
          personsUnlocked[personId] = personId;
        }
      }

      if ((typesNeeded != null || typesNeededForAny != null) && addGodToListNeeded) {
        personsTypesToList[uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL")] = uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL");
        personsTypesToListForAny[uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL")] = uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL");

        const subelements = getPersonsDataSubelements(uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL"));
        for (let subelement of subelements) {
          personsUnlocked[subelement] = subelement;
        }
      }

      const typesNotAllowed = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_NOT_HAVING_CHALLENGES")] ?? [];
      let personsTypesToSkipCounts = {};
      if (typesNotAllowed.length > 0) {
        const personsToSkip = getPersonsHavingAnyChallenge(typesNotAllowed, challengeDate);

        for (let personId of Object.keys(personsToSkip)) {
          const personTypeId = getPersonsDataRootName(personId);
          personsTypesToSkipCounts[personTypeId] = (personsTypesToSkipCounts[personTypeId] ?? 0) + 1;
        }
      }

      const additionType = challengesConfig[challengeType][uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
      const additionIsNotEmpty = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_IS_NOT_EMPTY")] ?? false;
      const additionNotHavingChallenges = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES")] ?? [];

      let personsTypesWithAdditionsToSkipCounts = {};
      if (additionIsNotEmpty) {
        let additionsToSkip = getPersonsAdditionsHavingAnyChallenge(additionNotHavingChallenges, challengeDate);
        for (let additionId of Object.keys(additionsToSkip)) {
          const personTypeId = getPersonsDataRootName(additionId);
          personsTypesWithAdditionsToSkipCounts[personTypeId] = (personsTypesWithAdditionsToSkipCounts[personTypeId] ?? 0) + 1;
        }
      }

      const personTypes = challengesConfig[challengeType].person.types ?? [];
      if (personTypes.length > 0) {
        uUseful.setVisibility(personTypeSelect, true);

        let types = {};
        for (let personType of personTypes) {
          const personTypeId = personType.toLowerCase();

          if (typesNeeded != null && !personsTypesToList[personTypeId]) {
            continue;
          }

          if (typesNeededForAny != null && !personsTypesToListForAny[personTypeId]) {
            continue;
          }

          if (personsTypesToSkipCounts[personTypeId] != undefined) {
            let allPersonsWithPersonTypeIdCount = [];
            if (typesNeeded == null && typesNeededForAny == null) {
              allPersonsWithPersonTypeIdCount = Object.keys(personsData).filter(v =>
                v.substring(0, personTypeId.length + 1) == personTypeId + '/'
                && personsData[v].died != undefined
              ).length;
            } else {
              allPersonsWithPersonTypeIdCount = Object.keys(personsData).filter(v =>
                v.substring(0, personTypeId.length + 1) == personTypeId + '/'
                && personsData[v].died != undefined
                && personsUnlocked[v] != undefined
              ).length;
            }

            if (allPersonsWithPersonTypeIdCount <= personsTypesToSkipCounts[personTypeId]) {
              continue;
            }
          }

          if (additionIsNotEmpty) {
            let personsToCountAdditions = [];
            if (Object.keys(personsUnlocked).length == 0) {
              personsToCountAdditions = Object.keys(personsData)
                .filter(v => v.substring(0, personTypeId.length + 1) == personTypeId + '/')
              ;
            } else {
              personsToCountAdditions = Object.keys(personsData)
                .filter(v => v.substring(0, personTypeId.length + 1) == personTypeId + '/'
                  && personsUnlocked[v] != undefined
                )
              ;
            }

            let allPersonsAdditionsWithPersonTypeIdCount = 0;
            for (const personId of personsToCountAdditions) {
              allPersonsAdditionsWithPersonTypeIdCount += Object.keys(personsData[personId][additionType] ?? {}).length;
            }

            if (allPersonsAdditionsWithPersonTypeIdCount <= (personsTypesWithAdditionsToSkipCounts[personTypeId] ?? 0)) {
              continue;
            }
          }

          types[personTypeId] = getPersonDataName(personTypeId);
        }

        if (Object.keys(types).length > 1) {
          uDocument.addOptionToSelect(personTypeSelect, '', uConst.get("SELECT_NAME"));
        }
        for (let i in types) {
          uDocument.addOptionToSelect(personTypeSelect, i, types[i]);
        }
      }
    }

    resetPersonSelect();
  }

  async function resetPersonSelect() {
    let challengeDate = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value;
    let challengeType = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID")).value;
    let personTypeValue = uDocument.getElementById(uConst.get("PERSON_TYPE_SELECT_ELEMENT_ID")).value;

    let personSelect = uDocument.getElementById(uConst.get("PERSON_SELECT_ELEMENT_ID"));
    personSelect.innerHTML = '';
    uUseful.setVisibility(personSelect, false);
    personSelect.value = '';

    let personsToSort = {};

    if (uUseful.inArray(personTypeValue, uConst.get("COPY_PERSON_TYPE_TO_NAME_IDS"))) {
      personsToSort[personTypeValue] = personTypeValue;
    } else if (personTypeValue.length > 0) {
      uUseful.setVisibility(personSelect, true);

      const addGodToListNeeded = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_GOD_HAVING_NEEDED_CHALLENGES")] ?? false;

      const typesNeeded = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES")] ?? null;
      let personsToList = {};
      if (typesNeeded != null) {
        personsToList = getPersonsHavingAllChallenges(typesNeeded, challengeDate);

        if (addGodToListNeeded) {
          const subelements = getPersonsDataSubelements(uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL"));
          for (let subelement of subelements) {
            personsToList[subelement] = subelement;
          }
        }
      }

      const typesNeededForAny = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_HAVING_ANY_CHALLENGE")] ?? null;
      let personsToListForAny = {};
      if (typesNeededForAny != null) {
        personsToListForAny = getPersonsHavingAnyChallenge(typesNeededForAny, challengeDate);

        if (addGodToListNeeded) {
          const subelements = getPersonsDataSubelements(uConst.get("GOD_HAVING_NEEDED_CHALLENGES_PERSON_NAME_URL"));
          for (let subelement of subelements) {
            personsToListForAny[subelement] = subelement;
          }
        }
      }

      const typesNotAllowed = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_NOT_HAVING_CHALLENGES")] ?? [];
      const personsToSkip = getPersonsHavingAnyChallenge(typesNotAllowed, challengeDate);

      const additionType = challengesConfig[challengeType][uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
      const additionIsNotEmpty = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_IS_NOT_EMPTY")] ?? false;
      const additionNotHavingChallenges = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES")] ?? [];

      let personsWithAdditionsToSkipCounts = {};
      if (additionIsNotEmpty) {
        let additionsToSkip = getPersonsAdditionsHavingAnyChallenge(additionNotHavingChallenges, challengeDate);
        for (let additionId of Object.keys(additionsToSkip)) {
          const personId = getPersonsDataDirName(additionId);
          personsWithAdditionsToSkipCounts[personId] = (personsWithAdditionsToSkipCounts[personId] ?? 0) + 1;
        }
      }

      const subelements = getAllPersonsDataSubelements(personTypeValue);
      for (let subelement of subelements) {
        if (typesNeeded != null && !personsToList[subelement]) {
          continue;
        }

        if (typesNeededForAny != null && !personsToListForAny[subelement]) {
          continue;
        }

        if (personsToSkip[subelement]) {
          continue;
        }

        if (additionIsNotEmpty) {
          const additionsSubelements = getPersonsAdditionDataElements(subelement, additionType);
          if (additionsSubelements.length <= (personsWithAdditionsToSkipCounts[subelement] ?? 0)) {
            continue;
          }
        }

        personsToSort[subelement] = getPersonDataName(subelement);
      }
    }

    let persons = uSort.getSortedObject(personsToSort);
    if (persons.length > 1) {
      uDocument.addOptionToSelect(personSelect, '', uConst.get("SELECT_NAME"));
    }
    for (let [i, personName] of persons) {
      uDocument.addOptionToSelect(personSelect, i, personName);
    }

    resetAdditionSelect();
  }

  function resetAdditionSelect() {
    let challengeDate = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value;
    let challengeType = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID")).value;
    let personValue = uDocument.getElementById(uConst.get("PERSON_SELECT_ELEMENT_ID")).value;

    let additionSelect = uDocument.getElementById(uConst.get("ADDITION_SELECT_ELEMENT_ID"));
    additionSelect.innerHTML = '';
    uUseful.setVisibility(additionSelect, false);
    additionSelect.value = '';

    if (personValue.length > 0) {
      const additionType = challengesConfig[challengeType][uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
      const additionIsNotEmpty = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_IS_NOT_EMPTY")] ?? false;
      const additionHavingChallenges = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_HAVING_CHALLENGES")] ?? [];
      const additionNotHavingChallenges = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES")] ?? [];

      let namesToSort = {};
      if (additionIsNotEmpty || additionHavingChallenges.length > 0 || additionNotHavingChallenges.length > 0) {
        uUseful.setVisibility(additionSelect, true);

        const typesNeeded = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_HAVING_CHALLENGES")] ?? null;
        let additionsToList = {};
        if (typesNeeded != null) {
          additionsToList = getPersonsAdditionsHavingAllChallenges(typesNeeded, challengeDate);
        }

        const typesNotAllowed = challengesConfig[challengeType].person.requirements[uConst.get("REQUIREMENT_PERSON_ADDITION_NOT_HAVING_CHALLENGES")] ?? [];
        const additionsToSkip = getPersonsAdditionsHavingAnyChallenge(typesNotAllowed, challengeDate);

        const subelements = getPersonsAdditionDataElements(personValue, additionType);
        for (let subelement of subelements) {
          if (typesNeeded != null && !additionsToList[subelement]) {
            continue;
          }

          if (additionsToSkip[subelement]) {
            continue;
          }

          const additionUrl = additionType + '/' + getPersonsDataBaseName(subelement);
          namesToSort[additionUrl] = getPersonDataAdditionName(personValue, additionType, additionUrl);
        }
      }

      const sortedNames = uSort.getSortedObject(namesToSort);
      let additions = {};
      for (let additionData of sortedNames) {
        const key = additionData[0];
        const value = additionData[1];

        additions[key] = value;
      }

      const additionsCount = Object.keys(additions).length;
      if (additionsCount > 1) {
        uDocument.addOptionToSelect(additionSelect, '', uConst.get("SELECT_NAME"));
      }
      if (!additionIsNotEmpty) {
        uDocument.addOptionToSelect(additionSelect, personValue, uLanguage.getTranslation(uConst.get("SELECTED_PERSON_IN_GENERAL_LANGUAGE_VARIABLE_NAME")));

        if (additionsCount == 0) {
          uUseful.setVisibility(additionSelect, false);
        }
      }
      for (let i in additions) {
        uDocument.addOptionToSelect(additionSelect, i, additions[i]);
      }

      resetNewChallengeNotesValues();
    }

    resetRequiredNotes();
  }

  async function resetRequiredNotes() {
    const challengeType = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID")).value;
    const additionValue = uDocument.getElementById(uConst.get("ADDITION_SELECT_ELEMENT_ID")).value;

    let requiredNotesDiv = uDocument.getElementById(uConst.get("REQUIRED_NOTES_DIV_ELEMENT_ID"));
    uUseful.setVisibility(requiredNotesDiv, false);

    let requiredNotesDoneInput = uDocument.getElementById(uConst.get("REQUIRED_NOTES_DONE_INPUT_ELEMENT_ID"));
    requiredNotesDoneInput.value = '';

    if (additionValue.length > 0) {
      lastEditedNoteItem = [];
      lastFormModeNoteCellElementIdSuffix = {};

      const notesListElement = uDocument.getElementById(uConst.get("NOTES_LIST_FOR_ADD_NEW_CHALLENGE_ELEMENT_ID"));
      notesListElement.innerHTML = '';
      const notesListEditElement = uDocument.getElementById(uConst.get("NOTES_LIST_ELEMENT_ID"));
      notesListEditElement.innerHTML = '';

      let isNextStepAvailable = true;
      const rowId = uConst.get("EMPTY_ROW_ID");
      const challengeConfig = ((challengesConfig[challengeType] ?? {})[uConst.get("CONFIG_FIELD_NOTES")] ?? {});

      for (const itemType of Object.keys(challengeConfig)) {
        const noteType = challengeConfig[itemType].type ?? {};
        const firstSubtypeQuantity = Object.values(noteType)[0] ?? [];

        if ((firstSubtypeQuantity[0] ?? 0) > 0) {
          uUseful.setVisibility(requiredNotesDiv, true);

          if (newChallengeNotesValues[itemType] == undefined) {
            newChallengeNotesValues[itemType] = [];
          }
          await drawNoteRow(notesListElement, rowId, challengeType, itemType);

          if (!validateNotesQuantity(newChallengeNotesValues[itemType], noteType)) {
            isNextStepAvailable = false;
          }
        }
      }

      requiredNotesDoneInput.value = isNextStepAvailable ? '1' : '';
      resetNewChallengeChecklistValues();
    }

    resetRequiredChecklistSteps();
  }

  async function resetRequiredChecklistSteps() {
    const challengeType = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID")).value;
    const requiredNotesDone = uDocument.getElementById(uConst.get("REQUIRED_NOTES_DONE_INPUT_ELEMENT_ID")).value;

    let requiredChecklistStepsDiv = uDocument.getElementById(uConst.get("REQUIRED_CHECKLIST_STEPS_DIV_ELEMENT_ID"));
    uUseful.setVisibility(requiredChecklistStepsDiv, false);

    let requiredChecklistStepsDoneInput = uDocument.getElementById(uConst.get("REQUIRED_CHECKLIST_STEPS_DONE_INPUT_ELEMENT_ID"));
    requiredChecklistStepsDoneInput.value = '';

    let requiredChecklistStepsInfo = uDocument.getElementById(uConst.get("REQUIRED_CHECKLIST_STEPS_INFO_ELEMENT_ID"));
    uUseful.setVisibility(requiredChecklistStepsInfo, false);

    if (requiredNotesDone.length > 0) {
      let checklistStepsList = uDocument.getElementById(uConst.get("REQUIRED_CHECKLIST_STEPS_LIST_ELEMENT_ID"));
      checklistStepsList.innerHTML = '';

      const rowId = 0;
      const checklist = (challengesConfig[challengeType] ?? {})[uConst.get("CONFIG_FIELD_CHECKLIST")] ?? {};

      let isAnyValue = false;
      let allValuesAreDone = true;
      for (let data of Object.entries(checklist)) {
        const itemType = data[0] ?? null;
        const toCompleteOnSelectedDate = (data[1] ?? {})[uConst.get("CONFIG_FIELD_TO_COMPLETE_ON_SELECTED_DATE")] ?? false;

        if (toCompleteOnSelectedDate) {
          isAnyValue = true;

          const value = getNewChallengeChecklistValue(itemType);
          const backToAddNewChallengeModal = true;
          await drawChecklistRow(checklistStepsList, rowId, challengeType, itemType, value, backToAddNewChallengeModal);

          if (value !== true) {
            allValuesAreDone = false;
          }

          uUseful.setVisibility(requiredChecklistStepsInfo, true);
        }
      }

      if (allValuesAreDone) {
        requiredChecklistStepsDoneInput.value = '1';
      }
      if (isAnyValue) {
        uUseful.setVisibility(requiredChecklistStepsDiv, true);
      }
    }

    resetAddNewChallengeButton();
  }

  function resetAddNewChallengeButton() {
    const requiredChecklistStepsDone = uDocument.getElementById(uConst.get("REQUIRED_CHECKLIST_STEPS_DONE_INPUT_ELEMENT_ID")).value;

    let button = uDocument.getElementById(uConst.get("ADD_NEW_CHALLENGE_BUTTON_ELEMENT_ID"));
    button.disabled = !(requiredChecklistStepsDone.length > 0);
  }

  async function addNewChallenge() {
    const additionValue = uDocument.getElementById(uConst.get("ADDITION_SELECT_ELEMENT_ID")).value;

    const date = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value;
    const type = uDocument.getElementById(uConst.get("CHALLENGE_TYPE_SELECT_ELEMENT_ID")).value;
    const person = uDocument.getElementById(uConst.get("PERSON_SELECT_ELEMENT_ID")).value;
    const addition = additionValue !== person ? additionValue : '';
    const checklist = newChallengeChecklistValues;
    const notes = newChallengeNotesValues;

    resetNewChallengeChecklistValues();
    resetNewChallengeNotesValues();

    if (fileData[uConst.get("DATA_FIELD_CHALLENGES")] == undefined) {
      fileData[uConst.get("DATA_FIELD_CHALLENGES")] = [];
    }

    const record = {
      date: date,
      person: person,
      type: type,
      addition: addition,
      checklist: checklist,
      notes: notes
    };
    fileData[uConst.get("DATA_FIELD_CHALLENGES")].push(record);

    await reloadChallengesTab();

    let gotoRowId = fileData[uConst.get("DATA_FIELD_CHALLENGES")].length;
    const challengeDate = uDate.getDateParse(date);
    let rowId = 0;
    for (const challenge of fileData[uConst.get("DATA_FIELD_CHALLENGES")]) {
      if (uDate.getDateParse(challenge.date) > challengeDate) {
        gotoRowId = rowId;
        break;
      }
      rowId++;
    }
    successNotification(uLanguage.getTranslation('lang-new-challenge-created-successfully', true), gotoRowId);
    gotoChallenge(gotoRowId);
  }

  function getRecalculatedNotesData(srcData, noteTypes, usedNoteIdsByIndexes) {
    let dstData = [];

    const noteType = noteTypes.shift() ?? '';
    const noteIndex = (notesTypesConfig[noteType] ?? {}).index ?? '';

    if (noteIndex.length === 0) {
      return [];
    }

    for (const rowObject of srcData) {
      const noteId = Number(Object.keys(rowObject)[0] ?? uConst.get("EMPTY_NOTE_ID"));
      if (noteId !== uConst.get("EMPTY_NOTE_ID")) {
        const subNotesData = getRecalculatedNotesData(rowObject[noteId] ?? [], [...noteTypes], usedNoteIdsByIndexes);

        dstData.push({ [noteId]: subNotesData });
        if (noteIndex.length > 0) {
          if (usedNoteIdsByIndexes[noteIndex] === undefined) {
            usedNoteIdsByIndexes[noteIndex] = {};
          }
          usedNoteIdsByIndexes[noteIndex][noteId] = true;
        }
      }
    }

    return dstData;
  }

  function recalculateFileData() {
    let usedNoteIdsByIndexes = {};
    let challenges = [];
    for (let ch of fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? []) {
      let oldChecklist = structuredClone(ch.checklist);
      let checklist = {};
      for (let i in challengesConfig[ch.type].checklist ?? {}) {
        checklist[i] = ch.checklist[i] ?? null;
        delete oldChecklist[i];
      }
      for (let i in oldChecklist) {
        checklist[i] = oldChecklist[i];
      }

      let notes = {};
      const challengesConfigNotes = challengesConfig[ch.type].notes ?? {};
      for (let i in challengesConfigNotes) {
        const noteTypes = Object.keys((challengesConfigNotes[i] ?? {}).type ?? {});
        const notesData = getRecalculatedNotesData(ch.notes[i] ?? [], noteTypes, usedNoteIdsByIndexes);

        notes[i] = notesData;
      }

      challenges.push({
        date: ch.date ?? '',
        person: ch.person ?? '',
        type: ch.type ?? '',
        addition: ch.addition ?? '',
        checklist: checklist,
        notes: notes
      });
    }

    let notes = {};
    const notesData = fileData[uConst.get("DATA_FIELD_NOTES")] ?? {};
    for (let noteIndex of Object.keys(notesData)) {
      notes[noteIndex] = {};
      for (let noteId of Object.keys(notesData[noteIndex])) {
        if (noteId.toString() === uConst.get("EMPTY_NOTE_ID").toString()) {
          continue;
        }
        if (!((usedNoteIdsByIndexes[noteIndex] ?? {})[noteId] ?? false)
          && Object.keys(newChallengeNotesValues).length === 0
        ) {
          continue;
        }

        noteValue = notesData[noteIndex][noteId];
        if ((noteValue ?? '').length === 0) {
          continue;
        }

        notes[noteIndex][noteId] = noteValue;
      }
    }

    fileData = {
      [uConst.get("DATA_FIELD_OWNER")]: fileData[uConst.get("DATA_FIELD_OWNER")] ?? '',
      [uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")]: fileData[uConst.get("DATA_FIELD_FILENAME_WITHOUT_EXTENSION")] ?? '',
      [uConst.get("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION")]: fileData[uConst.get("DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION")] ?? uConst.get("DEFAULT_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION_VALUE"),
      [uConst.get("DATA_FIELD_CHALLENGES")]: challenges,
      [uConst.get("DATA_FIELD_NOTES")]: notes,
    };
  }



  function drawProgressBarValue(rowId) {
    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    const rowData = challenges[rowId - 1] ?? {};
    const stepsConfig = challengesConfig[rowData.type][uConst.get("CONFIG_FIELD_CHECKLIST")] ?? [];
    const totalCount = Object.keys(stepsConfig).length;

    let doneCount = 0;
    let optionalCount = 0;
    let abortedCount = 0;
    let waitingCount = 0;
    for (let stepId in stepsConfig) {
      switch (rowData[uConst.get("DATA_FIELD_CHECKLIST")][stepId] ?? null) {
        case null:
          if (false == (stepsConfig[stepId].required ?? true)) {
            optionalCount++;
          } else {
            waitingCount++;
          }
          break;
        case true:
          doneCount++;
          break;
        case false:
          abortedCount++;
          break;
        default:
          waitingCount++;
          break;
      }
    }

    let donePercent = Math.floor(doneCount * 100 / totalCount);
    let optionalPercent = Math.floor(optionalCount * 100 / totalCount);
    let abortedPercent = Math.floor(abortedCount * 100 / totalCount);
    let waitingPercent = Math.floor(waitingCount * 100 / totalCount);

    let missingPercent = 100 - donePercent - optionalPercent - abortedPercent - waitingPercent;
    if (missingPercent > 0 && waitingCount > 0) {
      waitingPercent += missingPercent;
    } else if (missingPercent > 0 && abortedCount > 0) {
      abortedPercent += missingPercent;
    } else if (missingPercent > 0 && optionalCount > 0) {
      optionalPercent += missingPercent;
    } else if (missingPercent > 0 && doneCount > 0) {
      donePercent += missingPercent;
    }

    let doneProgress = uDocument.getElementById(uConst.get("PROGRESS_DONE_ELEMENT_ID_PREFIX") + rowId);
    let optionalProgress = uDocument.getElementById(uConst.get("PROGRESS_OPTIONAL_ELEMENT_ID_PREFIX") + rowId);
    let abortedProgress = uDocument.getElementById(uConst.get("PROGRESS_ABORTED_ELEMENT_ID_PREFIX") + rowId);

    setProgressBarPartValues(doneProgress, doneCount, donePercent, totalCount);
    setProgressBarPartValues(optionalProgress, optionalCount, optionalPercent, totalCount);
    setProgressBarPartValues(abortedProgress, abortedCount, abortedPercent, totalCount);
  }

  function setProgressBarPartValues(element, count, percent, totalCount) {
    element.setAttribute('style', 'width: ' + percent + '%');
    element.setAttribute('aria-valuenow', percent);
    element.innerHTML = count > 0 ? count + '/' + totalCount : '';
  }

  async function checklistListReset(rowId) {
    clearNotifications();

    let modalBody = uDocument.getElementById(uConst.get("CHECKLIST_LIST_MODAL_BODY_ELEMENT_ID"));
    modalBody.innerHTML = '';

    let challengeType = ((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {}).type ?? null;
    let checklist = ((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {})[uConst.get("DATA_FIELD_CHECKLIST")] ?? [];

    if (Object.keys(checklist).length == 0 || challengeType == null) {
      modalBody.innerHTML = uLanguage.getTranslation('lang-checklist-is-empty', true);

      return;
    }

    for (let data of Object.entries(checklist)) {
      const backToAddNewChallengeModal = false;
      await drawChecklistRow(modalBody, rowId, challengeType, data[0] ?? null, data[1] ?? null, backToAddNewChallengeModal);
    }

    await notesReset(rowId);
  }

  async function drawChecklistRow(contentElement, rowId, challengeType, itemType, value, backToAddNewChallengeModal) {
    const element = uDocument.createElement('div');

    const config = ((challengesConfig[challengeType] ?? [])[uConst.get("CONFIG_FIELD_CHECKLIST")] ?? [])[itemType] ?? {};
    if (Object.keys(config).length == 0) {
      return;
    }
    const required = config.required ?? true;
    const name = uLanguage.getTranslation('name', true, config.name ?? {});

    let status = null;
    switch (value) {
      case true:
        status = uConst.get("CHECKLIST_STATUS_DONE");
        break;
      case false:
        status = uConst.get("CHECKLIST_STATUS_ABORTED");
        break;
      case null:
      default:
        status = required ? uConst.get("CHECKLIST_STATUS_WAITING") : uConst.get("CHECKLIST_STATUS_OPTIONAL_WAITING");
        break;
    }
    const statusColor = uConst.get("CHECKLIST_STATUSES")[status].color;
    const statusName = uLanguage.getTranslation(uConst.get("CHECKLIST_STATUSES")[status].variable);

    const content = await uFile.getFileContent(uConst.get("CHECKLIST_ITEM_TEMPLATE_FILE_PATH"));
    element.innerHTML = content
      .replace(/#type#/g, itemType)
      .replace(/#name#/g, name)
      .replace(/#status-color#/g, statusColor)
      .replace(/#status-name#/g, statusName)
      .replace(/#row-id#/g, rowId)
      .replace(/#challenge-type#/g, challengeType)
      .replace(/#checklist-status#/g, value == null ? 'null' : value.toString())
      .replace(/#back-to-add-new-challenge-modal#/g, backToAddNewChallengeModal.toString())
    ;

    contentElement.append(element);
  }

  async function drawChecklistInfo(challengeType, rowId, itemType, itemStatus, backToAddNewChallengeModal) {
    const descElement = uDocument.getElementById(uConst.get("CHECKLIST_ITEM_DESCRIPTION_ELEMENT_ID"));
    const labelElement = uDocument.getElementById(uConst.get("CHECKLIST_ITEM_MODAL_TOGGLE_LABEL_ELEMENT_ID"));
    const rowIdElement = uDocument.getElementById(uConst.get("CHECKLIST_ITEM_MODAL_ROW_ID_ELEMENT_ID"));
    const itemTypeElement = uDocument.getElementById(uConst.get("CHECKLIST_ITEM_MODAL_ITEM_TYPE_ELEMENT_ID"));

    rowIdElement.value = rowId;
    itemTypeElement.value = itemType;

    const closeButton = uDocument.getElementById(uConst.get("CHECKLIST_BUTTON_CLOSE_ELEMENT_ID"));
    const abortedButton = uDocument.getElementById(uConst.get("CHECKLIST_BUTTON_ABORTED_ELEMENT_ID"));
    const optionalWaitingButton = uDocument.getElementById(uConst.get("CHECKLIST_BUTTON_OPTIONAL_WAITING_ELEMENT_ID"));
    const waitingButton = uDocument.getElementById(uConst.get("CHECKLIST_BUTTON_WAITING_ELEMENT_ID"));
    const doneButton = uDocument.getElementById(uConst.get("CHECKLIST_BUTTON_DONE_ELEMENT_ID"));

    uUseful.setVisibility(abortedButton, false);
    uUseful.setVisibility(optionalWaitingButton, false);
    uUseful.setVisibility(waitingButton, false);
    uUseful.setVisibility(doneButton, false);

    const modalTargetAttributeToSet = backToAddNewChallengeModal
      ? uConst.get("CHECKLIST_ITEM_BACK_TO_ADD_NEW_CHALLENGE_MODAL_TARGET")
      : uConst.get("CHECKLIST_ITEM_BACK_TO_CHECKLIST_LIST_MODAL_TARGET")
    ;
    closeButton.setAttribute(uConst.get("CHECKLIST_ITEM_TARGET_ATTRIBUTE_NAME"), modalTargetAttributeToSet);
    abortedButton.setAttribute(uConst.get("CHECKLIST_ITEM_TARGET_ATTRIBUTE_NAME"), modalTargetAttributeToSet);
    optionalWaitingButton.setAttribute(uConst.get("CHECKLIST_ITEM_TARGET_ATTRIBUTE_NAME"), modalTargetAttributeToSet);
    waitingButton.setAttribute(uConst.get("CHECKLIST_ITEM_TARGET_ATTRIBUTE_NAME"), modalTargetAttributeToSet);
    doneButton.setAttribute(uConst.get("CHECKLIST_ITEM_TARGET_ATTRIBUTE_NAME"), modalTargetAttributeToSet);

    const challengeConfig = challengesConfig[challengeType] ?? {};
    const additionType = challengeConfig[uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
    const config = (challengeConfig[uConst.get("CONFIG_FIELD_CHECKLIST")] ?? [])[itemType] ?? [];
    if (Object.keys(config).length == 0) {
      return;
    }
    const toCompleteOnSelectedDate = config[uConst.get("CONFIG_FIELD_TO_COMPLETE_ON_SELECTED_DATE")] ?? false;
    const required = config.required ?? true;
    const name = uLanguage.getTranslation('name', true, config.name ?? {});

    const rowData = (fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {};
    const personId = rowData.person ?? uDocument.getElementById(uConst.get("PERSON_SELECT_ELEMENT_ID")).value;
    const additionId = rowData.addition ?? uDocument.getElementById(uConst.get("ADDITION_SELECT_ELEMENT_ID")).value;
    const personName = getPersonDataName(personId)
    const additionName = getPersonDataAdditionName(personId, additionType, additionId);

    const descData = config.description ?? {};
    const descFilePath = uLanguage.getTranslation('description', false, descData.template ?? {});
    const descParams = descData.params ?? [];
    const descValues = {
      ['row-id']: rowId,
      ['person-name']: personName,
      ['addition-name']: additionName,
    };

    labelElement.innerHTML = name;
    importMarkdownDescription(descElement, descFilePath, descParams, descValues);

    uUseful.setVisibility(doneButton, true);
    if (!toCompleteOnSelectedDate) {
      if (required) {
        uUseful.setVisibility(waitingButton, true);
      } else {
        uUseful.setVisibility(optionalWaitingButton, true);
      }
      uUseful.setVisibility(abortedButton, true);
    }
  }

  async function setChecklistStatus(newValue) {
    const rowIdElement = uDocument.getElementById(uConst.get("CHECKLIST_ITEM_MODAL_ROW_ID_ELEMENT_ID"));
    const itemTypeElement = uDocument.getElementById(uConst.get("CHECKLIST_ITEM_MODAL_ITEM_TYPE_ELEMENT_ID"));

    const rowId = rowIdElement.value ?? 0;
    const itemType = itemTypeElement.value ?? '';

    if (rowId > uConst.get("EMPTY_ROW_ID")) {
      const oldValues = ((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {})[uConst.get("DATA_FIELD_CHECKLIST")] ?? {};
      if (Object.keys(oldValues).length > 0 && oldValues[itemType] !== undefined) {
        fileData[uConst.get("DATA_FIELD_CHALLENGES")][rowId - 1][uConst.get("DATA_FIELD_CHECKLIST")][itemType] = newValue;

        await checklistListReset(rowId);
        await reloadChallengesTab();
      }
    } else {
      setNewChallengeChecklistValue(itemType, newValue);
      await resetRequiredChecklistSteps();
    }
  }

  async function setChecklistStatusWithNotesReset(newValue, rowId) {
    await notesReset(rowId);
    await setChecklistStatus(newValue);
  }

  async function importMarkdownDescription(element, filePath, params = [], values = {}) {
    element.innerHTML = '';

    const fullFilePath = uConst.get("MARKDOWN_FILES_ROOT_PATH") + filePath + uConst.get("MARKDOWN_FILE_EXTENSION");
    try {
      const template = await uFile.getFileContent(uConst.get("DESCRIPTION_CONTENT_BLOCK_TEMPLATE_FILE_PATH"));
      let content = await uFile.getFileContent(fullFilePath);
      content = libMarked.parse(content);

      for (let paramName of params) {
        const value = values[paramName] ?? null;
        const name = value === null ? paramName : uConst.get("DESCRIPTION_VALUE_PARAM");
        content = content.replace(new RegExp('#' + paramName + '#', 'g'), getDescriptionParamValue(name, value));
      }

      element.innerHTML = template.replace(/#content#/g, content);
    } catch (e) {
    }
  }

  function getDescriptionParamValue(paramName, paramValue) {
    switch (paramName) {
      case uConst.get("DESCRIPTION_VALUE_PARAM"):
        return paramValue;
      case 'current-year':
        return uDate.getYear(uDate.getCurrentDate());
      case 'immovable-dates':
        return getImmovableDatesSiteParam();
      default:
        return '';
    }
  }

  function getImmovableDatesSiteParam() {
    let result = '';

    let rowId = 0;
    let lastDates = {};

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    for (const challenge of challenges) {
      rowId++;
      const challengeStatus = getChallengeSuccessStatus(rowId);
      if (isChallengeStatusToSkip(challengeStatus)) {
        continue;
      }

      lastDates[challenge.type] = challenge.date;
    }

    for (const challengeType of uConst.get("IMMOVABLE_DATES_TAKEN_CHALLENGES_LIST")) {
      const dateString = lastDates[challengeType] ?? '';
      let monthWithDay = dateString.substring(5);
      if (uDate.isYearLeap(dateString.substring(0, 4))) {
        monthWithDay = monthWithDay.replace(/-/, uConst.get("MONTH_WITH_DAY_LEAP_YEAR_SEPARATOR_IN_IMMOVABLE_DATES_SITE"));
      }

      result = result + monthWithDay + ',';
    }

    return result.replace(/[,]+$/, '');
  }

  async function removeChallengeReset(rowId) {
    clearNotifications();

    const row = uDocument.getElementById(uConst.get("CHALLENGE_TO_REMOVE_ELEMENT_ID"));
    const modalRowId = uDocument.getElementById(uConst.get("REMOVE_CHALLENGE_MODAL_ROW_ID_ELEMENT_ID"));

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    const challenge = challenges[rowId - 1] ?? undefined;

    row.innerHTML = '';
    if (challenge !== undefined) {
      const content = await uFile.getFileContent(uConst.get("CHALLENGE_ITEM_TO_REMOVE_TEMPLATE_FILE_PATH"));

      let date = challenge.date ?? '';
      let personUrl = (challenge.person ?? '');
      let addition = challenge.addition ?? '';
      let additionUrl = addition.length > 0 ? addition : '';
      let type = challenge.type ?? '';
      let number = '';

      const config = challengesConfig[type] ?? {};
      const additionType = config[uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
      if (config.numbers ?? false) {
        number = 1;
        for (let i = 0; i < rowId - 1; i++) {
          if ((challenges[i].person ?? '') === personUrl && (challenges[i].type ?? '') === type) {
            number++;
          }
        }
      }
      const typeName = uLanguage.getTranslation('name', true, config.name ?? {});

      row.innerHTML = content
        .replace(/#row-id#/g, rowId)
        .replace(/#date#/g, getDateFormat(date))
        .replace(/#type-name#/g, typeName)
        .replace(/#type#/g, type)
        .replace(/#number#/g, number.toString())
        .replace(/#person-url#/g, personUrl)
        .replace(/#person#/g, getPersonDataName(personUrl))
        .replace(/#addition-url#/g, additionUrl.length > 0 ? additionUrl : '')
        .replace(/#addition#/g, additionUrl.length > 0 ? getPersonDataAdditionName(personUrl, additionType, additionUrl) : '')
      ;
    }

    modalRowId.value = rowId;
  }

  async function removeChallenge() {
    const rowId = uDocument.getElementById(uConst.get("REMOVE_CHALLENGE_MODAL_ROW_ID_ELEMENT_ID")).value ?? 0;

    (fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? []).splice(rowId - 1, 1);

    await reloadChallengesTab();

    const gotoRowId = Math.max(1, rowId - 1);
    successNotification(uLanguage.getTranslation('lang-challenge-removed-successfully', true), gotoRowId);
    gotoChallenge(gotoRowId);
  }

  async function challengeInfoReset(rowId) {
    clearNotifications();

    let challengeDescInfoDiv = uDocument.getElementById(uConst.get("CHALLENGE_DESCRIPTION_INFO_DIV_ELEMENT_ID"));
    challengeDescInfoDiv.innerHTML = '';

    let personDescInfoDiv = uDocument.getElementById(uConst.get("PERSON_DESCRIPTION_INFO_DIV_ELEMENT_ID"));
    personDescInfoDiv.innerHTML = '';


    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    const challenge = challenges[rowId - 1] ?? undefined;
    if (challenge === undefined) {
      return;
    }

    const challengeDate = challenge.date;
    const challengeType = challenge.type;
    const personId = challenge.person;
    const additionId = challenge.addition;

    const config = challengesConfig[challengeType] ?? {};
    const additionType = config[uConst.get("CONFIG_FIELD_ADDITION_TYPE")] ?? '';
    const person = getPersonDataName(challenge.person ?? '');
    const addition = getPersonDataAdditionName(personId, additionType, additionId);
    const personString = person + (additionId === '' ? '' : ' (' + addition + ')');

    let challengeDescInfoValue = uDocument.getElementById(uConst.get("CHALLENGE_DESCRIPTION_INFO_VALUE_ELEMENT_ID"));
    challengeDescInfoValue.innerHTML = getChallengeTypeName(challengeType);

    let personDescInfoValue = uDocument.getElementById(uConst.get("PERSON_DESCRIPTION_INFO_VALUE_ELEMENT_ID"));
    personDescInfoValue.innerHTML = personString;

    const descValues = {
      ['challenge-date']: challengeDate
    };

    const challengeDescData = challengesConfig[challengeType].description ?? {};
    const challengeDescFilePath = uLanguage.getTranslation('description', false, challengeDescData.template ?? {});
    const challengeDescParams = challengeDescData.params ?? [];
    importMarkdownDescription(challengeDescInfoDiv, challengeDescFilePath, challengeDescParams, descValues);

    const personDescData = (challengesConfig[challengeType].person ?? {}).description ?? {};
    const personDescFilePath = uLanguage.getTranslation('description', false, personDescData.template ?? {});
    const personDescParams = personDescData.params ?? [];
    importMarkdownDescription(personDescInfoDiv, personDescFilePath, personDescParams, descValues);
  }

  async function moveChallengeReset(rowId, direction) {
    clearNotifications();

    const modalRowId = uDocument.getElementById(uConst.get("MOVE_CHALLENGE_MODAL_ROW_ID_ELEMENT_ID"));
    const modalDirection = uDocument.getElementById(uConst.get("MOVE_CHALLENGE_MODAL_DIRECTION_ELEMENT_ID"));

    modalRowId.value = rowId;
    modalDirection.value = direction;
  }

  async function moveChallenge() {
    const rowId = Number(uDocument.getElementById(uConst.get("MOVE_CHALLENGE_MODAL_ROW_ID_ELEMENT_ID")).value ?? 0);
    const direction = uDocument.getElementById(uConst.get("MOVE_CHALLENGE_MODAL_DIRECTION_ELEMENT_ID")).value ?? '';

    if (direction === uConst.get("MOVE_CHALLENGE_DIRECTION_DOWN")) {
      moveChallengeDown(rowId);
    } else if (direction === uConst.get("MOVE_CHALLENGE_DIRECTION_UP")) {
      moveChallengeUp(rowId);
    }
  }

  async function moveChallengeUp(rowId) {
    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    const current = challenges[rowId - 1] ?? {};
    const previous = challenges[rowId - 2] ?? {};

    if (Object.keys(current).length > 0 && current.date === previous.date) {
      fileData[uConst.get("DATA_FIELD_CHALLENGES")][rowId - 1] = previous;
      fileData[uConst.get("DATA_FIELD_CHALLENGES")][rowId - 2] = current;
    }

    await reloadChallengesTab();

    const gotoRowId = Math.max(1, rowId - 1);
    successNotification(uLanguage.getTranslation('lang-challenges-order-changed-successfully', true), gotoRowId);
    gotoChallenge(gotoRowId);
  }

  async function moveChallengeDown(rowId) {
    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    const current = challenges[rowId - 1] ?? {};
    const next = challenges[rowId] ?? {};

    if (Object.keys(current).length > 0 && current.date === next.date) {
      fileData[uConst.get("DATA_FIELD_CHALLENGES")][rowId - 1] = next;
      fileData[uConst.get("DATA_FIELD_CHALLENGES")][rowId] = current;
    }

    await reloadChallengesTab();

    const gotoRowId = rowId + 1;
    successNotification(uLanguage.getTranslation('lang-challenges-order-changed-successfully', true), gotoRowId);
    gotoChallenge(gotoRowId);
  }

  function resetNewChallengeChecklistValues() {
    newChallengeChecklistValues = {};
  }

  function setNewChallengeChecklistValue(itemType, value) {
    newChallengeChecklistValues[itemType] = value;
  }

  function getNewChallengeChecklistValue(itemType) {
    return newChallengeChecklistValues[itemType] ?? null;
  }

  function resetNewChallengeNotesValues() {
    newChallengeNotesValues = {};
  }

  function setNewChallengeNoteValue(itemType, value) {
    newChallengeNotesValues[itemType] = value;
  }

  async function notesReset(rowId) {
    clearNotifications();

    lastEditedNoteItem = [];
    lastFormModeNoteCellElementIdSuffix = {};

    const notesListElement = uDocument.getElementById(uConst.get("NOTES_LIST_ELEMENT_ID"));
    notesListElement.innerHTML = '';
    const notesListForAddNewChallengeElement = uDocument.getElementById(uConst.get("NOTES_LIST_FOR_ADD_NEW_CHALLENGE_ELEMENT_ID"));
    notesListForAddNewChallengeElement.innerHTML = '';

    let challengeType = ((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {}).type ?? null;
    let notes = ((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {})[uConst.get("DATA_FIELD_NOTES")] ?? {};

    if (Object.keys(notes).length == 0 || challengeType == null) {
      notesListElement.innerHTML = uLanguage.getTranslation('lang-there-is-no-note-for-this-challenge', true);

      return;
    }

    for (let itemType of Object.keys(notes)) {
      await drawNoteRow(notesListElement, rowId, challengeType, itemType);
    }
  }

  async function drawNoteRow(contentElement, rowId, challengeType, itemType) {
    const element = uDocument.createElement('div');

    const config = ((challengesConfig[challengeType] ?? [])[uConst.get("CONFIG_FIELD_NOTES")] ?? [])[itemType] ?? {};
    let name = uLanguage.getTranslation('name', true, config.name ?? {});
    if (name.substring(0, 3) === uLanguage.getMissingVariableSign()) {
      name = itemType;
    }

    const content = await uFile.getFileContent(uConst.get("NOTE_ITEM_TEMPLATE_FILE_PATH"));
    element.innerHTML = content
      .replace(/#name#/g, name)
      .replace(/#row-id#/g, rowId)
      .replace(/#challenge-type#/g, challengeType)
      .replace(/#item-type#/g, itemType)
    ;
    contentElement.append(element);

    await showNoteContent(rowId, challengeType, itemType);
  }

  function isNoteDataStructureValid(data, level = 0) {
    if (level > uConst.get("MAX_NOTE_OBJECT_STRUCTURE_LEVELS") || !Array.isArray(data)) {
      return false;
    }

    for (const item of data) {
      if (typeof item !== 'object' || item === null || Object.keys(item).length === 0) {
        return false;
      }

      for (const key of Object.keys(item)) {
        if (!key.match(/^[0-9]+$/)) {
          return false;
        }

        if (!isNoteDataStructureValid(item[key], level + 1)) {
          return false;
        }
      }
    }

    return true;
  }

  function getNoteValueDepthLevelsCount(value, level = 0) {
    let result = level;

    for (const item of value) {
      for (const key of Object.keys(item)) {
        result = Math.max(result, getNoteValueDepthLevelsCount(item[key], level + 1));
      }
    }

    return result;
  }

  function getNoteTableHeaders(data, challengeConfig, depthLevelsCount) {
    let result = [];
    for (const noteType of Object.keys(challengeConfig.type ?? {})) {
      let noteName = uLanguage.getTranslation('name', true, (notesTypesConfig[noteType] ?? {}).name ?? {});
      if (noteName.substring(0, 3) === uLanguage.getMissingVariableSign()) {
        noteName = uConst.get("MISSING_TABLE_HEADER_NOTE_NAME");
      }

      result.push(noteName);
    }

    for (let i = result.length; i < depthLevelsCount; i++) {
      result.push(uConst.get("MISSING_TABLE_HEADER_NOTE_NAME"));
    }

    return result;
  }

  async function changeNoteItemModeToEdit(rowId, challengeType, itemType) {
    if (lastEditedNoteItem[rowId] === itemType) {
      return;
    } else if (lastEditedNoteItem[rowId] !== undefined) {
      await showNoteContent(rowId, challengeType, lastEditedNoteItem[rowId]);
    }
    lastEditedNoteItem = [];
    lastEditedNoteItem[rowId] = itemType;

    const isEditMode = true;
    await showNoteContent(rowId, challengeType, itemType, isEditMode);

    location.hash = uConst.get("ANCHOR_CHARACTER") + uConst.get("NOTE_ITEM_ELEMENT_ID_PREFIX") + itemType;
  }

  function getChallengeNotesData(rowId, itemType) {
    if (rowId === uConst.get("EMPTY_ROW_ID")) {
      return newChallengeNotesValues[itemType] ?? [];
    } else {
      return (((fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [])[rowId - 1] ?? {})[uConst.get("DATA_FIELD_NOTES")] ?? {})[itemType] ?? [];
    }
  }

  async function showNoteContent(rowId, challengeType, itemType, isEditMode = false) {
    const noteElementId = uConst.get("NOTE_VALUE_ELEMENT_ID_PREFIX") + itemType;
    const noteTableBodyElementId = noteElementId + uConst.get("NOTE_VALUE_TABLE_BODY_ELEMENT_ID_SUFFIX");

    const noteElement = uDocument.getElementById(noteElementId);
    noteElement.innerHTML = '';

    const value = getChallengeNotesData(rowId, itemType);
    const challengeConfig = ((challengesConfig[challengeType] ?? {})[uConst.get("CONFIG_FIELD_NOTES")] ?? {})[itemType] ?? {};

    if (!isNoteDataStructureValid(value)) {
      noteElement.innerHTML = uLanguage.getTranslation('lang-you-cannot-read-this-note-due-to-its-invalid-structure', true);
      noteElement.innerHTML += ' (json:' + JSON.stringify(value) + ')';
      return;
    } else if (!isEditMode && value.length === 0) {
      noteElement.innerHTML = uLanguage.getTranslation('lang-non-existence');
      return;
    }

    const depthLevelsCount = getNoteValueDepthLevelsCount(value);
    const tableHeaders = getNoteTableHeaders(value, challengeConfig, depthLevelsCount);

    noteElement.innerHTML = '<thead><tr><th>' + tableHeaders.join('</th><th>') + '</th></tr></thead>';
    noteElement.innerHTML += '<tbody id="' + noteTableBodyElementId + '"></tbody>';

    const tableBodyElement = uDocument.getElementById(noteTableBodyElementId);
    let tableRowElement = tableBodyElement.insertRow(0);
    await showNoteValue(tableBodyElement, tableRowElement, rowId, challengeType, challengeConfig, itemType, value, [], tableHeaders.length, isEditMode);
  }

  async function showNoteValue(tableBodyElement, tableRowElement, rowId, challengeType, challengeConfig, itemType, value, path, tableColumnsCount, isEditMode, level = 1) {
    let totalRows = 0;

    let noteType = '';
    let noteTypeConfig = {};
    let noteQuantityMin = 0;
    let noteQuantityMax = uConst.get("NOTE_QUANTITY_INFINITY_MAX");
    let doubleLoopTimes = path.length;
    for (const noteTypeData of Object.entries(challengeConfig.type ?? {})) {
      if (doubleLoopTimes <= 0) {
        noteType = noteTypeData[0] ?? '';
        noteTypeConfig = notesTypesConfig[noteTypeData[0] ?? null] ?? {};

        const noteQuantity = noteTypeData[1] ?? [];

        noteQuantityMin = noteQuantity[0] ?? 0;
        noteQuantityMax = noteQuantity[1] ?? uConst.get("NOTE_QUANTITY_INFINITY_MAX");
        break;
      }
      doubleLoopTimes -= 2;
    }

    let noteItemsCount = 0;
    let isNewTableRowNeeded = false;
    let tableRowElementToUse = tableRowElement;
    for (const noteKey in value) {
      for (const noteId of Object.keys(value[noteKey] ?? {})) {
        noteItemsCount++;

        const itemPath = path.concat([noteKey, noteId]);
        const subValue = value[noteKey][noteId];

        if (isNewTableRowNeeded) {
          tableRowElementToUse = tableBodyElement.insertRow(-1);
        }

        const rowsCount = await showNoteValue(tableBodyElement, tableRowElementToUse, rowId, challengeType, challengeConfig, itemType, subValue, itemPath, tableColumnsCount, isEditMode, level + 1);

        let cellElement = tableRowElementToUse.insertCell(0);
        cellElement.rowSpan = rowsCount;
        await showNoteCellContent(cellElement, rowId, challengeType, itemType, itemPath, noteType, noteTypeConfig, noteQuantityMin, noteQuantityMax, value.length, rowsCount, isEditMode);

        totalRows += rowsCount;
        isNewTableRowNeeded = true;
      }
    }

    if (isEditMode
      && (isNewTableRowNeeded || (totalRows === 0 && level === 1))
      && Object.keys(noteTypeConfig).length > 0
      && (noteQuantityMax === uConst.get("NOTE_QUANTITY_INFINITY_MAX") || noteQuantityMax > noteItemsCount)
    ) {
      tableRowElementToUse = tableBodyElement.insertRow(-1);
      let cellElement = tableRowElementToUse.insertCell(-1);

      showCreateNoteCellContent(cellElement, rowId, challengeType, itemType, path, noteItemsCount);

      for (let i = 0; i < tableColumnsCount - level; i++) {
        tableRowElementToUse.insertCell(-1);
      }
      totalRows++;
    }

    if (noteItemsCount === 0) {
      if (level > 1) {
        for (let i = 0; i <= tableColumnsCount - level; i++) {
          let cellElement = tableRowElementToUse.insertCell(-1);

          if (i === 0 && isEditMode && Object.keys(noteTypeConfig).length > 0) {
            showCreateNoteCellContent(cellElement, rowId, challengeType, itemType, path, noteItemsCount);
          }
        }
      }
    }

    return Math. max(1, totalRows);
  }

  async function showCreateNoteCellContent(cellElement, rowId, challengeType, itemType, itemPath, newNoteNumber) {
    const template = await uFile.getFileContent(uConst.get("CREATE_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH"));
    const itemPathString = itemPath.join('-');
    const cellElementId = itemType + '-' + itemPathString + '-' + newNoteNumber + '-' + uConst.get("EMPTY_NOTE_ID");

    cellElement.innerHTML = template
      .replace(/#note-cell-id#/g, cellElementId)
      .replace(/#row-id#/g, rowId)
      .replace(/#challenge-type#/g, challengeType)
      .replace(/#item-type#/g, itemType)
      .replace(/#item-path#/g, '[' + itemPath.join(', ') + ']')
      .replace(/#new-note-number#/g, newNoteNumber)
    ;
  }

  async function createNewEmptyNote(rowId, challengeType, itemType, itemPath, newNoteNumber) {
    const rowNotes = getChallengeNotesData(rowId, itemType);

    let context = rowNotes;
    for (const i of itemPath) {
      context = context[i];
    }
    context[newNoteNumber] = {[uConst.get("EMPTY_NOTE_ID")]: []};

    await setNoteCellModeToForm(rowId, challengeType, itemType, itemPath.concat([newNoteNumber, uConst.get("EMPTY_NOTE_ID")]));
  }

  function getNoteFromFileData(index, noteId) {
    const note = ((fileData[uConst.get("DATA_FIELD_NOTES")] ?? {})[index] ?? {})[noteId] ?? '';

    if (note.length > 0) {
      return note;
    } else if (noteId == 0) {
      return uLanguage.getTranslation('lang-empty-note-form-warning', true);
    }

    return uConst.get("MISSING_NOTE_ID_SIGN") + noteId + uConst.get("MISSING_NOTE_ID_SIGN");
  }

  async function showNoteCellContent(
    cellElement, rowId, challengeType, itemType, itemPath,
    noteType, noteTypeConfig, noteQuantityMin, noteQuantityMax,
    totalNotes, rowsCount, isEditMode
  ) {
    const itemPathString = itemPath.join('-');
    const cellElementId = itemType + '-' + itemPathString;
    const noteId = itemPath.at(-1);
    const noteNo = Number(itemPath.at(-2) ?? '0') + 1;
    const noteIndex = noteTypeConfig.index ?? '';
    const content = getNoteFromFileData(noteIndex, noteId);
    const hint = Object.keys(noteTypeConfig.hint ?? {}).length === 0 ? '' : uLanguage.getTranslation('name', false, noteTypeConfig.hint);
    let escapedContent = getHtmlTagsEscapedString(content);
    if ((noteTypeConfig.source ?? {})[uConst.get("NOTE_CONFIG_SOURCE_TYPE_PATRONS")] != undefined) {
      escapedContent = getPersonDataName(escapedContent);
    }
    if ((noteTypeConfig.source ?? {})[uConst.get("NOTE_CONFIG_SOURCE_TYPE_CHALLENGE_TYPES")] != undefined) {
      escapedContent = getChallengeTypeName(escapedContent);
    }

    const isEditFormMode = (isEditMode && (lastFormModeNoteCellElementIdSuffix[itemType] ?? '') === itemPathString);

    let templatePath = uConst.get("READ_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH");
    if (isEditMode) {
      templatePath = uConst.get("EDIT_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH");
      if (isEditFormMode) {
        templatePath = uConst.get("FORM_MODE_NOTE_CELL_ITEM_TEMPLATE_FILE_PATH");
      }
    }
    const template = await uFile.getFileContent(templatePath);

    cellElement.innerHTML = template
      .replace(/#note-cell-id#/g, cellElementId)
      .replace(/#rows-count#/g, rowsCount)
      .replace(/#content#/g, escapedContent)
      .replace(/#row-id#/g, rowId)
      .replace(/#challenge-type#/g, challengeType)
      .replace(/#item-type#/g, itemType)
      .replace(/#item-path#/g, '[' + itemPath.join(', ') + ']')
      .replace(/#hint#/g, hint)
    ;

    if (isEditMode) {
      const editButton = uDocument.getElementById(uConst.get("NOTE_CELL_ELEMENT_ID_PREFIX") + cellElementId + uConst.get("NOTE_CELL_EDIT_BUTTON_ELEMENT_ID_SUFFIX"));
      const moveUpButton = uDocument.getElementById(uConst.get("NOTE_CELL_ELEMENT_ID_PREFIX") + cellElementId + uConst.get("NOTE_CELL_MOVE_UP_BUTTON_ELEMENT_ID_SUFFIX"));
      const moveDownButton = uDocument.getElementById(uConst.get("NOTE_CELL_ELEMENT_ID_PREFIX") + cellElementId + uConst.get("NOTE_CELL_MOVE_DOWN_BUTTON_ELEMENT_ID_SUFFIX"));
      const removeButton = uDocument.getElementById(uConst.get("NOTE_CELL_ELEMENT_ID_PREFIX") + cellElementId + uConst.get("NOTE_CELL_REMOVE_BUTTON_ELEMENT_ID_SUFFIX"));
      const removeDuringAddNewChallengeButton = uDocument.getElementById(uConst.get("NOTE_CELL_ELEMENT_ID_PREFIX") + cellElementId + uConst.get("NOTE_CELL_REMOVE_DURING_ADD_NEW_CHALLENGE_BUTTON_ELEMENT_ID_SUFFIX"));

      if (editButton && Object.keys(noteTypeConfig).length <= 0) {
        uUseful.setVisibility(editButton, false);
      }
      if (moveUpButton && noteNo <= 1) {
        uUseful.setVisibility(moveUpButton, false);
      }
      if (moveDownButton && noteNo >= totalNotes) {
        uUseful.setVisibility(moveDownButton, false);
      }
      if (removeButton && (rowId === uConst.get("EMPTY_ROW_ID") || noteNo <= noteQuantityMin)) {
        uUseful.setVisibility(removeButton, false);
      }
      if (removeDuringAddNewChallengeButton && (rowId > uConst.get("EMPTY_ROW_ID") || noteNo <= noteQuantityMin)) {
        uUseful.setVisibility(removeDuringAddNewChallengeButton, false);
      }
    }
    if (isEditFormMode) {
      const hintElement = uDocument.getElementById(uConst.get("NOTE_CELL_ELEMENT_ID_PREFIX") + cellElementId + uConst.get("NOTE_CELL_HINT_ELEMENT_ID_SUFFIX"));

      if (hintElement && hint === '') {
        uUseful.setVisibility(hintElement, false);
      }
    }

    if (isEditFormMode) {
      await showNoteCellContentInFormMode(cellElement, rowId, challengeType, itemType, itemPath, noteType, noteTypeConfig);
    }
  }

  function getNotesConfiguredListValues(list) {
    let result = [];

    for (const row of list) {
      const noteId = Object.keys(row)[0] ?? '';
      value = uLanguage.getTranslation('name', false, row[noteId] ?? {});

      result.push({[noteId]: value});
    }

    return result;
  }

  function getNotesPatronsValues(config, fileDataValues, rowId, currentValue) {
    let result = [];

    let persons = {};

    const isGodAndAllPatrons = config[uConst.get("REQUIREMENT_GOD_OR_ANY_PATRON")] ?? null;
    const typesNeeded = config[uConst.get("REQUIREMENT_PERSON_HAVING_CHALLENGES")] ?? null;

    if (isGodAndAllPatrons) {
      for (let personId of getAllPersonsDataSubelements()) {
        persons[personId] = personId;
      }
    } else if (typesNeeded != null) {
      const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
      let challengeDate = (challenges[rowId - 1] ?? {}).date ?? null;
      if (challengeDate == null) {
        challengeDate = uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value ?? uDate.getToday();
      }

      persons = getPersonsHavingAllChallenges(typesNeeded, challengeDate);
    }

    if (Object.keys(persons).length > 0 || currentValue.length > 0) {
      let personIdKeys = {};
      for (const noteId in fileDataValues) {
        personIdKeys[fileDataValues[noteId]] = noteId;
      }

      if (currentValue.length > 0) {
        persons[currentValue] = currentValue;
      }

      let noteId = 0;
      for (let personId of Object.keys(persons)) {
        let foundNoteId = personIdKeys[personId] ?? uConst.get("EMPTY_NOTE_ID");
        while (foundNoteId === uConst.get("EMPTY_ROW_ID")) {
          noteId++;
          if (fileDataValues[noteId] === undefined) {
            foundNoteId = noteId;
          }
        }

        result.push({
          [foundNoteId]: personId,
          name: getPersonDataName(personId)
        });
      }
    }

    return uSort.getSortedArray(result, 'name');
  }

  function getNotesChallengeTypesValues(config, fileDataValues, rowId, currentValue) {
    let result = [];

    const challengeDate = (challenges[rowId - 1] ?? {}).date ?? uDocument.getElementById(uConst.get("CHALLENGE_DATE_INPUT_ELEMENT_ID")).value;
    let challengeTypes = getChallengeTypesWithRequirements(config, challengeDate);

    if (Object.keys(challengeTypes).length > 0 || currentValue.length > 0) {
      let challengeTypesIdKeys = {};
      for (const noteId in fileDataValues) {
        challengeTypesIdKeys[fileDataValues[noteId]] = noteId;
      }

      if (currentValue.length > 0) {
        challengeTypes[currentValue] = currentValue;
      }

      let noteId = 0;
      for (let challengeTypeId of Object.keys(challengeTypes)) {
        let foundNoteId = challengeTypesIdKeys[challengeTypeId] ?? uConst.get("EMPTY_NOTE_ID");
        while (foundNoteId === uConst.get("EMPTY_ROW_ID")) {
          noteId++;
          if (fileDataValues[noteId] === undefined) {
            foundNoteId = noteId;
          }
        }

        const name = getChallengeTypeName(challengeTypeId);

        result.push({
          [foundNoteId]: challengeTypeId,
          name: name
        });
      }
    }

    return uSort.getSortedArray(result, 'name');
  }

  function getNotesFileDataValues(index) {
    let result = {};

    const notes = (fileData[uConst.get("DATA_FIELD_NOTES")] ?? {})[index] ?? {};
    for (const [noteId, value] of Object.entries(notes)) {
      if (value.length > 0) {
        result[noteId] = value;
      }
    }

    return result;
  }

  function getSiblingsNoteIds(rowId, itemType, itemPath) {
    let result = {};

    const rowNotes = getChallengeNotesData(rowId, itemType);

    let path = structuredClone(itemPath);
    const noteId = Number(path.pop());
    const noteNumber = Number(path.pop());

    let context = rowNotes;
    for (const i of path) {
      context = context[i];
    }

    for (const row of context) {
      const siblingNoteId = Number(Object.keys(row)[0] ?? uConst.get("EMPTY_NOTE_ID"));
      if (!uUseful.inArray(siblingNoteId, [noteId, uConst.get("EMPTY_NOTE_ID")])) {
        result[siblingNoteId] = siblingNoteId;
      }
    }

    return result;
  }

  async function showNoteCellContentInFormMode(cellElement, rowId, challengeType, itemType, itemPath, noteType, noteTypeConfig) {
    const currentNoteId = Number(itemPath.at(-1));

    const selectElement = uDocument.getElementById(uConst.get("NOTE_CELL_SELECT_ELEMENT_ID"));
    const inputElement = uDocument.getElementById(uConst.get("NOTE_CELL_INPUT_ELEMENT_ID"));
    const setExistingNoteButtonElement = uDocument.getElementById(uConst.get("NOTE_CELL_SET_EXISTING_NOTE_BUTTON"));
    const setNewNoteButtonElement = uDocument.getElementById(uConst.get("NOTE_CELL_SET_NEW_NOTE_BUTTON"));

    uUseful.setVisibility(selectElement, false);
    uUseful.setVisibility(inputElement, false);
    uUseful.setVisibility(setExistingNoteButtonElement, false);
    uUseful.setVisibility(setNewNoteButtonElement, false);

    const noteIndex = noteTypeConfig.index ?? '';
    const noteSources = noteTypeConfig.source ?? {};

    const fileDataValues = getNotesFileDataValues(noteIndex);
    const listValues = getNotesConfiguredListValues(noteSources[uConst.get("NOTE_CONFIG_SOURCE_TYPE_LIST")] ?? []);
    const siblingsNoteIds = getSiblingsNoteIds(rowId, itemType, itemPath);

    const currentValue = fileDataValues[currentNoteId] ?? '';

    let selectableValues = {};

    selectElement.onchange = function() {
      const noteId = selectElement.value ?? '';
      const value = selectableValues[noteId] ?? '';

      inputElement.value = value;

      uUseful.setVisibility(inputElement, false);
      uUseful.setVisibility(setNewNoteButtonElement, false);
      uUseful.setVisibility(setExistingNoteButtonElement, false);

      if (noteId === '') {
        uUseful.setVisibility(inputElement, true);
      }
      if (Number(noteId) === currentNoteId) {
        uUseful.setVisibility(setExistingNoteButtonElement, true);
      }

      inputElement.onchange();
    }
    selectElement.onblur = function() {
      inputElement.onblur();
    }
    inputElement.onchange = function() {
      const value = uUseful.getStringWithTidySpaces(inputElement.value);

      uUseful.setVisibility(setNewNoteButtonElement, false);
      uUseful.setVisibility(setExistingNoteButtonElement, false);

      if (value.length > 0) {
        if (!uUseful.inArray(value, Object.values(fileDataValues))) {
          uUseful.setVisibility(setNewNoteButtonElement, true);
        } else {
          const noteId = Number(Object.keys(fileDataValues).find(key => fileDataValues[key] === value) ?? uConst.get("EMPTY_NOTE_ID"));

          if (siblingsNoteIds[noteId] == undefined || noteId === currentNoteId) {
            uUseful.setVisibility(setExistingNoteButtonElement, true);
          }
        }
      }
    }
    inputElement.onblur = function() {
      if (uUseful.isVisible(setNewNoteButtonElement)) {
        setNewNoteButtonElement.onclick();
      } else if (uUseful.isVisible(setExistingNoteButtonElement)) {
        setExistingNoteButtonElement.onclick();
      }
    }
    setNewNoteButtonElement.onclick = function() {
      const selectedNoteId = selectElement.value ?? '';
      const selectedValue = uUseful.getStringWithTidySpaces(inputElement.value);

      let noteIdToAdd = 0;
      if (selectedNoteId > 0) {
        newNoteId = selectedNoteId;
      } else {
        let maxUsedNoteId = 0;
        for (const row of listValues) {
          const noteId = Number(Object.keys(row)[0] ?? 1);
          if (noteId > maxUsedNoteId) {
            maxUsedNoteId = noteId;
          }
        }
        if (maxUsedNoteId > 0) {
          maxUsedNoteId += uConst.get("NOTES_IDS_SKIPPED_AFTER_PREDEFINED_LIST");
        }
        for (const key of Object.keys(fileDataValues)) {
          const noteId = Number(key);
          if (noteId > maxUsedNoteId) {
            maxUsedNoteId = noteId;
          }
        }

        newNoteId = maxUsedNoteId + 1;
      }

      let path = structuredClone(itemPath);
      path.pop();
      path = path.concat([newNoteId]);

      addNewNote(rowId, challengeType, itemType, path, noteIndex, selectedValue);
    }
    setExistingNoteButtonElement.onclick = function() {
      const selectedValue = uUseful.getStringWithTidySpaces(inputElement.value);

      const newNoteId = Object.keys(fileDataValues).find(key => fileDataValues[key] === selectedValue) ?? uConst.get("EMPTY_NOTE_ID");
      if (newNoteId.toString() !== uConst.get("EMPTY_NOTE_ID").toString()) {
        let path = structuredClone(itemPath);
        path.pop();
        path = path.concat([newNoteId]);

        assignExistingNote(rowId, challengeType, itemType, path);
      }
    }

    let anySelectOptionAddedAfterSeparator = false;
    if (currentNoteId === uConst.get("EMPTY_NOTE_ID") || fileDataValues[currentNoteId] == undefined) {
      uDocument.addOptionToSelect(selectElement, uConst.get("EMPTY_NOTE_ID"), uConst.get("SELECT_NAME"));
    }

    let foundAnySource = false;
    let foundSelectedOption = false;
    for (let source of Object.keys(noteSources)) {
      let isSelected = false;
      let isDisabled = false;

      if (foundAnySource && anySelectOptionAddedAfterSeparator) {
        isSelected = false;
        isDisabled = true;
        uDocument.addOptionToSelect(selectElement, uConst.get("EMPTY_NOTE_ID"), uConst.get("SELECT_SEPARATOR"), isSelected, isDisabled);
        anySelectOptionAddedAfterSeparator = false;
      }
      foundAnySource = true;

      const sourceData = noteSources[source];

      switch (source) {
        case uConst.get("NOTE_CONFIG_SOURCE_TYPE_VALUES"):
          let valuesData = structuredClone(fileDataValues);
          if (sourceData === uConst.get("NOTE_CONFIG_SOURCE_TYPE_VALUES_TYPE_SORTED")) {
            valuesData = uSort.getSortedObject(valuesData);
          } else if (sourceData === uConst.get("NOTE_CONFIG_SOURCE_TYPE_VALUES_TYPE_LAST_YEAR_OR_10_CHALLENGES_SORTED")) {
            valuesData = getLastYearOrTenChallengesValuesData(valuesData, rowId, noteType);
            valuesData = uSort.getSortedObject(valuesData);
          } else {
            valuesData = Object.entries(valuesData);
          }

          for (const [noteId, value] of valuesData) {
            isSelected = (!foundSelectedOption && currentNoteId.toString() === noteId);
            if (isSelected) {
              foundSelectedOption = true;
            }
            if (siblingsNoteIds[noteId] == undefined) {
              const escapedValue = getHtmlTagsEscapedString(value);
              uDocument.addOptionToSelect(selectElement, noteId, escapedValue, isSelected);
              anySelectOptionAddedAfterSeparator = true;
              selectableValues[noteId] = value;
            }
          }

          isSelected = false;
          isDisabled = true;
          if (anySelectOptionAddedAfterSeparator) {
            uDocument.addOptionToSelect(selectElement, uConst.get("EMPTY_NOTE_ID"), uConst.get("SELECT_SEPARATOR"), isSelected, isDisabled);
          }

          uDocument.addOptionToSelect(selectElement, '', uLanguage.getTranslation('lang-add-new-your-own-note') + ' ' + uConst.get("SELECT_NAME"));
          anySelectOptionAddedAfterSeparator = true;
          break;

        case uConst.get("NOTE_CONFIG_SOURCE_TYPE_LIST"):
          for (const row of listValues) {
            const noteId = Object.keys(row)[0] ?? '';
            const value = row[noteId] ?? [];

            isSelected = (!foundSelectedOption && currentNoteId.toString() === noteId);
            if (isSelected) {
              foundSelectedOption = true;
            }
            if (siblingsNoteIds[noteId] == undefined) {
              const escapedValue = getHtmlTagsEscapedString(value);
              uDocument.addOptionToSelect(selectElement, noteId, escapedValue, isSelected);
              anySelectOptionAddedAfterSeparator = true;
              selectableValues[noteId] = value;
            }
          }
          break;

        case uConst.get("NOTE_CONFIG_SOURCE_TYPE_PATRONS"):
          const patronsValues = getNotesPatronsValues(noteSources[uConst.get("NOTE_CONFIG_SOURCE_TYPE_PATRONS")] ?? {}, fileDataValues, rowId, currentValue);
          for (const row of patronsValues) {
            const noteId = Object.keys(row)[0] ?? '';
            const personId = row[noteId] ?? [];

            isSelected = (!foundSelectedOption && currentNoteId.toString() === noteId);
            if (isSelected) {
              foundSelectedOption = true;
            }
            if (siblingsNoteIds[noteId] == undefined) {
              const value = getPersonDataName(personId);
              const escapedValue = getHtmlTagsEscapedString(value);
              uDocument.addOptionToSelect(selectElement, noteId, escapedValue, isSelected);
              anySelectOptionAddedAfterSeparator = true;
              selectableValues[noteId] = personId;
            }
          }
          break;

        case uConst.get("NOTE_CONFIG_SOURCE_TYPE_CHALLENGE_TYPES"):
          const challengeTypesValues = getNotesChallengeTypesValues(noteSources[uConst.get("NOTE_CONFIG_SOURCE_TYPE_CHALLENGE_TYPES")] ?? {}, fileDataValues, rowId, currentValue);
          for (const row of challengeTypesValues) {
            const noteId = Object.keys(row)[0] ?? '';
            const challengeTypeId = row[noteId] ?? [];

            isSelected = (!foundSelectedOption && currentNoteId.toString() === noteId);
            if (isSelected) {
              foundSelectedOption = true;
            }
            if (siblingsNoteIds[noteId] == undefined) {
              const value = row.name ?? uConst.get("MISSING_NOTE_ID_SIGN");
              const escapedValue = getHtmlTagsEscapedString(value);
              uDocument.addOptionToSelect(selectElement, noteId, escapedValue, isSelected);
              anySelectOptionAddedAfterSeparator = true;
              selectableValues[noteId] = challengeTypeId;
            }
          }
          break;
      }
    }

    if (!foundAnySource) {
      uUseful.setVisibility(inputElement, true);
      inputElement.value = currentValue;
      inputElement.onchange();
    } else {
      uUseful.setVisibility(selectElement, true);
      selectElement.onchange();
    }
  }

  function getLastYearOrTenChallengesValuesData(valuesData, challengeRowId, selectedNoteType) {
    let result = {};

    const lastMiliseconds = (366 + 60) * 24 * 60 * 60 * 1000; //60 days more to now hide movable feasts to early
    const lastRows = 10;

    const challenges = fileData[uConst.get("DATA_FIELD_CHALLENGES")] ?? [];
    if (challengeRowId == uConst.get("EMPTY_ROW_ID")) {
      challengeRowId = challenges.length;
    }

    const challengeDate = uDate.getDateParse((challenges[challengeRowId - 1] ?? {}).date ?? uDate.getToday());

    let rowId = 0;
    for (const challenge of challenges) {
      rowId++;
      if (rowId > challengeRowId) {
        break;
      }

      const date = uDate.getDateParse(challenge.date ?? uDate.getToday());
      const type = challenge.type;
      const notes = challenge.notes;
      const notesConfig = (challengesConfig[type] ?? {})[uConst.get("DATA_FIELD_NOTES")] ?? {};

      if ((challengeRowId - rowId) > lastRows && (challengeDate - date) > lastMiliseconds) {
        continue;
      }

      for (const noteConfigId of Object.keys(notesConfig)) {
        let level = 0;
        for (const noteType in (notesConfig[noteConfigId] ?? {}).type ?? {}) {
          level++;

          if (noteType !== selectedNoteType) {
            continue;
          }
          const noteIds = getNotesIdsForLevel(notes[noteConfigId] ?? [], level);
          for (const noteId of Object.keys(noteIds)) {
            const value = valuesData[noteId] ?? null;
            if (value != null) {
              result[noteId] = value;
            }
          }
        }
      }
    }

    return result;
  }

  function getNotesIdsForLevel(data, level, currentLevel = 1) {
    let result = {};

    if (currentLevel < level) {
      for (const row of data) {
        for (const key of Object.keys(row)) {
          const subData = getNotesIdsForLevel(row[key] ?? [], level, currentLevel + 1);
          for (const value of Object.keys(subData)) {
            result[value] = value;
          }
        }
      }
    } else if (currentLevel == level) {
      for (const row of data) {
        for (const key of Object.keys(row)) {
          result[key] = key;
        }
      }
    }

    return result;
  }

  async function moveUpNote(rowId, challengeType, itemType, itemPath) {
    const rowNotes = getChallengeNotesData(rowId, itemType);
    if (itemType.length < 2) {
      return;
    }

    const noteId = itemPath.pop();
    const noteKey = itemPath.pop();

    let context = rowNotes;
    for (const i of itemPath) {
      context = context[i];
    }
    if (noteKey <= 0) {
      return;
    }

    const objectToMove = structuredClone(context[noteKey]);
    context[noteKey] = structuredClone(context[noteKey - 1]);
    context[noteKey - 1] = objectToMove;

    synchronizeFileData();

    const isEditMode = true;
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  async function moveDownNote(rowId, challengeType, itemType, itemPath) {
    const rowNotes = getChallengeNotesData(rowId, itemType);
    if (itemType.length < 2) {
      return;
    }

    const noteId = itemPath.pop();
    const noteKey = itemPath.pop();

    let context = rowNotes;
    for (const i of itemPath) {
      context = context[i];
    }
    if (noteKey >= context.length - 1) {
      return;
    }

    const objectToMove = structuredClone(context[noteKey]);
    context[noteKey] = structuredClone(context[noteKey + 1]);
    context[noteKey + 1] = objectToMove;

    synchronizeFileData();

    const isEditMode = true;
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  function removeNoteModalReset(rowId, challengeType, itemType, itemPath) {
    clearNotifications();

    uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_ROW_ID_ELEMENT_ID")).value = rowId;
    uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_CHALLENGE_TYPE_ELEMENT_ID")).value = challengeType;
    uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_ITEM_TYPE_ELEMENT_ID")).value = itemType;
    uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_ITEM_PATH_ELEMENT_ID")).value = itemPath.join('/');
  }

  async function removeNote() {
    const rowId = Number(uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_ROW_ID_ELEMENT_ID")).value ?? 0);
    const challengeType = uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_CHALLENGE_TYPE_ELEMENT_ID")).value ?? '';
    const itemType = uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_ITEM_TYPE_ELEMENT_ID")).value ?? '';
    const itemPath = uDocument.getElementById(uConst.get("REMOVE_NOTE_MODAL_ITEM_PATH_ELEMENT_ID")).value.split('/') ?? [];

    const rowNotes = getChallengeNotesData(rowId, itemType);
    if (itemType.length < 2) {
      return;
    }

    const noteId = itemPath.pop();
    const noteKey = itemPath.pop();

    let context = rowNotes;
    for (const i of itemPath) {
      context = context[i];
    }
    context.splice(noteKey, 1);

    synchronizeFileData();

    const isEditMode = true;
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  async function removeNoteDuringAddNewChallenge(rowId, challengeType, itemType, itemPath) {
    const rowNotes = getChallengeNotesData(rowId, itemType);
    if (itemType.length < 2) {
      return;
    }

    const noteId = itemPath.pop();
    const noteKey = itemPath.pop();

    let context = rowNotes;
    for (const i of itemPath) {
      context = context[i];
    }
    context.splice(noteKey, 1);

    synchronizeFileData();

    const isEditMode = true;
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  async function setNoteCellModeToForm(rowId, challengeType, itemType, itemPath) {
    for (const oldItemType of Object.keys(lastFormModeNoteCellElementIdSuffix)) {
      showNoteContent(rowId, challengeType, oldItemType);
    }

    lastFormModeNoteCellElementIdSuffix = {};
    lastFormModeNoteCellElementIdSuffix[itemType] = itemPath.join('-');

    const isEditMode = true;
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  async function addNewNote(rowId, challengeType, itemType, itemPath, noteIndex, inputValue) {
    const rowNotes = getChallengeNotesData(rowId, itemType);
    const value = uUseful.getStringWithTidySpaces(inputValue);

    let path = structuredClone(itemPath);
    const noteId = path.pop();
    const newNoteNumber = path.pop();

    let context = rowNotes;
    for (const i of path) {
      context = context[i];
    }
    context[newNoteNumber] = {[noteId]: []};

    if (fileData[uConst.get("DATA_FIELD_NOTES")] == undefined) {
      fileData[uConst.get("DATA_FIELD_NOTES")] = {};
    }
    if (fileData[uConst.get("DATA_FIELD_NOTES")][noteIndex] == undefined) {
      fileData[uConst.get("DATA_FIELD_NOTES")][noteIndex] = {};
    }
    fileData[uConst.get("DATA_FIELD_NOTES")][noteIndex][noteId] = value;

    synchronizeFileData();

    const isEditMode = true;
    lastFormModeNoteCellElementIdSuffix = {};
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  async function assignExistingNote(rowId, challengeType, itemType, itemPath) {
    const rowNotes = getChallengeNotesData(rowId, itemType);

    let path = structuredClone(itemPath);
    const noteId = path.pop();
    const noteNumber = path.pop();

    let context = rowNotes;
    for (const i of path) {
      context = context[i];
    }
    context[noteNumber] = {[noteId]: (context[noteNumber] ?? [])[noteId] ?? []};

    synchronizeFileData();

    const isEditMode = true;
    lastFormModeNoteCellElementIdSuffix = {};
    await showNoteContent(rowId, challengeType, itemType, isEditMode);
  }

  function validateNotesQuantity(data, noteTypesQuantities) {
    const quantities = structuredClone(noteTypesQuantities);

    const noteType = Object.keys(quantities)[0] ?? null;
    if (noteType === null) {
      return true;
    }

    const minQuantity = quantities[noteType][0] ?? 0;
    const maxQuantity = quantities[noteType][1] ?? uConst.get("NOTE_QUANTITY_INFINITY_MAX");
    delete quantities[noteType];

    const dataCount = data.length;

    if (dataCount < minQuantity
      || (maxQuantity !== uConst.get("NOTE_QUANTITY_INFINITY_MAX") && dataCount > maxQuantity)
    ) {
      return false;
    }

    for (const itemObject of data) {
      const itemNoteId = Number(Object.keys(itemObject)[0] ?? uConst.get("EMPTY_NOTE_ID"));
      const itemData = itemObject[itemNoteId] ?? [];

      if (itemNoteId === uConst.get("EMPTY_NOTE_ID")
        || !validateNotesQuantity(itemData, quantities)
      ) {
        return false;
      }
    }

    return true;
  }

  async function setRandomBibleChapter(language) {
    const button = uDocument.getElementById(uConst.get("RANDOM_BIBLE_CHAPTERS_BUTTON_ELEMENT_ID"));
    button.innerHTML = uLanguage.getTranslation('lang-randomize-the-chapter', true);

    const data = await uFile.getJsonFromFile(uConst.get("BIBLE_CHAPTERS_DATA_JSON_FILE"));

    let allBibleChapters = [];
    for (const [book, chaptersCount] of Object.entries(data[language] ?? {})) {
      for (let chapter = 1; chapter <= chaptersCount; chapter++) {
        allBibleChapters.push(book + ' ' + chapter);
      }
    }

    let suffix = '???';
    if (allBibleChapters.length > 0) {
      suffix = allBibleChapters[Math.floor(Math.random() * allBibleChapters.length)];
    }

    button.innerHTML += ': ' + suffix;
  }

  function isWarningIgnoredForOldChallenges(challengeDateString, challengeType, requirementName) {
    const inactiveDateString = (uConst.get("PARSE_REQUIREMENTS_SINCE_ACTIVE_DATES")[requirementName] ?? {})[challengeType] ?? null;

    if (inactiveDateString !== null) {
      const challengeDate = uDate.getDateParse(challengeDateString);
      const inactiveDate = uDate.getDateParse(inactiveDateString);

      return challengeDate < inactiveDate;
    }

    return false;
  }

  build();
});

function addNewChallenge() {
  requirejs(["const"], function(uConst) {
    uConst.get("ADD_NEW_CHALLENGE")();
  });
}

function addNewChallengeReset() {
  requirejs(["const"], function(uConst) {
    uConst.get("ADD_NEW_CHALLENGE_RESET")();
  });
}

function changeNoteItemModeToEdit(rowId, challengeType, itemType) {
  requirejs(["const"], function(uConst) {
    uConst.get("CHANGE_NOTE_ITEM_MODE_TO_EDIT")(rowId, challengeType, itemType);
  });
}

function challengeInfoReset(rowId) {
  requirejs(["const"], function(uConst) {
    uConst.get("CHALLENGE_INFO_RESET")(rowId);
  });
}

function checklistListReset(rowId) {
  requirejs(["const"], function(uConst) {
    uConst.get("CHECKLIST_LIST_RESET")(rowId);
  });
}

function clearNotifications() {
  requirejs(["const"], function(uConst) {
    uConst.get("CLEAR_NOTIFICATIONS")();
  });
}

function createNewEmptyNote(rowId, challengeType, itemType, itemPath, newNoteNumber) {
  requirejs(["const"], function(uConst) {
    uConst.get("CREATE_NEW_EMPTY_NOTE")(rowId, challengeType, itemType, itemPath, newNoteNumber);
  });
}

function drawChecklistInfo(challengeType, rowId, itemType, itemStatus, backToAddNewChallengeModal) {
  requirejs(["const"], function(uConst) {
    uConst.get("DRAW_CHECKLIST_INFO")(challengeType, rowId, itemType, itemStatus, backToAddNewChallengeModal);
  });
}

function loadFile(input) {
  requirejs(["const"], function(uConst) {
    uConst.get("LOAD_FILE")(input);
  });
}

function moveChallenge() {
  requirejs(["const"], function(uConst) {
    uConst.get("MOVE_CHALLENGE")();
  });
}

function moveChallengeReset(rowId, direction) {
  requirejs(["const"], function(uConst) {
    uConst.get("MOVE_CHALLENGE_RESET")(rowId, direction);
  });
}

function moveDownNote(rowId, challengeType, itemType, itemPath) {
  requirejs(["const"], function(uConst) {
    uConst.get("MOVE_DOWN_NOTE")(rowId, challengeType, itemType, itemPath);
  });
}

function moveUpNote(rowId, challengeType, itemType, itemPath) {
  requirejs(["const"], function(uConst) {
    uConst.get("MOVE_UP_NOTE")(rowId, challengeType, itemType, itemPath);
  });
}

function notesReset(rowId) {
  requirejs(["const"], function(uConst) {
    uConst.get("NOTES_RESET")(rowId);
  });
}

function reloadChallengesTab() {
  requirejs(["const"], function(uConst) {
    uConst.get("RELOAD_CHALLENGES_TAB")();
  });
}

function reloadFileTab() {
  requirejs(["const"], function(uConst) {
    uConst.get("RELOAD_FILE_TAB")();
  });
}

function reloadJsonEditorTab() {
  requirejs(["const"], function(uConst) {
    uConst.get("RELOAD_JSON_EDITOR_TAB")();
  });
}

function removeChallenge() {
  requirejs(["const"], function(uConst) {
    uConst.get("REMOVE_CHALLENGE")();
  });
}

function removeChallengeReset(rowId) {
  requirejs(["const"], function(uConst) {
    uConst.get("REMOVE_CHALLENGE_RESET")(rowId);
  });
}

function removeNote() {
  requirejs(["const"], function(uConst) {
    uConst.get("REMOVE_NOTE")();
  });
}

function removeNoteDuringAddNewChallenge(rowId, challengeType, itemType, itemPath) {
  requirejs(["const"], function(uConst) {
    uConst.get("REMOVE_NOTE_DURING_ADD_NEW_CHALLENGE")(rowId, challengeType, itemType, itemPath);
  });
}

function removeNoteModalReset(rowId, challengeType, itemType, itemPath) {
  requirejs(["const"], function(uConst) {
    uConst.get("REMOVE_NOTE_MODAL_RESET")(rowId, challengeType, itemType, itemPath);
  });
}

function resetAdditionSelect() {
  requirejs(["const"], function(uConst) {
    uConst.get("RESET_ADDITION_SELECT")();
  });
}

function resetChallengeTypeSelect() {
  requirejs(["const"], function(uConst) {
    uConst.get("RESET_CHALLENGE_TYPE_SELECT")();
  });
}

function resetPersonSelect() {
  requirejs(["const"], function(uConst) {
    uConst.get("RESET_PERSON_SELECT")();
  });
}

function resetPersonTypeSelect() {
  requirejs(["const"], function(uConst) {
    uConst.get("RESET_PERSON_TYPE_SELECT")();
  });
}

function resetRequiredNotes() {
  requirejs(["const"], function(uConst) {
    uConst.get("RESET_REQUIRED_NOTES")();
  });
}

function saveFile() {
  requirejs(["const"], function(uConst) {
    uConst.get("SAVE_FILE")();
  });
}

function setChecklistStatus(newValue) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_CHECKLIST_STATUS")(newValue);
  });
}

function setChecklistStatusWithNotesReset(newValue, rowId) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_CHECKLIST_STATUS_WITH_NOTES_RESET")(newValue, rowId);
  });
}

function setFileContentFromJsonEditor() {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_FILE_CONTENT_FROM_JSON_EDITOR")();
  });
}

function setNoteCellModeToForm(rowId, challengeType, itemType, itemPath) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_NOTE_SELL_MODE_TO_FORM")(rowId, challengeType, itemType, itemPath);
  });
}

function setRandomBibleChapter(language) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_RANDOM_BIBLE_CHAPTER")(language);
  });
}

function setValueAsAddDatetimeSuffixToFilenameWithoutExtension(checked) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_VALUE_AS_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION")(checked);
  });
}

function setValueAsFilenameWithoutExtension(value) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_VALUE_AS_FILENAME_WITHOUT_EXTENSION")(value);
  });
}

function setValueAsOwner(value) {
  requirejs(["const"], function(uConst) {
    uConst.get("SET_VALUE_AS_OWNER")(value);
  });
}

function showLoadFileWarningIfNeeded() {
  requirejs(["const"], function(uConst) {
    uConst.get("SHOW_LOAD_FILE_WARNING_IF_NEEDED")();
  });
}
