define(["env"], function(uEnv) {

  function addOptionToSelect(select, value, name, isSelected = false, isDisabled = false) {
    const option = document.createElement('option');

    option.innerHTML = name;
    option.value = value;
    if (isSelected) {
      option.selected = true;
    }
    if (isDisabled) {
      option.disabled = true;
    }

    select.append(option);

    return option;
  }

  function getElementById(id) {
    return uEnv.getDocument().getElementById(id);
  }

  function getElementsByClassName(className) {
    return uEnv.getDocument().getElementsByClassName(className);
  }

  return {
    addOptionToSelect,
    getElementById,
    getElementsByClassName,
  };

});
