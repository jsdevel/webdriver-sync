'use strict';

var which = require('which');
var config = require('../../config');
var path = require('path');
var fs = require('fs');
var selenium = config.binaries.selenium.binary.name;
var defaultPath = path.resolve(
  config.binaries.selenium.binary.path,
  selenium
);

module.exports = {
  find: function() {
    try {
      return which.find(selenium);
    } catch(e) {
      if(fs.existsSync(defaultPath)) {
        return defaultPath;
      } else {
        return null;
      }
    }
  },
  errorMessage: 'Could not find the selenium jar.'
};
