define(["const"], function(uConst) {

  uConst
    .set("USEFUL/CHECKBOX_CHECKED", "checked")

    .set("USEFUL/STYLE_DISPLAY_INVISIBLE", "display: none")
    .set("USEFUL/STYLE_DISPLAY_VISIBLE", "")

    .set("USEFUL/SELECT_OPTION_SELECTED", "selected")
  ;

  function getCheckboxChecked() {
    return uConst.get("USEFUL/CHECKBOX_CHECKED");
  }

  function getSelectOptionSelected() {
    return uConst.get("USEFUL/SELECT_OPTION_SELECTED");
  }

  function getStyleDisplayInvisible() {
    return uConst.get("USEFUL/STYLE_DISPLAY_INVISIBLE");
  }

  function getStyleDisplayVisible() {
    return uConst.get("USEFUL/STYLE_DISPLAY_VISIBLE");
  }

  return {
    getCheckboxChecked,
    getSelectOptionSelected,
    getStyleDisplayInvisible,
    getStyleDisplayVisible
  };

});
