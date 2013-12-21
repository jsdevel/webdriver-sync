var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');
var Class = require('../imports').Response;
var SessionId = require('./SessionId');
var Instance = require('./Instance');

module.exports = Response;

function Response(sessionId) {
  var instance;
  if (assert(sessionId).isInstanceof(SessionId).isValid) {
    instance = new Class(sessionId._instance);
  } else if (assert(sessionId).isInstanceof(Instance).isValid) {
    instance = sessionId._instance;
  } else {
    instance = new Class();
  }
  addFinalProp(this, "_instance", instance);
}

Response.prototype.getSessionId = function() {
  return this._instance.getSessionIdSync();
};
Response.prototype.getState = function() {
  return this._instance.getStateSync();
};
Response.prototype.getStatus = function() {
  return this._instance.getStatusSync();
};
Response.prototype.getValue = function() {
  return this._instance.getValueSync();
};
Response.prototype.setSessionId = function(stringSessionId) {
  return this._instance.setSessionIdSync(stringSessionId);
};
Response.prototype.setState = function(stringState) {
  return this._instance.setStateSync(stringState);
};
Response.prototype.setStatus = function(stringStatus) {
  return this._instance.setStatusSync(stringStatus);
};
Response.prototype.setValue = function(value) {
  return this._instance.setValueSync(value);
};
Response.prototype.toString = function() {
  return this._instance.toStringSync();
};