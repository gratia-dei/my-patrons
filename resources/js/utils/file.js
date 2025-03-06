define([], function() {

  let contentCache = {};
  let contentCacheErrors = {};

  async function getFileContent(path, loadWithoutContentCache = false) {

    if (!loadWithoutContentCache) {
      if (contentCache[path] !== undefined) {
        return contentCache[path];
      } else if (contentCacheErrors[path] !== undefined) {
        throw new Error(contentCacheErrors[path]);
      }
    }

    let response = await fetch(path);
    if (!response.ok) {
      const errorMessage = 'HTTP status: ' + response.status;
      contentCacheErrors[path] = errorMessage;
      throw new Error(errorMessage);
    }

    const result = await response.text();
    contentCache[path] = result;

    return result;
  }

  async function getJsonFromFile(path) {
    const content = await getFileContent(path);

    return JSON.parse(content);
  }

  return {
    getFileContent,
    getJsonFromFile
  };

});
