define(["const"], function(uConst) {

  uConst
    .set("USEFUL/CHECKBOX_CHECKED", "checked")

    .set("USEFUL/STYLE_DISPLAY_INVISIBLE", "none")
    .set("USEFUL/STYLE_DISPLAY_VISIBLE", "")

    .set("USEFUL/SELECT_OPTION_SELECTED", "selected")

    .set("USEFUL/MISSING_INDEX_OF_VALUE", -1)
  ;

  function getStringWithStrippedTags(string) {
    return string
      .replace(/<([^<>]+)>/g, '\1')
    ;
  }

  function getStringWithTidySpaces(string) {
    return string
      .replace(/\s+/g, ' ')
      .trim()
    ;
  }

  function inArray(value, array) {
    return array.indexOf(value) !== uConst.get("USEFUL/MISSING_INDEX_OF_VALUE");
  }

  function isVisible(element) {
    return (element.style.display !== uConst.get("USEFUL/STYLE_DISPLAY_INVISIBLE"));
  }

  function setVisibility(element, isVisible) {
    element.style.display = uConst.get(isVisible ? "USEFUL/STYLE_DISPLAY_VISIBLE" : "USEFUL/STYLE_DISPLAY_INVISIBLE");
  }

  async function sleep(miliseconds) {
    await new Promise(r => setTimeout(r, miliseconds));
  }

  return {
    getStringWithStrippedTags,
    getStringWithTidySpaces,
    inArray,
    isVisible,
    setVisibility,
    sleep
  };

});
