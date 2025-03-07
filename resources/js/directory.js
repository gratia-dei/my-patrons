requirejs(["const", "dom", "env", "location", "useful"], function(uConst, uDom, uEnv, uLocation, uUseful) {

  uConst
    .set("SEARCH_QUERY_PARAM", "q")
    .set("SEARCH_QUERY_INIT_CHAR", "?")

    .set("DIRECTORY_LIST_ITEM_ELEMENT_CLASS", "directory-list-item")
    .set("NOT_FOUND_ELEMENT_ID", "directory-not-found")
    .set("SEARCH_INPUT_ELEMENT_ID", "search-input")

    .set("LOAD_NEW_SEARCH", loadNewSearch)
  ;

  function getDiacriticalRepresentationString(text) {
    return text
      .toLowerCase()
      .replace('ł', "l")
      .normalize("NFD")
      .replace(/(\p{Diacritic})/gu, '')
    ;
  }

  function getPreparedSearchString(string) {
    return getDiacriticalRepresentationString(string)
      .replace(/[^ a-z0-9]/g, '-')
      .replace(/\s+/g, '-')
      .trim()
    ;
  }

  function displayOnlyMatchingElements(searchString) {
    const list = uDom.getElementsByClassName(uConst.get("DIRECTORY_LIST_ITEM_ELEMENT_CLASS"));

    const notFound = uDom.getElementById(uConst.get("NOT_FOUND_ELEMENT_ID"));
    uUseful.setVisibility(notFound, false);

    let found = false;
    for (const element of list) {
      const name = getPreparedSearchString(element.innerHTML);
      const isMatching = name.match(new RegExp(searchString, 'g'));

      if (isMatching) {
        found = true;
      }

      uUseful.setVisibility(element, isMatching);
      uUseful.setVisibility(element.parentNode, isMatching);
    }

    uUseful.setVisibility(notFound, !found);
  }

  function loadNewSearch() {
    const searchInput = uDom.getElementById(uConst.get("SEARCH_INPUT_ELEMENT_ID"));
    const value = searchInput.value ?? '';

    const params = uLocation.getUrlSearchParams();
    uLocation.setSearchParam(params, uConst.get("SEARCH_QUERY_PARAM"), value);

    const searchString = uLocation.getSearchParamsString(params);
    uEnv.getWindow().location = uConst.get("SEARCH_QUERY_INIT_CHAR") + searchString;
  }

  function build() {
    const params = uLocation.getUrlSearchParams();
    const searchParam = uLocation.getSearchParam(params, uConst.get("SEARCH_QUERY_PARAM")) ?? '';

    const searchInput = uDom.getElementById(uConst.get("SEARCH_INPUT_ELEMENT_ID"));
    searchInput.value = searchParam;

    const preparedSearchParam = getPreparedSearchString(searchParam);
    displayOnlyMatchingElements(preparedSearchParam);
  };

  build();
});

function loadNewSearch() {
  requirejs(["const"], function(uConst) {
    uConst.get("LOAD_NEW_SEARCH")();
  });
}
