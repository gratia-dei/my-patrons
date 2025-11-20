requirejs.config({

  baseUrl: "/files/resources",

  paths: {
    const: "js/utils/const",
    common: "js/utils/common",
    date: "js/utils/date",
    document: "js/utils/document",
    env: "js/utils/env",
    file: "js/utils/file",
    global: "js/utils/global",
    language: "js/utils/language",
    location: "js/utils/location",
    marked: "external/marked-js-14-1-2/marked.min",
    notification: "js/utils/notification",
    scroll: "js/utils/scroll",
    sort: "js/utils/sort",
    useful: "js/utils/useful"
  },

  shim: {
    const: {
      deps: ["env"]
    },
    common: {
      deps: ["const", "file", "language"]
    },
    date: {
      deps: ["common", "const", "language"]
    },
    document: {
      deps: ["env"]
    },
    language: {
      deps: ["const", "env", "file", "location"]
    },
    location: {
      deps: ["env"]
    },
    notification: {
      deps: ["const", "document", "file"]
    },
    scroll: {
      deps: ["env"]
    },
    sort: {
      deps: ["const"]
    },
    useful: {
      deps: ["const"]
    }
  }

});
