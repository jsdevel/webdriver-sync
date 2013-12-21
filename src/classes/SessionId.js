var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');
var Class = require('../imports').SessionId;
var Instance = require('./Instance');

module.exports = SessionId;
function SessionId(opaqueKey) {
  if (assert(opaqueKey).isInstanceof(Instance).isValid) {
    addFinalProp(this, "_instance", opaqueKey._instance);
    return this;
  }
  addFinalProp(this, "_instance", new Class(opaqueKey));
}
SessionId.prototype.equals = function(obj) {
  if (obj instanceof SessionId) {
    return this._instance.equalsSync(obj._instance);
  }
  return false;
};
SessionId.prototype.toString = function() {
  return this._instance.toStringSync();
};