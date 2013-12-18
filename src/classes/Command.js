/*
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Class = require('../imports').Command;
var SessionId = require('./SessionId');
var objectToMap = require('../utils').objectToMap;
var addFinalProp = require('../utils').addFinalProp;

module.exports = Command;

function Command(sessionId, name, params) {
  var command;
  if (!(sessionId instanceof SessionId)) {
    throw new Error("first argument must be a SessionId");
  }

  if (params && typeof params === 'object') {
    command = new Class(sessionId, name, objectToMap(params));
  } else {
    command = new Class(sessionId, name);
  }

  addFinalProp(this, "_instance", command);
  addFinalProp(this, "_sessionId", sessionId);
  addFinalProp(this, "_name", name);
  addFinalProp(this, "_params", params || null);
}
Command.prototype.getName = function() {
  return this._name;
};
Command.prototype.getParameters = function() {
  return this._params;
};
Command.prototype.getSessionId = function() {
  return this._sessionId;
};
Command.prototype.toString = function() {
  return this._instance.toStringSync();
};