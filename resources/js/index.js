requirejs(["const", "document", "env", "scroll"], function(uConst, uDocument, uEnv, uScroll) {

  uConst
    .set("BUTTON_UP_ELEMENT_ID", "button-up")
  ;

  function refreshUpButton() {
    const buttonUp = uDocument.getElementById(uConst.get("BUTTON_UP_ELEMENT_ID"));
    const scrollOffset = uScroll.getOffset();
    const isTop = scrollOffset === 0;

    buttonUp.style.opacity = isTop ? 0 : 1;
  }

  uEnv.getWindow().addEventListener("scroll", refreshUpButton);

});
