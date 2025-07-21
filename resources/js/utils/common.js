define(["const", "file", "language"], function(uConst, uFile, uLanguage) {

  uConst
    .set("COMMON/CONST_NAME_PREFIX", "COMMON/")

    .set("COMMON/PERSONS_JSON_FILE", "/files/data/generated/persons-data.generated.json")

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
    getPersonDataAdditionName,
    getPersonDataName,
    getPersonProgressPoints,
    isPersonIdForGod,
    isPersonIdForMe,
    isPersonIdForPatrons,
    loadPersonsDataFile
  };

});
