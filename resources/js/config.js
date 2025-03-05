requirejs.config({

  baseUrl: "/files/resources",

  paths: {
    const: "js/utils/const",
    date: "js/utils/date",
    dom: "js/utils/dom",
    env: "js/utils/env",
    file: "js/utils/file",
    global: "js/utils/global",
    language: "js/utils/language",
    location: "js/utils/location",
    marked: "external/marked-js-14-1-2/marked.min",
    scroll: "js/utils/scroll",
    usefulPhrases: "js/utils/useful-phrases"
  },

  shim: {
    const: {
      deps: ["env"]
    },
    date: {
      deps: ["const"]
    },
    dom: {
      deps: ["env"]
    },
    language: {
      deps: ["env", "location"]
    },
    location: {
      deps: ["env"]
    },
    scroll: {
      deps: ["env"]
    },
    usefulPhrases: {
      deps: ["const"]
    }
  }

});
