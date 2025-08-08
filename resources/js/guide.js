requirejs(["common", "const", "document", "file", "language", "useful", "marked"], function(uCommon, uConst, uDocument, uFile, uLanguage, uUseful, libMarked) {

  uConst
    .set("MARKDOWN_FILE_EXTENSION", uCommon.getConst("MARKDOWN_FILE_EXTENSION"))

    .set("MARKDOWN_FILES_ROOT_PATH", uCommon.getConst("MARKDOWN_FILES_ROOT_PATH"))

    .set("DESCRIPTION_CONTENT_BLOCK_TEMPLATE_FILE_PATH", uCommon.getConst("DESCRIPTION_CONTENT_BLOCK_TEMPLATE_FILE_PATH"))

    .set("IMPORT_MARKDOWN_DESCRIPTION_TRIES", 10)
    .set("IMPORT_MARKDOWN_DESCRIPTION_TRIES_SLEEP_MILISECONDS", 3000)

    .set("FILE_PATH_ELEMENT_ID", 'file-path')
    .set("STEP_DESCRIPTION_ELEMENT_ID", 'step-description')
  ;

  async function importMarkdownDescription(element, filePath, tryToLoadAgainTimes = uConst.get("IMPORT_MARKDOWN_DESCRIPTION_TRIES")) {
    element.innerHTML = uLanguage.getTranslation('lang-loading-in-progress-info');

    const fullFilePath = uConst.get("MARKDOWN_FILES_ROOT_PATH") + filePath + uConst.get("MARKDOWN_FILE_EXTENSION");
    try {
      const template = await uFile.getFileContent(uConst.get("DESCRIPTION_CONTENT_BLOCK_TEMPLATE_FILE_PATH"));

      let content = await uFile.getFileContent(fullFilePath, tryToLoadAgainTimes < uConst.get("IMPORT_MARKDOWN_DESCRIPTION_TRIES"));
      content = libMarked.parse(content);

      element.innerHTML = template.replace(/#content#/g, content);
    } catch (e) {
      if (tryToLoadAgainTimes > 0) {
        await uUseful.sleep(uConst.get("IMPORT_MARKDOWN_DESCRIPTION_TRIES_SLEEP_MILISECONDS"));
        importMarkdownDescription(element, filePath, tryToLoadAgainTimes - 1);
      }
    }
  }

  async function build() {
    const element = uDocument.getElementById(uConst.get("STEP_DESCRIPTION_ELEMENT_ID"));
    const filePath = uDocument.getElementById(uConst.get("FILE_PATH_ELEMENT_ID")).innerHTML;

    await importMarkdownDescription(element, filePath);
  };

  build();
});
