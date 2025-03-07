define(["const", "env", "file", "location"], function(uConst, uEnv, uFile, uLocation) {

  uConst
    .set("LANGUAGE/LANGUAGE_JSON_FILE", "/files/data/website-language-variables.json")
    .set("LANGUAGE/LANGUAGE_MISSING_VARIABLE_SIGN", "!!!")
  ;

  let languageVariables = {};

  function getLanguage() {
    const hostname = uLocation.getHostname();

    return hostname.replace(/\..*$/, "");
  }

  function getMissingVariableSign() {
    return uConst.get("LANGUAGE/LANGUAGE_MISSING_VARIABLE_SIGN");
  }

  function getTranslation(variable, capitalize = false, variableTranslations = languageVariables[variable]) {
    let result = getMissingVariableSign();

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

  function getUserBrowserLanguage() {
    const nav = uEnv.getNavigator();

    return (nav.language || nav.userLanguage).replace(/[-].*$/, "");
  }

  function isOriginalLanguageSet() {
    return getLanguage().length > 3;
  }

  async function loadTranslationsFile() {
    languageVariables = await uFile.getJsonFromFile(uConst.get("LANGUAGE/LANGUAGE_JSON_FILE"));
  }

  return {
    getLanguage,
    getMissingVariableSign,
    getTranslation,
    getUserBrowserLanguage,
    isOriginalLanguageSet,
    loadTranslationsFile
  };

});
