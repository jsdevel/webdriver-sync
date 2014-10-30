'use strict';

var addFinalProp = require('../utils').addFinalProp;
var mapToObject = require('../utils').mapToObject;
var Platform = require('../enums/Platform');

module.exports = Capabilities;

function Capabilities(instance) {
  addFinalProp(this, '_instance', instance);
}
Capabilities.prototype.asMap = function() {
  return mapToObject(this._instance.asMapSync());
};
Capabilities.prototype.getBrowserName = function() {
  return this._instance.getBrowserNameSync();
};
Capabilities.prototype.getCapability = function(name) {
  return this._instance.getCapabilitySync(name);
};
Capabilities.prototype.getPlatform = function() {
  return new Platform(this._instance.getPlatformSync());
};
Capabilities.prototype.getVersion = function() {
  return this._instance.getVersionSync();
};
Capabilities.prototype.is = function(capabilityName) {
  return this._instance.isSync(capabilityName);
};
Capabilities.prototype.isJavascriptEnabled = function() {
  return this._instance.isJavascriptEnabledSync();
};