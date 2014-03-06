'use strict';

var which = require('which'),
    staticDependencyPaths = require('./../static-dependency-paths'),
    fs = require('fs');

module.exports = {
  find: function() {
    try {
      return which.find(staticDependencyPaths.chromeDriverFileName);
    } catch(e) {
      if(fs.existsSync(staticDependencyPaths.chromeDriver)) {
        return staticDependencyPaths.chromeDriver;
      } else {
        return null;
      }
    }
  }
};
