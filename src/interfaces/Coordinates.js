'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Point = require('../classes/Point');

module.exports = Coordinates;

function Coordinates(instance) {
  addFinalProp(this, '_instance', instance);
}
Coordinates.prototype.getAuxiliary = function() {
  return this._instance.getAuxillarySync();
};
Coordinates.prototype.inViewPort = function() {
  return new Point(this._instance.inViewPortSync());
};
Coordinates.prototype.onPage = function() {
  return new Point(this._instance.onPageSync());
};
Coordinates.prototype.onScreen = function() {
  return new Point(this._instance.onScreenSync());
};