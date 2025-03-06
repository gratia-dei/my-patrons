define(["const"], function(uConst) {

  uConst
    .set("USEFUL/CHECKBOX_CHECKED", "checked")

    .set("USEFUL/STYLE_DISPLAY_INVISIBLE", "none")
    .set("USEFUL/STYLE_DISPLAY_VISIBLE", "")

    .set("USEFUL/SELECT_OPTION_SELECTED", "selected")

    .set("USEFUL/MISSING_INDEX_OF_VALUE", -1)
  ;

  function getStringWithTidySpaces(string) {
    return string
      .replace(/\s+/g, ' ')
      .trim()
    ;
  }

  function inArray(value, array) {
    return array.indexOf(value) !== uConst.get("USEFUL/MISSING_INDEX_OF_VALUE");
  }

  function makeAsChecked(element) {
    element.checked = uConst.get("USEFUL/CHECKBOX_CHECKED");
  }

  function makeAsSelected(element) {
    element.selected = uConst.get("USEFUL/SELECT_OPTION_SELECTED");
  }

  function makeVisibility(element, isVisible) {
    element.style.display = uConst.get(isVisible ? "USEFUL/STYLE_DISPLAY_VISIBLE" : "USEFUL/STYLE_DISPLAY_INVISIBLE");
  }

  async function sleep(miliseconds) {
    await new Promise(r => setTimeout(r, miliseconds));
  }

  return {
    getStringWithTidySpaces,
    inArray,
    makeAsChecked,
    makeAsSelected,
    makeVisibility,
    sleep
  };

});
