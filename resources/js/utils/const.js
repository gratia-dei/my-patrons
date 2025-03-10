define(["env"], function(uEnv) {

  const values = {};

  function get(id) {
    const result = values[id];
    if (result === undefined) {
      error("Missing const \"" + id.toString() + "\"");
    }

    return result;
  }

  function set(id, value) {
    if (values[id] !== undefined) {
      error("Duplicated const \"" + id.toString() + "\"");
    }
    values[id] = value;

    return this;
  }

  function error(message) {
    const where = getCalledScriptNameAndLine();
    alert('INTERNAL ERROR: ' + message + ' in ' + where);
  }

  function getCalledScriptNameAndLine() {
    let currentScript = null;

    const lines = uEnv.getNewError().stack?.split("\n") ?? [];
    for (let line of lines) {
      const matches = line.match(/[@](([^@]+)[:][0-9]+[:][0-9]+)$/);
      const script = matches[2] ?? '?';

      if (currentScript === null) {
        currentScript = script;
      }
      if (currentScript !== script) {
        return matches[1] ?? '?';
      }
    }

    return '!';
  }

  return {
    get,
    set
  };

});
