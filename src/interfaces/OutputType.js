'use strict';

var Class = require('../imports').OutputType;
var File = require('../classes/File');
var Instance = require('../classes/Instance');
var addFinalProp = require('../utils').addFinalProp;

module.exports = OutputType;

function OutputType(instance) {
  addFinalProp(this, '_instance', instance);
}

OutputType.BASE64 = OutputType.prototype.BASE64 = new OutputType(Class.BASE64);
OutputType.BYTES = OutputType.prototype.BYTES = new OutputType(Class.BYTES);
OutputType.FILE = OutputType.prototype.FILE = new OutputType(Class.FILE);

OutputType.prototype.convertFromBase64Png = function(base64Png) {
  if (this._instance === Class.FILE) {
    return new File(
      new Instance(this._instance.convertFromBase64PngSync(base64Png))
    );
  }
  return this._instance.convertFromBase64PngSync(base64Png);
};
OutputType.prototype.convertFromPngBytes = function(png) {
  if (this._instance === Class.FILE) {
    return new File(
      new Instance(this._instance.convertFromPngBytesSync(png))
    );
  }

  return this._instance.convertFromPngBytesSync(png);
};