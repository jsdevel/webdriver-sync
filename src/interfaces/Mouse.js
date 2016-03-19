'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Coordinates = require('./Coordinates');
var Long = require('../imports').Long;

module.exports = Mouse;

function Mouse(instance) {
  addFinalProp(this, '_instance', instance);
}
Mouse.prototype.click = function(where) {
  assertCoordinates(where);
  this._instance.clickSync(where._instance);
};
Mouse.prototype.contextClick = function(where) {
  assertCoordinates(where);
  this._instance.contextClickSync(where._instance);
};
Mouse.prototype.doubleClick = function(where) {
  assertCoordinates(where);
  this._instance.doubleClickSync(where._instance);

};
Mouse.prototype.mouseDown = function(where) {
  assertCoordinates(where);
  this._instance.mouseDownSync(where._instance);
};
Mouse.prototype.mouseMove = function(where, xOffset, yOffset) {
  assertCoordinates(where);
  if (typeof xOffset === 'number' && typeof yOffset === 'number') {
    this._instance.mouseMoveSync(where._instance);
  } else {
    this._instance.mouseMoveSync(where._instance, new Long(xOffset), new Long(yOffset));
  }

};
Mouse.prototype.mouseUp = function(where) {
  assertCoordinates(where);
  this._instance.mouseUpSync(where._instance);
};

function asssertCoordinates(where) {
  if (!(where instanceof Coordinates)) {
    throw new Error('where must be an instanceof Coordinates');
  }
}

function assertCoordinates(coords){
  if(coords instanceof Coordinates){
    return;
  }
  throw new Error('the first argument wasn\'t an instance of Coordinates');
}