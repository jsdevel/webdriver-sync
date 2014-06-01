'use strict';

var which = require('which');
var config = require('../../config');
var path = require('path');
var fs = require('fs');
var iedriver = config.binaries.iedriver.binary.name;
var defaultPath = path.resolve(
  config.binaries.iedriver.binary.path,
  iedriver
);

module.exports = {
  find: function() {
    try {
      return which.find(iedriver);
    } catch(e) {
      if(fs.existsSync(defaultPath)) {
        return defaultPath;
      } else {
        return null;
      }
    }
  }
};
