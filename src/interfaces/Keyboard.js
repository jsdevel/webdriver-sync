var toStringArray = require('../utils').toStringArray;
var addFinalProp = require('../utils').addFinalProp;


function Keyboard(instance) {
  addFinalProp(this, "_instance", instance);
}

Keyboard.prototype.pressKey = function(keyToPress) {
  if (typeof keyToPress !== 'string') {
    throw new Error("argument must be string");
  }
  this._instance.pressKeySync(keyToPress);
};

Keyboard.prototype.releaseKey = function(keyToRelease) {
  if (typeof keyToRelease !== 'string') {
    throw new Error("argument must be string");
  }
  this._instance.releaseKeySync(keyToRelease);
};

Keyboard.prototype.sendKeys = function() {
  if (!arguments.length) {
    throw new Error("expected multiple arguments");
  }
  this._instance.sendKeysSync.apply(this._instance, toStringArray(arguments));
};