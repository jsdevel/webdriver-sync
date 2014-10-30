'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Class = require('../imports').Dimension;

module.exports = Dimension;

function Dimension(dimOrWidth, height) {
  if (
    typeof dimOrWidth === 'number'
    && typeof height === 'number'
  ){
    dimOrWidth = new Class(dimOrWidth, height);
  }
  addFinalProp(this, '_instance', dimOrWidth);
}
Dimension.prototype.getHeight = function() {
  return 0 + this._instance.getHeightSync();
};
Dimension.prototype.getWidth = function() {
  return 0 + this._instance.getWidthSync();
};
Dimension.prototype.toString = function() {
  return this._instance.toStringSync();
};
