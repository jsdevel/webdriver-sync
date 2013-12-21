var Class = require('../imports').RemoteStatus;
var Instance = require('./Instance');
var addFinalProp = require('../utils').addFinalProp;
var objectToMap = require('../utils').objectToMap;
var assert = require('../assert');

module.exports = RemoteStatus;

function RemoteStatus(statusMap) {
  if (assert(statusMap).isInstanceof(Instance).isValid) {
    addFinalProp(this, "_instance", statusMap._instance);
    return this;
  }
  if (!(statusMap instanceof Object)) {
    throw new Error("The first argument must be a map.");
  }
  addFinalProp(this, "_instance", new Class(objectToMap(statusMap)));
}

RemoteStatus.prototype.getBuildRevision = function() {
  return this._instance.getBuildRevisionSync();
};
RemoteStatus.prototype.getBuildTime = function() {
  return this._instance.getBuildTimeSync();
};
RemoteStatus.prototype.getOsArch = function() {
  return this._instance.getOsArchSync();
};
RemoteStatus.prototype.getOsName = function() {
  return this._instance.getOsNameSync();
};
RemoteStatus.prototype.getOsVersion = function() {
  return this._instance.getOsVersionSync();
};
RemoteStatus.prototype.getReleaseLabel = function() {
  return this._instance.getReleaseLabelSync();
};
RemoteStatus.prototype.toString = function() {
  return this._instance.toStringSync();
};