var addFinalProp = require('../utils').addFinalProp;
var Class = require('../imports').Dimension;

function Dimension(dim, width) {
  if (typeof width === 'number') {
    dim = new Class(dim, width);
  }
  addFinalProp(this, "_instance", dim);
}
Dimension.prototype.getHeight = function() {
  return this._instance.getHeightSync();
};
Dimension.prototype.getWidth = function() {
  return this._instance.getWidthSync();
};
Dimension.prototype.toString = function() {
  return this._instance.toStringSync();
};