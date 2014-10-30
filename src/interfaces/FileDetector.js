'use strict';

var File = require('../classes/File');
var Instance = require('../classes/Instance');
var addFinalProp = require('../utils').addFinalProp;

function FileDetector(instance) {
  addFinalProp(this, '_instance', instance);
}

FileDetector.prototype.getLocalFile = function(string) {
  return new File(new Instance(this._instance.getLocalFileSync(string)));
};