var which = require('which'),
    staticDependencyPaths = require('./../static-dependency-paths'),
    fs = require('fs');

module.exports = {
  find: function() {
    if(fs.existsSync(staticDependencyPaths.chromeDriver)) {
      return staticDependencyPaths.chromeDriver;
    } else {
      return null;
    }
  }
};
