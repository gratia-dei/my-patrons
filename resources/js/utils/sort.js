define(["const"], function(uConst) {

  uConst
    .set("SORT/TEXT_CHARACTER_SORTED_AFTER_OTHERS", "ﻩ")
  ;

  function getSortedArray(array, field) {
    return array.sort(function(a, b) {
      var x = getDiacriticalRepresentationStringForSort(a[field]);
      var y = getDiacriticalRepresentationStringForSort(b[field]);
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  function getSortedObject(object) {
    return getSortedArray(Object.entries(object), 1);
  }

  function getDiacriticalRepresentationStringForSort(text) {
    const lastChar = uConst.get("SORT/TEXT_CHARACTER_SORTED_AFTER_OTHERS");
    return text
      .toLowerCase()
      .replace('ż', "żż")
      .normalize("NFD")
      .replace(/(\p{Diacritic})/gu, '$1' + lastChar)
      .replace(/(\p{Diacritic})/gu, '')
      .replace('ł', "l" + lastChar)
    ;
  }

  return {
    getSortedArray,
    getSortedObject
  };

});
