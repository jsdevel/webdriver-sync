'use strict';

var Class = require('../imports').UselessFileDetector;
var FileDetector = require('../interfaces/FileDetector');
var Instance = require('./Instance');
var assert = require('../assert');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;

extendAll(UselessFileDetector, FileDetector);

function UselessFileDetector(instance) {
  if (assert(instance).extends(Instance).isValid) {
    instance = instance._instance;
  } else {
    instance = new Class();
  }
  addFinalProp(this, '_instance', instance);
}