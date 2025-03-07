define(["const", "document", "file"], function(uConst, uDocument, uFile) {

  uConst
    .set("NOTIFICATION/ELEMENT_ID", "notifications")
    .set("NOTIFICATION/TEMPLATE_FILE_PATH", "/files/resources/html/items/notification-item.html")

    .set("NOTIFICATION/TYPE_ERROR", "error")
    .set("NOTIFICATION/TYPE_INFO", "info")
    .set("NOTIFICATION/TYPE_SUCCESS", "success")
    .set("NOTIFICATION/TYPE_WARNING", "warning")
  ;

  async function show(type, message, link) {
    const notifications = uDocument.getElementById(uConst.get("NOTIFICATION/ELEMENT_ID"));
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
    const notifications = uDocument.getElementById(uConst.get("NOTIFICATION/ELEMENT_ID"));
    notifications.innerHTML = '';
  }

  function error(message, link = null) {
    show(uConst.get("NOTIFICATION/TYPE_ERROR"), message, link);
  }

  function info(message, link = null) {
    show(uConst.get("NOTIFICATION/TYPE_INFO"), message, link);
  }

  function success(message, link = null) {
    show(uConst.get("NOTIFICATION/TYPE_SUCCESS"), message, link);
  }

  function warning(message, link = null) {
    show(uConst.get("NOTIFICATION/TYPE_WARNING"), message, link);
  }

  return {
    clear,
    error,
    info,
    success,
    warning
  };

});
