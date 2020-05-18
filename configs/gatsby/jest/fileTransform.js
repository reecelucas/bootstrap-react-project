const path = require("path");

// This is a Jest transformer to turn file imports into filenames
module.exports = {
  process(_src, filename, _config, _options) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
  },
};
