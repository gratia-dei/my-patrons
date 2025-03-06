define(["const"], function(uConst) {

  uConst
    .set("USEFUL/CHECKBOX_CHECKED", "checked")

    .set("USEFUL/STYLE_DISPLAY_INVISIBLE", "none")
    .set("USEFUL/STYLE_DISPLAY_VISIBLE", "")

    .set("USEFUL/SELECT_OPTION_SELECTED", "selected")
  ;

  function makeAsChecked(element) {
    element.checked = uConst.get("USEFUL/CHECKBOX_CHECKED");
  }

  function makeAsSelected(element) {
    element.selected = uConst.get("USEFUL/SELECT_OPTION_SELECTED");
  }

  function makeVisibility(element, isVisible) {
    element.style.display = uConst.get(isVisible ? "USEFUL/STYLE_DISPLAY_VISIBLE" : "USEFUL/STYLE_DISPLAY_INVISIBLE");
  }

  return {
    makeAsChecked,
    makeAsSelected,
    makeVisibility
  };

});
