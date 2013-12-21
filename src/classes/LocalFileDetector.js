var Class = require('../imports').LocalFileDetector;
var FileDetector = require('../interfaces/FileDetector');
var Instance = require('./Instance');
var assert = require('../assert');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;

extendAll(LocalFileDetector, FileDetector);

function LocalFileDetector(instance) {
  if (assert(instance).isInstanceof(Instance).isValid) {
    instance = instance._instance;
  } else {
    instance = new Class();
  }
  addFinalProp(this, "_instance", instance);
}