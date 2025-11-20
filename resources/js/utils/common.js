define(["const", "file", "language"], function(uConst, uFile, uLanguage) {

  uConst
    .set("COMMON/CONST_NAME_PREFIX", "COMMON/")

    .set(
      "COMMON/PATRON_ROLE_NAMES", {
        'lang-patron-role-name-patron-guide': 'P',
        'lang-patron-role-name-patron-defender': 'A',
        'lang-patron-role-name-patron-guardian': 'T',
        'lang-patron-role-name-patron-advocate': 'R',
        'lang-patron-role-name-patron-helper': 'O',
        'lang-patron-role-name-patron-mentor': 'N',
        'lang-patron-role-name-patron-name': 'YN',
        'lang-patron-role-name-mission-apostle': 'MA',
        'lang-patron-role-name-mission-messenger': 'MM',
        "lang-patron-role-name-mission-piety": "MP"
      }
    )
    .set(
      "COMMON/PATRON_ROLE_COLORS", {
        'lang-patron-role-color-white': ['P'],
        'lang-patron-role-color-indigo': ['A', 'T', 'R'],
        'lang-patron-role-color-green': ['A', 'T'],
        'lang-patron-role-color-violet': ['A', 'R'],
        'lang-patron-role-color-orange': ['T', 'R'],
        'lang-patron-role-color-blue': ['A'],
        'lang-patron-role-color-yellow': ['T'],
        'lang-patron-role-color-red': ['R'],
        'lang-patron-role-color-black': []
      }
    )
    .set(
      "COMMON/PATRON_ROLE_STONES", {
        'lang-patron-role-stone-diamond': ['P'],
        'lang-patron-role-stone-corundum': ['O'],
        'lang-patron-role-stone-topaz': ['N'],
        'lang-patron-role-stone-quartz': ['A', 'T', 'R'],
        'lang-patron-role-stone-coal': []
      }
    )

    .set("COMMON/MARKDOWN_FILE_EXTENSION", '.md')

    .set("COMMON/MARKDOWN_FILES_ROOT_PATH", '/files/resources/md/')

    .set("COMMON/PERSONS_JSON_FILE", "/files/data/generated/persons-data.generated.json")
    .set("COMMON/DESCRIPTION_CONTENT_BLOCK_TEMPLATE_FILE_PATH", '/files/resources/html/content-blocks/challenges-description-content-block.html')

    .set("COMMON/CHALLENGES_CONFIG_JSON_FILE", '/files/data/challenges.json')

    .set("COMMON/MAX_PROGRESS_POINTS_PER_CHALLENGE_TYPE", 7)

    .set("COMMON/PERSONS_DATA_FIELD_NAMES", 'names')

    .set("COMMON/PERSON_ID_PREFIX_GOD", 'god')
    .set("COMMON/PERSON_ID_PREFIX_ME", 'me')
    .set("COMMON/PERSON_ID_PREFIX_PATRONS", 'patrons')

    .set("COMMON/CHALLENGE_STATUS_IN_DATA_ABORTED", false)
    .set("COMMON/CHALLENGE_STATUS_IN_DATA_WAITING", null)
    .set("COMMON/CHALLENGE_STATUS_IN_DATA_DONE", true)

    .set("COMMON/CHALLENGE_STATUS_TODO", 'todo')
    .set("COMMON/CHALLENGE_STATUS_ABORTED", 'aborted')
    .set("COMMON/CHALLENGE_STATUS_WAITING", 'waiting')
    .set("COMMON/CHALLENGE_STATUS_WAITING_WITH_ONLY_LONG_TERM_STEPS_REMAINING", 'waiting-with-only-long-term-steps-remaining')
    .set("COMMON/CHALLENGE_STATUS_DONE_WITHOUT_ANY_OPTIONAL_STEPS", 'done-without-any-optional-steps')
    .set("COMMON/CHALLENGE_STATUS_DONE", 'done')

    .set("COMMON/DATA_FIELD_CHALLENGES", 'challenges')
    .set("COMMON/DATA_FIELD_FILENAME_WITHOUT_EXTENSION", 'filename-without-extension')
    .set("COMMON/DATA_FIELD_ADD_DATETIME_SUFFIX_TO_FILENAME_WITHOUT_EXTENSION", 'add-datetime-suffix-to-filename-without-extension')
    .set("COMMON/DATA_FIELD_ADDITION", 'addition')
    .set("COMMON/DATA_FIELD_DATE", 'date')
    .set("COMMON/DATA_FIELD_OWNER", 'owner')
    .set("COMMON/DATA_FIELD_CHECKLIST", 'checklist')
    .set("COMMON/DATA_FIELD_NOTES", 'notes')
    .set("COMMON/DATA_FIELD_PERSON", 'person')
    .set("COMMON/DATA_FIELD_TYPE", 'type')

    .set("COMMON/CONFIG_FIELD_ADDITION_TYPE", 'addition-type')
    .set("COMMON/CONFIG_FIELD_CHECKLIST", 'checklist')
    .set("COMMON/CONFIG_FIELD_LONG_TERM_STEP", 'long-term-step')
    .set("COMMON/CONFIG_FIELD_NOTES", 'notes')
    .set("COMMON/CONFIG_FIELD_REQUIRED", 'required')
    .set("COMMON/CONFIG_FIELD_SELECTABLE", 'selectable')
    .set("COMMON/CONFIG_FIELD_TO_COMPLETE_ON_SELECTED_DATE", 'to-complete-on-selected-date')

    .set("COMMON/WEEKDAY_LANGUAGE_VARIABLES_PREFIX", 'lang-weekday-abbreviation-')
  ;

  let personsData = {};

  async function getChallengesConfig() {
    return await uFile.getJsonFromFile(uConst.get("COMMON/CHALLENGES_CONFIG_JSON_FILE"));
  }

  function getChallengeStatus(challenge, challengesConfig) {
    const challengeType = getChallengeType(challenge);
    const checklistData = getChallengeChecklist(challenge);

    let isAnyStep = false;
    let isAnyStepAborted = false;
    let isAnyStepWaiting = false;
    let areAllWaitingStepsLongTerm = true;
    let areAllWaitingStepsNotRequired = true;

    for (const stepId of Object.keys(checklistData)) {
      isAnyStep = true;

      const stepStatus = checklistData[stepId] ?? uConst.get("COMMON/CHALLENGE_STATUS_IN_DATA_WAITING");
      const isStepRequired = getChallengeConfigChecklistStepRequired(challengesConfig, challengeType, stepId);
      const isLongTermStep = getChallengeConfigChecklistLongTermStep(challengesConfig, challengeType, stepId);

      switch (stepStatus) {
        case uConst.get("COMMON/CHALLENGE_STATUS_IN_DATA_WAITING"):
          isAnyStepWaiting = true;
          if (!isLongTermStep && isStepRequired) {
            areAllWaitingStepsLongTerm = false;
          }
          if (isStepRequired) {
            areAllWaitingStepsNotRequired = false;
          }
          break;

        case uConst.get("COMMON/CHALLENGE_STATUS_IN_DATA_ABORTED"):
          isAnyStepAborted = true;
          break;
      }
    }

    if (!isAnyStep) {
      return uConst.get("COMMON/CHALLENGE_STATUS_TODO");
    }

    if (isAnyStepAborted && (!isAnyStepWaiting || areAllWaitingStepsNotRequired)) {
      return uConst.get("COMMON/CHALLENGE_STATUS_ABORTED");
    }

    if (isAnyStepWaiting) {
      if (areAllWaitingStepsNotRequired) {
        return uConst.get("COMMON/CHALLENGE_STATUS_DONE_WITHOUT_ANY_OPTIONAL_STEPS");
      }

      if (areAllWaitingStepsLongTerm) {
        return uConst.get("COMMON/CHALLENGE_STATUS_WAITING_WITH_ONLY_LONG_TERM_STEPS_REMAINING");
      }

      return uConst.get("COMMON/CHALLENGE_STATUS_WAITING");
    }

    return uConst.get("COMMON/CHALLENGE_STATUS_DONE");
  }

  function getChallengeChecklist(challenge) {
    return challenge[uConst.get("COMMON/DATA_FIELD_CHECKLIST")] ?? {};
  }

  function getChallengeConfigChecklist(challengesConfig, challengeType) {
    return (challengesConfig[challengeType] ?? {})[uConst.get("COMMON/CONFIG_FIELD_CHECKLIST")] ?? {};
  }

  function getChallengeConfigChecklistLongTermStep(challengesConfig, challengeType, stepId) {
    const configChecklist = getChallengeConfigChecklist(challengesConfig, challengeType);

    return (configChecklist[stepId] ?? {})[uConst.get("COMMON/CONFIG_FIELD_LONG_TERM_STEP")] ?? false;
  }

  function getChallengeConfigChecklistStepRequired(challengesConfig, challengeType, stepId) {
    const configChecklist = getChallengeConfigChecklist(challengesConfig, challengeType);

    return (configChecklist[stepId] ?? {})[uConst.get("COMMON/CONFIG_FIELD_REQUIRED")] ?? true;
  }

  function getChallengeAddition(challenge) {
    return challenge[uConst.get("COMMON/DATA_FIELD_ADDITION")] ?? '';
  }

  function getChallengeDate(challenge) {
    return challenge[uConst.get("COMMON/DATA_FIELD_DATE")] ?? '';
  }

  function getChallengePerson(challenge) {
    return challenge[uConst.get("COMMON/DATA_FIELD_PERSON")] ?? '';
  }

  function getChallengeType(challenge) {
    return challenge[uConst.get("COMMON/DATA_FIELD_TYPE")] ?? '';
  }

  function getConst(name) {
    return uConst.get(uConst.get("COMMON/CONST_NAME_PREFIX") + name);
  }

  function getFileDataChallenges(fileData) {
    return fileData[uConst.get("COMMON/DATA_FIELD_CHALLENGES")] ?? [];
  }

  function getPatronRoles(challengesTypesCounts) {
    let result = '';

    const names = uConst.get("COMMON/PATRON_ROLE_NAMES");
    let separator = '';
    for (const nameLang in names) {
      const nameId = names[nameLang];

      if (challengesTypesCounts[nameId] !== undefined) {
        result += (separator + uLanguage.getTranslation(nameLang, true));
        separator = ', ';
      }
    }

    return result;
  }

  function getPatronStatusInfo(challengesTypesCounts) {
    let color = '!!!';
    const colors = uConst.get("COMMON/PATRON_ROLE_COLORS");
    for (const colorLang in colors) {
      const challengeIds = colors[colorLang];

      let hasAll = true;
      for (const challengeId of challengeIds) {
        if (challengesTypesCounts[challengeId] === undefined) {
          hasAll = false;
          break;
        }

      }

      if (hasAll) {
        color = uLanguage.getTranslation(colorLang);
        break;
      }
    }

    let stone = '!!!';
    const stones = uConst.get("COMMON/PATRON_ROLE_STONES");
    for (const stoneLang in stones) {
      const challengeIds = stones[stoneLang];

      stone = uLanguage.getTranslation(stoneLang);

      let found = false;
      for (const challengeId of challengeIds) {
        if (challengesTypesCounts[challengeId] !== undefined) {
          found = true;
          break;
        }
      }

      if (found) {
        break;
      }
    }

    return color + ' ' + stone;
  }

  function getPersonDataAdditionName(personId, additionType, additionId) {
    const data = ((personsData[personId] ?? {})[additionType] ?? {})[additionId] ?? {};

    return uLanguage.getTranslation(uConst.get("COMMON/PERSONS_DATA_FIELD_NAMES"), true, data[uConst.get("COMMON/PERSONS_DATA_FIELD_NAMES")] ?? []);
  }

  function getPersonDataName(personId) {
    const data = personsData[personId] ?? [];

    return uLanguage.getTranslation(uConst.get("COMMON/PERSONS_DATA_FIELD_NAMES"), true, data[uConst.get("COMMON/PERSONS_DATA_FIELD_NAMES")] ?? []);
  }

  function getPersonProgressPoints(challengeTypeCounts) {
    let result = 0;
    const maxPoints = uConst.get("COMMON/MAX_PROGRESS_POINTS_PER_CHALLENGE_TYPE");

    for (const count of Object.values(challengeTypeCounts)) {
      result += Math.min(maxPoints, count);
    }

    return result;
  }

  function isPersonIdForGod(personId) {
    return personId.split('/')[0] === uConst.get('COMMON/PERSON_ID_PREFIX_GOD');
  }

  function isPersonIdForMe(personId) {
    return personId.split('/')[0] === uConst.get('COMMON/PERSON_ID_PREFIX_ME');
  }

  function isPersonIdForPatrons(personId) {
    return personId.split('/')[0] === uConst.get('COMMON/PERSON_ID_PREFIX_PATRONS');
  }

  async function loadPersonsDataFile() {
    personsData = await uFile.getJsonFromFile(uConst.get("COMMON/PERSONS_JSON_FILE"));

    return personsData;
  }

  return {
    getChallengesConfig,
    getChallengeAddition,
    getChallengeDate,
    getChallengePerson,
    getChallengeStatus,
    getChallengeType,
    getConst,
    getFileDataChallenges,
    getPatronRoles,
    getPatronStatusInfo,
    getPersonDataAdditionName,
    getPersonDataName,
    getPersonProgressPoints,
    isPersonIdForGod,
    isPersonIdForMe,
    isPersonIdForPatrons,
    loadPersonsDataFile
  };

});
