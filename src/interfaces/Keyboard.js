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