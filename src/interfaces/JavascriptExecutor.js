/*!
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
var toArray = require('../utils').collectionToArray;
var classPaths = require('../classPaths');
var wd = require('../webdriver-sync');
var WebElement = wd.WebElement;
var Long = wd.Long;
var java = require('java');

module.exports = JavascriptExecutor;

function JavascriptExecutor(instance) {
  addFinalProp(this, "_instance", instance);
}
JavascriptExecutor.prototype.executeAsyncScript = function() {
  var result = this._instance.executeAsyncScriptSync.apply(
    this._instance,
    getArgs(arguments)
    );
  return coerce(result);
};
JavascriptExecutor.prototype.executeScript = function() {
  var result = this._instance.executeScriptSync.apply(
    this._instance,
    getArgs(arguments)
    );
  return coerce(result);
};

function coerce(result) {
  var checked;
  var isWebElementArray = false;
  if (result === void 0 || result === null)
    return null;
  if (typeof result !== 'object')
    return result;
  if (java.instanceOf(result, classPaths.WebElement))
    return new WebElement(result);
  if (java.instanceOf(result, classPaths.Long))
    return result.longValue;
  if (java.instanceOf(result, classPaths.List)) {
    return toArray(result, function(item) {
      if (!checked) {
        checked = true;
        isWebElementArray = java.instanceOf(item, classPaths.WebElement);
      }
      if (isWebElementArray)
        return new WebElement(item);
      return item;
    });
  }
}

function getArgs(from) {
  var args = [].slice.apply(from);
  var script = args.shift();
  var varArgs = java.newArray.apply(java, ['java.lang.Object', args]);
  return [script, varArgs];
}