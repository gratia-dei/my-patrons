define(["const"], function(uConst) {

  uConst
    .set("DATE/MONTHS_DAYS_COUNT", [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])

    .set("DATE/NON_LEAP_YEAR_EXAMPLE", "2001")
    .set("DATE/LEAP_YEAR_EXAMPLE", "2004")

    .set("DATE/JULIAN_TO_GREGORIAN_CALENDAR_YEAR", 1582)
    .set("DATE/JULIAN_TO_GREGORIAN_CALENDAR_MONTH", 10)
    .set("DATE/LAST_JULIAN_CALENDAR_DAY", 4)
    .set("DATE/FIRST_GREGORIAN_CALENDAR_DAY", 15)
  ;

  function getCurrentDate() {
    const date = new Date();

    const yearStr = date.getFullYear().toString();
    const monthStr = (date.getMonth() + 1).toString().padStart(2, "0");
    const dayStr = date.getDate().toString().padStart(2, "0");

    return yearStr + "-" + monthStr + "-" + dayStr;
  }

  function getToday() {
    return new Date().toJSON().slice(0, 10);
  }

  function getUtcDatetime() {
    return new Date()
      .toJSON()
      .replace(/[.].*$/g, '')
      .replace('T', ' ')
    ;
  }



  function getDateParse(dateStr) {
    return Date.parse(dateStr);
  }



  function getYear(dateStr) {
    return dateStr.toString().replace(/[^0-9].+$/, "");
  }

  function getMonth(dateStr) {
    return dateStr.toString().slice(-5).substring(0, 2);
  }

  function getDay(dateStr) {
    return dateStr.toString().slice(-2);
  }

  function getWeekdayName(dateStr) {
    return new Date(dateStr).toLocaleString('en-us', {weekday: 'long'}).toLowerCase();
  }

  function getMonthName(dateStr) {
    return new Date(dateStr).toLocaleString('en-us', {month: 'long'}).toLowerCase();
  }



  function getIntYear(dateStr) {
    const valueStr = getYear(dateStr);

    return Number(valueStr);
  }

  function getIntMonth(dateStr) {
    const valueStr = getMonth(dateStr);

    return Number(valueStr);
  }

  function getIntDay(dateStr) {
    const valueStr = getDay(dateStr);

    return Number(valueStr);
  }



  function isValid(dateStr) {
    return null !== getValidYearMonthDayArray(dateStr);
  }

  function isYearLeap(year) {
    return !(year % 4 != 0 || (year % 100 == 0 && year % 400 != 0));
  }



  function getLastYearDate(dateStr) {
    const year = getIntYear(dateStr) - 1;
    const month = getMonth(dateStr);
    let day = getDay(dateStr);

    if (month === '02' && day === '29') {
      day = '28';
    }

    return getDateMovedByDays(year + "-" + month + "-" + day, 1);
  }

  function getDateMovedByDays(dateStr, daysToAdd) {
    const yearMonthDay = getValidYearMonthDayArray(dateStr);
    if (null === yearMonthDay) {
      return null;
    }

    let [year, month, day] = yearMonthDay;
    let currentMonthDaysCount = getMonthDaysCount(year, month);

    const jtgYear = uConst.get("DATE/JULIAN_TO_GREGORIAN_CALENDAR_YEAR");
    const jtgMonth = uConst.get("DATE/JULIAN_TO_GREGORIAN_CALENDAR_MONTH");
    const jtgJulianDay = uConst.get("DATE/LAST_JULIAN_CALENDAR_DAY");
    const jtgGregorianDay = uConst.get("DATE/FIRST_GREGORIAN_CALENDAR_DAY");

    while (daysToAdd !== 0) {
      if (daysToAdd > 0) {
        day++;
        if (day > currentMonthDaysCount) {
          month++;
          day = 1;
          if (month > 12) {
            year++;
            month = 1;
          }
          currentMonthDaysCount = getMonthDaysCount(year, month);
        }
        if (year === jtgYear && month === jtgMonth && day > jtgJulianDay && day < jtgGregorianDay) {
          day = jtgGregorianDay;
        }

        daysToAdd--;
      } else {
        day--;
        if (day < 1) {
          month--;
          day = getMonthDaysCount(year, month);
          if (month < 1) {
            year--;
            month = 12;
          }
        }
        if (year === jtgYear && month === jtgMonth && day > jtgJulianDay && day < jtgGregorianDay) {
          day = jtgJulianDay;
        }

        daysToAdd++;
      }
    }

    const yearStr = year.toString();
    const monthStr = month.toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");

    return yearStr + "-" + monthStr + "-" + dayStr;
  }

  function getDatesDiffInDays(firstDateStr, secondDateStr) {
    const dayMiliseconds = 24 * 60 * 60 * 1000;
    const firstDate = Date.parse(firstDateStr);
    const secondDate = Date.parse(secondDateStr);
    const diffInDays = Math.round((firstDate - secondDate) / dayMiliseconds);

    return diffInDays;
  }

  function getMonthDaysCount(year, month) {
    const allMonthsDays = uConst.get("DATE/MONTHS_DAYS_COUNT");

    if (month >= 1 && month <= 12) {
      const monthDays = allMonthsDays[month] ?? null;

      if (month === 2 && isYearLeap(year)) {
        return monthDays + 1;
      }

      return monthDays;
    }

    return null;
  }



  function getLeapYearExample() {
    return uConst.get("DATE/LEAP_YEAR_EXAMPLE");
  }

  function getNonLeapYearExample() {
    return uConst.get("DATE/NON_LEAP_YEAR_EXAMPLE");
  }



  function getValidYearMonthDayArray(dateStr) {
    const matches = dateStr.match(/^([0-9]{1,4})-([0-9]{2})-([0-9]{2})$/);
    if (!matches) {
      return null;
    }

    const yearStr = matches[1];
    const monthStr = matches[2];
    const dayStr = matches[3];

    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    const monthDaysCount = getMonthDaysCount(year, month);

    if (year < 1 || month < 1 || month > 12 || day < 1 || day > monthDaysCount) {
      return null;
    }

    return [year, month, day];
  }

  return {
    getCurrentDate,
    getToday,
    getUtcDatetime,

    getDateParse,

    getDay,
    getMonth,
    getYear,
    getWeekdayName,
    getMonthName,

    getIntDay,
    getIntMonth,
    getIntYear,

    isValid,
    isYearLeap,

    getLastYearDate,
    getDateMovedByDays,
    getDatesDiffInDays,

    getNonLeapYearExample,
    getLeapYearExample
  };

});
