var addFinalProp = require('../utils').addFinalProp;
var Class = require('../imports').Point;

module.exports = Point;

function Point(instance, y) {
  if (typeof y === 'number') {
    instance = new Class(instance, y);
  }
  addFinalProp(this, "_instance", instance);
}
Point.prototype.getX = function() {
  return this._instance.getXSync();
};
Point.prototype.getY = function() {
  return this._instance.getYSync();
};
Point.prototype.move = function(x, y) {
  return this._instance.moveSync(x, y);
};
Point.prototype.moveBy = function(xOff, yOff) {
  return new Point(this._instance.moveBySync(xOff, yOff));
};
Point.prototype.toString = function() {
  return this._instance.toStringSync();
};