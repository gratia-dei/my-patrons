define(["const", "dom", "file"], function(uConst, uDom, uFile) {

  uConst
    .set("NOTIFICATION/ELEMENT_ID", "notifications")
    .set("NOTIFICATION/TEMPLATE_FILE_PATH", "/files/resources/html/items/notification-item.html")
  ;

  async function show(type, message, link = null) {
    const notifications = uDom.getElementById(uConst.get("NOTIFICATION/ELEMENT_ID"));
    const content = await uFile.getFileContent(uConst.get("NOTIFICATION/TEMPLATE_FILE_PATH"));

    const wrapper = document.createElement('a');
    if (link !== null) {
      wrapper.href = link;
    }

    wrapper.innerHTML = content
      .replace(/#type#/g, type)
      .replace(/#message#/g, message)
    ;

    notifications.append(wrapper);
  }

  function clear() {
    const notifications = uDom.getElementById(uConst.get("NOTIFICATION/ELEMENT_ID"));
    notifications.innerHTML = '';
  }

  return {
    clear,
    show
  };

});
