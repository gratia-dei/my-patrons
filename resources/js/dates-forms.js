requirejs(["const", "date", "dom", "env", "location", "useful"], function(uConst, uDate, uDom, uEnv, uLocation, uUseful) {

  uConst
    .set("FORM_ERROR_MESSAGE_ID_PREFIX", "form-error-message-")
    .set("ERROR_ICON", "<img class=\"svg-image\" src=\"/files/resources/svg/calendar-x-fill.svg\" />")

    .set("LEAP_YEAR_SEPARATOR", "!")
    .set("NON_LEAP_YEAR_SEPARATOR", "-")

    .set("FORM_TYPE_ELEMENT_ID", "form-type")
    .set("DATE_CHANGE_FORM_ELEMENT_ID", "date-change-form")

    .set("FORM_TYPE_SINGLE_FULL", "single-full")
    .set("FORM_TYPE_MULTI_YEAR_DAYS", "multi-year-days")

    .set("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX", "year-")
    .set("FORM_FIELD_MONTH_ELEMENT_ID_PREFIX", "month-")
    .set("FORM_FIELD_DAY_ELEMENT_ID_PREFIX", "day-")
    .set("FORM_FIELD_ACTIVITY_ELEMENT_ID_PREFIX", "activity-")
    .set("FORM_FIELD_DATE_SELECTION_ELEMENT_ID_PREFIX", "date-selection-")

    .set("CLEAR_FORM_ERROR_MESSAGE", clearFormErrorMessage)
    .set("GO_TO_NEXT_FULL_DATE", goToNextFullDate)
    .set("GO_TO_PREVIOUS_FULL_DATE", goToPreviousFullDate)
    .set("GO_TO_SELECTED_FULL_DATE", goToSelectedFullDate)
    .set("GO_TO_SELECTED_YEAR_DAYS", goToSelectedYearDays)
    .set("REFRESH_MULTI_YEAR_DAYS_FORM_STATUS", refreshMultiYearDaysFormStatus)

    .set("FORM_VISIBLE_MODE_FIELD_NAME", 'form')
    .set("FORM_VISIBLE_MODE_FIELD_VALUE", 'hidden')
  ;

  function goToPath(newPath, lastElementToCompare) {
    const pathLastElement = uLocation.getPathLastElement();
    const locationSearch = uLocation.getSearch();

    if (pathLastElement == lastElementToCompare) {
      uEnv.getWindow().location = newPath + locationSearch;
    } else {
      const path = uLocation.getPath();
      uEnv.getWindow().location = path + "/" + newPath + locationSearch;
    }
  }

  function getSettedFullDate() {
    let dateStr = uLocation.getPathLastElement();

    if (!uDate.isValid(dateStr)) {
      return uDate.getCurrentDate();
    }

    return dateStr;
  }

  function goToNextFullDate() {
    const dateStr = getSettedFullDate();
    const nextDateStr = uDate.getDateMovedByDays(dateStr, 1);

    if (nextDateStr === null) {
      setFormErrorMessage(1, uConst.get("ERROR_ICON"));
    } else {
      goToPath(nextDateStr, dateStr);
    }
  }

  function goToPreviousFullDate() {
    const dateStr = getSettedFullDate();
    const previousDateStr = uDate.getDateMovedByDays(dateStr, -1);

    if (previousDateStr === null) {
      setFormErrorMessage(1, uConst.get("ERROR_ICON"));
    } else {
      goToPath(previousDateStr, dateStr);
    }
  }

  function clearFormErrorMessage(id) {
    setFormErrorMessage(id, "");
  }

  function goToSelectedFullDate() {
    clearFormErrorMessage(1);

    const dateStr = getSettedFullDate();

    const year1000 = uDom.getElementById(uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + "1000").value;
    const year100 = uDom.getElementById(uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + "100").value;
    const year10 = uDom.getElementById(uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + "10").value;
    const year1 = uDom.getElementById(uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + "1").value;
    const year = year1000 * 1000 + year100 * 100 + year10 * 10 + year1 * 1;
    const monthStr = uDom.getElementById(uConst.get("FORM_FIELD_MONTH_ELEMENT_ID_PREFIX") + "1").value;
    const dayStr = uDom.getElementById(uConst.get("FORM_FIELD_DAY_ELEMENT_ID_PREFIX") + "1").value;

    const selectedDateStr = year.toString() + "-" + monthStr + "-" + dayStr;

    if (!uDate.isValid(selectedDateStr)) {
      setFormErrorMessage(1, uConst.get("ERROR_ICON"));
      return;
    }

    goToPath(selectedDateStr, dateStr);
  }

  function setFormErrorMessage(id, message) {
    uDom.getElementById(uConst.get("FORM_ERROR_MESSAGE_ID_PREFIX") + id).innerHTML = message;
  }

  function buildSingleFullForm() {
    const dateStr = getSettedFullDate();

    let year = uDate.getIntYear(dateStr);
    const monthStr = uDate.getMonth(dateStr);
    const dayStr = uDate.getDay(dateStr);

    let yearDigit = 0;
    let yearElementId = uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + "1";
    for (let i = 0; i <= 3; i++) {
      digit = year % 10;
      makeSelectOptionSelected(yearElementId, digit.toString());

      year = Math.floor(year / 10);
      yearElementId += "0";
    }

    makeSelectOptionSelected(uConst.get("FORM_FIELD_MONTH_ELEMENT_ID_PREFIX") + "1", monthStr);
    makeSelectOptionSelected(uConst.get("FORM_FIELD_DAY_ELEMENT_ID_PREFIX") + "1", dayStr);
  }

  function makeSelectOptionSelected(selectId, optionValue) {
    let select = uDom.getElementById(selectId);
    if (!select || !select.options) {
      return;
    }

    for (let optionId in select.options) {
      if (isNaN(optionId) || isNaN(parseInt(optionId))) {
        continue;
      }

      if (select.options[optionId].value == optionValue) {
        select.options[optionId].selected = true;
      }
    }
  }

  function getSettedMultiYearDays() {
    let lastPathElement = uLocation.getPathLastElement();

    let yearDays = getYearDaysFromString(lastPathElement);
    if (yearDays.length < 1) {
      dateStr = uDate.getCurrentDate();

      const year = parseInt(uDate.getIntYear(dateStr));
      const separator = uConst.get(uDate.isYearLeap(year)
        ? "LEAP_YEAR_SEPARATOR"
        : "NON_LEAP_YEAR_SEPARATOR"
      );
      const yearDay = uDate.getMonth(dateStr) + separator + uDate.getDay(dateStr);

      yearDays = [yearDay];
    }

    return yearDays;
  }

  function getYearDaysFromString(yearDaysString) {
    yearDaysString = yearDaysString.replace(/^[,]+/, ""); //remove leading commas

    const yearDays = yearDaysString.split(",");
    for (let yearDay of yearDays) {
      if (yearDay != "" && !yearDay.match(/^\d{2}[-!]\d{2}$/)) {
        return [];
      }
    }

    return yearDays;
  }

  function buildMultiYearDaysForm() {
    const yearDays = getSettedMultiYearDays();

    let rowId = 0;
    for (let yearDay of yearDays) {
      rowId++;

      if (yearDay == "") {
        continue;
      }

      const activity = uDom.getElementById(uConst.get("FORM_FIELD_ACTIVITY_ELEMENT_ID_PREFIX") + rowId);
      const year = uDom.getElementById(uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + rowId);

      activity.checked = true;
      if (yearDay[2] === uConst.get("LEAP_YEAR_SEPARATOR")) {
        year.checked = true;
      }

      makeSelectOptionSelected(uConst.get("FORM_FIELD_MONTH_ELEMENT_ID_PREFIX") + rowId, yearDay.substring(0, 2));
      makeSelectOptionSelected(uConst.get("FORM_FIELD_DAY_ELEMENT_ID_PREFIX") + rowId, yearDay.substring(3));
    }

    refreshMultiYearDaysFormStatus();
  }

  function refreshMultiYearDaysFormStatus() {
    let rowId = 0;
    while (true) {
      rowId++;

      const select = uDom.getElementById(uConst.get("FORM_FIELD_DATE_SELECTION_ELEMENT_ID_PREFIX") + rowId);
      const activity = uDom.getElementById(uConst.get("FORM_FIELD_ACTIVITY_ELEMENT_ID_PREFIX") + rowId);
      if (select == null || activity == null) {
        break;
      }

      uUseful.makeVisibility(select, (activity.checked || rowId == 1));
    }
  }

  function goToSelectedYearDays() {
    let yearDays = [];

    const oldYearDays = getSettedMultiYearDays();
    let wasAnyError = false;
    let rowId = 0;
    while (true) {
      rowId++;

      const activity = uDom.getElementById(uConst.get("FORM_FIELD_ACTIVITY_ELEMENT_ID_PREFIX") + rowId);
      if (activity == null) {
        break;
      }

      if (activity.checked) {
        const isYearLeap = uDom.getElementById(uConst.get("FORM_FIELD_YEAR_ELEMENT_ID_PREFIX") + rowId).checked;

        const yearStr = isYearLeap ? uDate.getLeapYearExample() : uDate.getNonLeapYearExample();
        const monthStr = uDom.getElementById(uConst.get("FORM_FIELD_MONTH_ELEMENT_ID_PREFIX") + rowId).value;
        const dayStr = uDom.getElementById(uConst.get("FORM_FIELD_DAY_ELEMENT_ID_PREFIX") + rowId).value;

        if (!uDate.isValid(yearStr + "-" + monthStr + "-" + dayStr)) {
          setFormErrorMessage(rowId, uConst.get("ERROR_ICON"));
          wasAnyError = true;
        }

        const separator = uConst.get(isYearLeap
          ? "LEAP_YEAR_SEPARATOR"
          : "NON_LEAP_YEAR_SEPARATOR"
        );
        let yearDay = monthStr + separator + dayStr;
        yearDays.push(yearDay);
      } else {
        yearDays.push("");
      }
    }

    if (!wasAnyError) {
      goToPath(yearDays.join(","), oldYearDays.join(","));
    }
  }

  function build() {
    const params = uLocation.getUrlSearchParams();
    const formVisibleMode = uLocation.getSearchParam(params, uConst.get("FORM_VISIBLE_MODE_FIELD_NAME")) ?? '';

    if (formVisibleMode !== uConst.get("FORM_VISIBLE_MODE_FIELD_VALUE")) {
      const formType = uDom.getElementById(uConst.get("FORM_TYPE_ELEMENT_ID")).value;
      if (formType == uConst.get("FORM_TYPE_SINGLE_FULL")) {
        buildSingleFullForm();
      } else if (formType == uConst.get("FORM_TYPE_MULTI_YEAR_DAYS")) {
        buildMultiYearDaysForm();
      }

      const formElement = uDom.getElementById(uConst.get("DATE_CHANGE_FORM_ELEMENT_ID"));
      uUseful.makeVisibility(formElement, true);
    }
  }

  build();
});

function clearFormErrorMessage(id) {
  requirejs(["const"], function(uConst) {
    uConst.get("CLEAR_FORM_ERROR_MESSAGE")(id);
  });
}

function goToSelectedYearDays() {
  requirejs(["const"], function(uConst) {
    uConst.get("GO_TO_SELECTED_YEAR_DAYS")();
  });
}

function goToNextFullDate() {
  requirejs(["const"], function(uConst) {
    uConst.get("GO_TO_NEXT_FULL_DATE")();
  });
}

function goToPreviousFullDate() {
  requirejs(["const"], function(uConst) {
    uConst.get("GO_TO_PREVIOUS_FULL_DATE")();
  });
}

function goToSelectedFullDate() {
  requirejs(["const"], function(uConst) {
    uConst.get("GO_TO_SELECTED_FULL_DATE")();
  });
}

function refreshMultiYearDaysFormStatus() {
  requirejs(["const"], function(uConst) {
    uConst.get("REFRESH_MULTI_YEAR_DAYS_FORM_STATUS")();
  });
}
