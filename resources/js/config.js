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
    notification: "js/utils/notification",
    scroll: "js/utils/scroll",
    useful: "js/utils/useful"
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
    notification: {
      deps: ["const", "dom", "file"]
    },
    scroll: {
      deps: ["env"]
    },
    useful: {
      deps: ["const"]
    }
  }

});
