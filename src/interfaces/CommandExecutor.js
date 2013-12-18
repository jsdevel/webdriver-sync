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
var addFinalProp = require('../utils').addFinalProp;
var Command = require('../classes/Command');
var Instance = require('../classes/Instance');
var Response = require('../classes/Response');

module.exports = CommandExecutor;

function CommandExecutor(instance) {
  addFinalProp(this, "_instance", instance);
}
CommandExecutor.prototype.execute = function(command) {
  if (!(command instanceof Command)) {
    throw new Error("command must be an instance of Command");
  }
  return new Response(
    new Instance(this._instance.executeSync(command._instance))
    );
};