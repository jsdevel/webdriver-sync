'use strict';

var which = require('which');
var config = require('../../config');
var path = require('path');
var fs = require('fs');
var chromedriver = config.binaries.chromedriver.binary.name;
var defaultPath = path.resolve(
  config.binaries.chromedriver.binary.path,
  chromedriver
);

module.exports = {
  find: function() {
    try {
      return which.find(chromedriver);
    } catch(e) {
      if(fs.existsSync(defaultPath)) {
        return defaultPath;
      } else {
        return null;
      }
    }
  }
};
