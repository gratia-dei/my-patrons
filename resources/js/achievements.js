requirejs([], function() {

  function build() {
  };

  //const ACHIEVEMENTS_GENERAL_ALL = 'lang-achievements-section-general-number-of-challenges-started';
  //const ACHIEVEMENTS_GENERAL_DONE_COMPLETELY = 'lang-achievements-section-general-done-completely';
  //const ACHIEVEMENTS_GENERAL_DONE = 'lang-achievements-section-general-done-without-some-optional-steps';
  //const ACHIEVEMENTS_GENERAL_WAITING = 'lang-achievements-section-general-waiting-to-be-completed';
  //const ACHIEVEMENTS_GENERAL_ABORTED = 'lang-achievements-section-general-aborted';
  //const ACHIEVEMENTS_GENERAL_TODO = 'lang-achievements-section-general-with-todo-status';

  //const ACHIEVEMENTS_GENERAL_TABLE_ELEMENT_ID = 'achievements-general-table';

  //function resetAchievements(fileData) {
    //const data = {};

    //let rowId = 0;
    //for (const challenge of fileData[DATA_FIELD_CHALLENGES] ?? []) {
      //rowId++;

      //const successStatus = getChallengeSuccessStatus(rowId);
      //const checklistSteps = challenge[DATA_FIELD_CHECKLIST] ?? {};

      ////general
      //data[ACHIEVEMENTS_GENERAL_ALL] = (data[ACHIEVEMENTS_GENERAL_ALL] ?? 0) + 1;
      //switch (successStatus) {
        //case CHALLENGE_SUCCESS_STATUS_DONE:
          //let index = ACHIEVEMENTS_GENERAL_DONE_COMPLETELY;
          //for (const statusInData of Object.values(checklistSteps)) {
            //if (statusInData === CHALLENGE_SUCCESS_STATUS_IN_DATA_WAITING) {
              //index = ACHIEVEMENTS_GENERAL_DONE;
              //break;
            //}
          //}
          //data[index] = (data[index] ?? 0) + 1;
          //break;

        //case CHALLENGE_SUCCESS_STATUS_WAITING:
          //data[ACHIEVEMENTS_GENERAL_WAITING] = (data[ACHIEVEMENTS_GENERAL_WAITING] ?? 0) + 1;
          //break;

        //case CHALLENGE_SUCCESS_STATUS_ABORTED:
          //data[ACHIEVEMENTS_GENERAL_ABORTED] = (data[ACHIEVEMENTS_GENERAL_ABORTED] ?? 0) + 1;
          //break;

        //case CHALLENGE_SUCCESS_STATUS_TODO:
          //data[ACHIEVEMENTS_GENERAL_TODO] = (data[ACHIEVEMENTS_GENERAL_TODO] ?? 0) + 1;
          //break;
      //}
    //}

    ////general
    //const labels = {
      //[ACHIEVEMENTS_GENERAL_ALL]: true,
      //[ACHIEVEMENTS_GENERAL_DONE_COMPLETELY]: false,
      //[ACHIEVEMENTS_GENERAL_DONE]: false,
      //[ACHIEVEMENTS_GENERAL_WAITING]: false,
      //[ACHIEVEMENTS_GENERAL_ABORTED]: false,
      //[ACHIEVEMENTS_GENERAL_TODO]: false
    //};
    //const showCountZeroRows = false;
    //createAchievementCounterTable(data, ACHIEVEMENTS_GENERAL_TABLE_ELEMENT_ID, labels, data[ACHIEVEMENTS_GENERAL_ALL] ?? 0, showCountZeroRows);
  //}

  //function createAchievementCounterTable(data, tableElementId, labels, houndredPercentCount = 0, showCountZeroRows = true) {
    //const tableElement = document.getElementById(tableElementId);
    //tableElement.innerHTML = '';

    //let isFirstRow = true;
    //for (const label of Object.keys(labels)) {
      //const isUpperCase = labels[label] ?? false;
      //const count = data[label] ?? 0;
      //if (!showCountZeroRows && count === 0) {
        //continue;
      //}

      //const row = document.createElement('tr');

      //const nameCell = document.createElement('td');
      //const name = uLanguage.getTranslation(label, isUpperCase);
      //nameCell.innerHTML = (isFirstRow ? '' : '- ') + name;
      //row.append(nameCell);

      //const countCell = document.createElement('td');
      //countCell.style.textAlign = 'center';
      //countCell.innerHTML = count;
      //row.append(countCell);

      //if (houndredPercentCount > 0) {
        //const percentCell = document.createElement('td');
        //const percent = Math.floor(100 * count/houndredPercentCount * 100) / 100;
        //percentCell.style.textAlign = 'center';
        //percentCell.innerHTML = '' + percent + '%';
        //row.append(percentCell);
      //}

      //tableElement.append(row);

      //isFirstRow = false;
    //}
  //}

  build();
});
