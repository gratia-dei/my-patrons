requirejs(
  ["common", "const", "date", "document", "file", "language", "notification", "useful"],
  function(uCommon, uConst, uDate, uDocument, uFile, uLanguage, uNotification, uUseful
) {

  uConst
    .set("LOAD_FILE", loadFile)
    .set("REFRESH_ALL_TABS", refreshAllTabs)
    .set("REFRESH_DATA_TABLE", refreshDataTable)

    .set("PERCENT_SIGN", "%")
    .set("CONTEXT_PREFIX", " - ")
    .set("MISSING_VALUE", "!!!")
    .set("NEWLINE_TAG", "<br />")
    .set("STRONG_TAG_OPENING", "<strong>")
    .set("STRONG_TAG_CLOSING", "</strong>")

    .set("TEXT_ALIGN_CENTER", "center")
    .set("TEXT_ALIGN_RIGHT", "right")

    .set("TABS_BUTTONS_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/achievements-tab-button-item.html')
    .set("TABS_CONTENTS_ITEM_TEMPLATE_FILE_PATH", '/files/resources/html/items/achievements-tab-content-item.html')

    .set("DATA_TABLE_ELEMENT_ID", "data-table")
    .set("DATE_INPUT_ELEMENT_ID", "date-input")
    .set("SELECT_ELEMENT_ID_PREFIX", "select-")
    .set("TABS_BUTTONS_ELEMENT_ID", "pills-tab")
    .set("TABS_CONTENTS_ELEMENT_ID", "pills-tab-content")

    .set("DATA_TABS_CONFIG", {
      "general": {
        name: "lang-achievements-section-general",
        description: "lang-achievements-section-general-description",
        method: "getTableDataForGeneral",
        options: {}
      },
      "challenge-types": {
        name: "lang-achievements-section-challenge-types",
        description: "lang-achievements-section-challenge-types-description",
        method: "getTableDataForChallengeTypes",
        options: {}
      },
      //"...": {
        //name: "lang-achievements-section-...",
        //description: "lang-achievements-section-...-description",
        //method: "getTableDataFor...",
        //options: {
          //a: "lang-...",
          //b: "lang-..."
        //}
      //},
      "coming-soon": {
        name: "lang-achievements-section-coming-soon",
        description: "lang-achievements-section-coming-soon-description",
        method: "getEmptyTable",
        options: {}
      }
    })
  ;

  let fileData = {};
  let tablesData = {};

  const methods = {



    getEmptyTable: async function (section, option) {
      return [];
    },



    getTableDataForGeneral: async function (section, option) {
      const challengesConfig = await uCommon.getChallengesConfig();

      const selectedDateStr = uDate.getToday();
      const lastYearDateStr = uDate.getLastYearDate(selectedDateStr);

      const selectedDate = uDate.getDateParse(selectedDateStr);
      const lastYearDate = uDate.getDateParse(lastYearDateStr);

      const allSign = '_';
      const prefix = uConst.get("CONTEXT_PREFIX");
      const names = {
        [allSign]: uLanguage.getTranslation("lang-achievements-section-general-number-of-challenges-started", true),
        [uCommon.getConst("CHALLENGE_STATUS_DONE")]: prefix + uLanguage.getTranslation("lang-achievements-section-general-done-completely"),
        [uCommon.getConst("CHALLENGE_STATUS_DONE_WITHOUT_ANY_OPTIONAL_STEPS")]: prefix + uLanguage.getTranslation("lang-achievements-section-general-done-without-some-optional-steps"),
        [uCommon.getConst("CHALLENGE_STATUS_WAITING_WITH_ONLY_LONG_TERM_STEPS_REMAINING")]: prefix + uLanguage.getTranslation("lang-achievements-section-general-long-term-waiting-to-be-completed"),
        [uCommon.getConst("CHALLENGE_STATUS_WAITING")]: prefix + uLanguage.getTranslation("lang-achievements-section-general-waiting-to-be-completed"),
        [uCommon.getConst("CHALLENGE_STATUS_ABORTED")]: prefix + uLanguage.getTranslation("lang-achievements-section-general-aborted"),
        [uCommon.getConst("CHALLENGE_STATUS_TODO")]: prefix + uLanguage.getTranslation("lang-achievements-section-general-with-todo-status"),
      };

      let statusCounts = {};
      let statusCountsForLastYear = {};
      let minIds = {};
      let rowId = 0;
      for (const challenge of uCommon.getFileDataChallenges(fileData)) {
        rowId++;

        const challengeDateStr = uCommon.getChallengeDate(challenge);
        const challengeStatus = uCommon.getChallengeStatus(challenge, challengesConfig);

        const challengeDate = uDate.getDateParse(challengeDateStr);

        statusCounts[allSign] = (statusCounts[allSign] ?? 0) + 1;
        statusCounts[challengeStatus] = (statusCounts[challengeStatus] ?? 0) + 1;
        if (!minIds[challengeStatus]) {
          minIds[challengeStatus] = rowId;
        }

        if (challengeDate >= lastYearDate) {
          statusCountsForLastYear[allSign] = (statusCountsForLastYear[allSign] ?? 0) + 1;
          statusCountsForLastYear[challengeStatus] = (statusCountsForLastYear[challengeStatus] ?? 0) + 1;
        }
      }

      const nameColumnWidth = "400px";
      const iconColumnWidth = "60px";
      const lowestIdColumnWidth = "120px";

      let result = [];
      const row = {
        name: {
          style: {
            width: nameColumnWidth
          },
          content: uLanguage.getTranslation("lang-achievements-table-header-status-name", true)
        },
        icon: {
          style: {
            width: iconColumnWidth
          },
          content: ""
        },
        id: {
          style: {
            width: lowestIdColumnWidth
          },
          content: uLanguage.getTranslation("lang-achievements-table-header-lowest-id", true)
        },
        count: uLanguage.getTranslation("lang-achievements-table-header-count", true) + uConst.get("NEWLINE_TAG") + uLanguage.getTranslation("lang-achievements-table-header-last-year-suffix", true),
        percent: uLanguage.getTranslation("lang-achievements-table-header-percent", true) + uConst.get("NEWLINE_TAG") + uLanguage.getTranslation("lang-achievements-table-header-last-year-suffix", true)
      }
      result.push(row);

      for (const statusId of Object.keys(names)) {
        const name = names[statusId] ?? '';
        const minId = minIds[statusId] ?? 1;
        const count = statusCounts[statusId] ?? 0;
        const percent = getCountPercentValue(count, statusCounts[allSign] ?? 0) + uConst.get("PERCENT_SIGN");
        const lastYearCount = statusCountsForLastYear[statusId] ?? 0;
        const lastYearPercent = getCountPercentValue(lastYearCount, statusCountsForLastYear[allSign] ?? 0) + uConst.get("PERCENT_SIGN");

        if (count === 0) {
          continue;
        }

        const row = {
          name: {
            style: {
              "width": nameColumnWidth
            },
            content: name
          },
          icon: {
            style: {
              "width": iconColumnWidth,
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: '<div class="challenge-success-status-icon challenge-success-status-icon-' + statusId + '"></div>'
          },
          id: {
            style: {
              "width": lowestIdColumnWidth,
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: '#' + minId
          },
          count: {
            style: {
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: makeTextStrong(count) + uConst.get("NEWLINE_TAG") + '(' + lastYearCount + ')'
          },
          percent: {
            style: {
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: makeTextStrong(percent) + uConst.get("NEWLINE_TAG") + '(' + lastYearPercent + ')'
          }
        }
        result.push(row);
      }

      return result;
    },



    getTableDataForChallengeTypes: async function (section, option) {

      const challengesConfig = await uCommon.getChallengesConfig();

      const selectedDateStr = uDocument.getElementById(uConst.get("DATE_INPUT_ELEMENT_ID")).value ?? uDate.getToday();
      const lastYearDateStr = uDate.getLastYearDate(selectedDateStr);

      const selectedDate = uDate.getDateParse(selectedDateStr);
      const lastYearDate = uDate.getDateParse(lastYearDateStr);

      let data = {};
      let rowId = 0;
      for (const challenge of uCommon.getFileDataChallenges(fileData)) {
        rowId++;

        const challengeDateStr = uCommon.getChallengeDate(challenge);
        const challengeDate = uDate.getDateParse(challengeDateStr);
        if (challengeDate > selectedDate) {
          break;
        }

        const challengeStatus = uCommon.getChallengeStatus(challenge, challengesConfig);
        if (isChallengeStatusBreakAchievementsCalculation(challengeStatus)) {
          break;
        }
        if (isChallengeStatusIgnoreAchievementCalculation(challengeStatus)) {
          continue;
        }

        const challengeType = uCommon.getChallengeType(challenge);

        data[challengeType] = data[challengeType] ?? {
          count: 0,
          lastYearCount: 0,
          first: challengeDateStr,
          last: ''
        }
        data[challengeType].count++;
        data[challengeType].last = challengeDateStr;

        if (challengeDate >= lastYearDate) {
          data[challengeType].lastYearCount = ((data[challengeType] ?? {}).lastYearCount ?? 0) + 1;
        }
      }

      let dataArr = [];
      for (const challengeType in data) {
        let element = data[challengeType];
        element.challengeType = challengeType;

        dataArr.push(element);
      }

      const sortedDataArr = dataArr.sort(function (a, b) {
        return a.count > b.count ? -1 : a.count < b.count ? 1 : (a.first < b.first ? -1 : 1);
      });

      const rowNumberColumnWidth = "40px";
      const nameColumnWidth = "500px";

      let result = [];
      const row = {
        number: {
          style: {
            width: rowNumberColumnWidth
          },
          content: uLanguage.getTranslation("lang-achievements-table-header-row-number", true)
        },
        name: {
          style: {
            width: nameColumnWidth
          },
          content: uLanguage.getTranslation("lang-achievements-table-header-challenge-type", true)
        },
        count: uLanguage.getTranslation("lang-achievements-table-header-count", true) + uConst.get("NEWLINE_TAG") + uLanguage.getTranslation("lang-achievements-table-header-last-year-suffix", true),
        average: uLanguage.getTranslation("lang-achievements-table-header-on-average-every-how-many-days", true) + uConst.get("NEWLINE_TAG") + uLanguage.getTranslation("lang-achievements-table-header-last-year-suffix", true),
        dates: uLanguage.getTranslation("lang-achievements-table-header-date-range", true),
      }
      result.push(row);

      let rowNo = 0;
      for (const rowData of sortedDataArr) {
        rowNo++;

        const challengeType = rowData.challengeType;
        let name = uLanguage.getTranslation('name', false, (challengesConfig[challengeType] ?? {}).name ?? {})
        name += ' [' + rowData.challengeType + ']';
        const count = rowData.count;
        const lastYearCount = rowData.lastYearCount;
        const firstTime = rowData.first;
        const lastTime = rowData.last;
        const average = getCountPercentValue(uDate.getDatesDiffInDays(selectedDateStr, firstTime) + 1, count * 100);
        const lastYearAverage = lastYearCount > 0 ? getCountPercentValue(uDate.getDatesDiffInDays(selectedDateStr, lastYearDateStr) + 1, lastYearCount * 100) : '-';

        const row = {
          number: {
            style: {
              width: rowNumberColumnWidth,
              "text-align": uConst.get("TEXT_ALIGN_RIGHT")
            },
            content: rowNo + '.'
          },
          name: {
            style: {
              width: nameColumnWidth
            },
            content: makeTextStrong(name)
          },
          count: {
            style: {
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: makeTextStrong(count) + uConst.get("NEWLINE_TAG") + '(' + lastYearCount + ')'
          },
          average: {
            style: {
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: makeTextStrong(average) + uConst.get("NEWLINE_TAG") + '(' + lastYearAverage + ')'
          },
          dates: {
            style: {
              "text-align": uConst.get("TEXT_ALIGN_CENTER")
            },
            content: count <= 1 ? makeTextStrong(firstTime) : makeTextStrong(firstTime) + uConst.get("NEWLINE_TAG") + makeTextStrong(lastTime)
          }
        }
        result.push(row);
      }

      return result;
    }



  };

  async function build() {
    uDocument.getElementById(uConst.get("DATE_INPUT_ELEMENT_ID")).value = uDate.getToday();

    await uLanguage.loadTranslationsFile();
    await refreshAllTabs();
  };

  async function loadFile(input) {
    try {
      uNotification.clear();

      const data = input.files[0];
      const fileContent = await data.text();

      fileData = JSON.parse(fileContent);
      await refreshAllTabs();

      uNotification.success(uLanguage.getTranslation('lang-file-loaded-successfully', true));
    } catch (e) {
      uNotification.error(e.message);
    }
  }

  async function refreshAllTabs() {
    uNotification.clear();

    const dateInput = uDocument.getElementById(uConst.get("DATE_INPUT_ELEMENT_ID"));
    const tabsButtons = uDocument.getElementById(uConst.get("TABS_BUTTONS_ELEMENT_ID"));
    const tabsContents = uDocument.getElementById(uConst.get("TABS_CONTENTS_ELEMENT_ID"));

    const tabsButtonsItem = await uFile.getFileContent(uConst.get("TABS_BUTTONS_ITEM_TEMPLATE_FILE_PATH"));
    const tabsContentsItem = await uFile.getFileContent(uConst.get("TABS_CONTENTS_ITEM_TEMPLATE_FILE_PATH"));

    const dataTable = uDocument.getElementById(uConst.get("DATA_TABLE_ELEMENT_ID"));

    tabsButtons.innerHTML = '';
    tabsContents.innerHTML = '';
    dataTable.innerHTML = '';

    let date = dateInput.value;
    if (!uDate.isValid(date)) {
      date = uDate.getToday();
      dateInput.value = date;
    }

    const challengesConfig = await uCommon.getChallengesConfig();

    const selectedDateStr = uDocument.getElementById(uConst.get("DATE_INPUT_ELEMENT_ID")).value ?? uDate.getToday();
    const selectedDate = uDate.getDateParse(selectedDateStr);

    for (const challenge of uCommon.getFileDataChallenges(fileData)) {
      const challengeDateStr = uCommon.getChallengeDate(challenge);
      const challengeDate = uDate.getDateParse(challengeDateStr);
      if (challengeDate > selectedDate) {
        break;
      }

      const challengeStatus = uCommon.getChallengeStatus(challenge, challengesConfig);
      if (isChallengeStatusBreakAchievementsCalculation(challengeStatus)) {
        uNotification.warning(uLanguage.getTranslation('lang-achievements-unfinished-challenges-ignore-warning', true));
        dateInput.value = challengeDateStr;
        break;
      }
    }

    tablesData = {};

    const config = uConst.get("DATA_TABS_CONFIG");
    for (const sectionId in config) {
      const name = config[sectionId].name ?? '';
      const description = config[sectionId].description ?? '';
      const method = config[sectionId].method ?? '';
      const options = config[sectionId].options ?? {};

      const optionsCount = Object.keys(options).length;

      let tabButton = tabsButtonsItem;
      tabsButtons.innerHTML += tabButton
        .replace(/#section-id#/g, sectionId)
        .replace(/#section-name#/g, uLanguage.getTranslation(name))
      ;

      let tabContent = tabsContentsItem;
      tabsContents.innerHTML += tabContent
        .replace(/#section-id#/g, sectionId)
        .replace(/#section-name#/g, uLanguage.getTranslation(name))
        .replace(/#section-description#/g, uLanguage.getTranslation(description))
      ;

      let select = uDocument.getElementById(uConst.get("SELECT_ELEMENT_ID_PREFIX") + sectionId);
      uUseful.setVisibility(select, optionsCount > 0);

      tablesData[sectionId] = {};
      if (optionsCount > 0) {
        for (const optionId in options) {
          const optionName = uLanguage.getTranslation(options[optionId]);

          tablesData[sectionId][optionId] = await methods[method](sectionId, optionId);

          uDocument.addOptionToSelect(select, optionId, optionName);
        }
      } else {
        tablesData[sectionId][sectionId] = await methods[method](sectionId, sectionId);
      }
    }
  }

  function refreshDataTable(sectionId) {
    uNotification.clear();

    const dataTable = uDocument.getElementById(uConst.get("DATA_TABLE_ELEMENT_ID"));
    const select = uDocument.getElementById(uConst.get("SELECT_ELEMENT_ID_PREFIX") + sectionId);

    const optionId = select.value === '' ? sectionId : select.value;
    const data = (tablesData[sectionId] ?? {})[optionId] ?? [];

    fillDataTableContent(dataTable, data);
  }

  function getCountPercentValue(count, totalCount) {
    const result = Math.floor(100 * count / Math.max(1, totalCount) * 100) / 100;
    if (result === 0 && count > 0) {
      return 0.01;
    }

    return result.toFixed(2);
  }

  function makeTextStrong(text) {
    return uConst.get("STRONG_TAG_OPENING") + text + uConst.get("STRONG_TAG_CLOSING");
  }

  function fillDataTableContent(tableElement, data) {
    tableElement.innerHTML = '';

    if (data.length === 0) {
      return;
    }

    const totalRows = data.length;

    let type = '';
    let rowNumber = 0;
    for (const row of data) {
      if (rowNumber <= 1) {
        type = uDocument.createElement(rowNumber === 0 ? 'thead' : 'tbody');
      }

      const tr = uDocument.createElement('tr');

      for (const columnName of Object.keys(row)) {
        const td = uDocument.createElement(rowNumber === 0 ? 'th' : 'td');

        let contentObj = row[columnName] ?? '';
        if (contentObj.style !== undefined) {
          td.innerHTML = contentObj.content ?? uConst.get("MISSING_VALUE");
          for (const field of Object.keys(contentObj.style)) {
            td.style[field] = contentObj.style[field] ?? uConst.get("MISSING_VALUE");
          }
        } else {
          td.innerHTML = contentObj;
        }

        tr.append(td);
      }

      type.append(tr);

      if (rowNumber === 0 || rowNumber === totalRows - 1) {
        tableElement.append(type);
      }
      rowNumber++;
    }
  }

  function isChallengeStatusBreakAchievementsCalculation(challengeStatus) {
    return uUseful.inArray(challengeStatus, [
      uCommon.getConst("CHALLENGE_STATUS_WAITING"),
    ]);
  }

  function isChallengeStatusIgnoreAchievementCalculation(challengeStatus) {
    return uUseful.inArray(challengeStatus, [
      uCommon.getConst("CHALLENGE_STATUS_ABORTED")
    ]);
  }

  build();
});

function loadFile(input) {
  requirejs(["const"], function(uConst) {
    uConst.get("LOAD_FILE")(input);
  });
}

function refreshAllTabs() {
  requirejs(["const"], function(uConst) {
    uConst.get("REFRESH_ALL_TABS")();
  });
}

function refreshDataTable(sectionId) {
  requirejs(["const"], function(uConst) {
    uConst.get("REFRESH_DATA_TABLE")(sectionId);
  });
}
