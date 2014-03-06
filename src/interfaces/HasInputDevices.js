'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Keyboard = require('./Keyboard');
var Mouse = require('./Mouse');

module.exports = HasInputDevices;

function HasInputDevices(instance) {
  addFinalProp(this, '_instance', instance);
}
HasInputDevices.prototype.getKeyboard = function() {
  return new Keyboard(this._instance.getKeyboardSync());
};
HasInputDevices.prototype.getMouse = function() {
  return new Mouse(this._instance.getMouseSync());
};