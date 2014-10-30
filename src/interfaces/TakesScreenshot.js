'use strict';

var File = require('../classes/File');
var Instance = require('../classes/Instance');
var OutputType = require('./OutputType');
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = TakesScreenshot;

function TakesScreenshot(instance) {
  addFinalProp(this, '_instance', instance);
}

TakesScreenshot.prototype.getScreenshotAs = function(target) {
  assert(target).extends(OutputType).throws(
    'Target must be an instance of OutputType'
  );
  if (target === OutputType.BASE64 || target === OutputType.BYTES) {
    return this._instance.getScreenshotAsSync(target._instance);
  } else if (target === OutputType.FILE) {
    return new File(
      new Instance(this._instance.getScreenshotAsSync(target._instance))
    );
  }
  throw new Error(
    'This type isn\'t supported.  Expected one of: '
    + [
      'OutputType.FILE,',
      'OutputType.BASE64,',
      'or OutputType.BYTES.'
    ].join(' ')
  );
};