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
var Class = require('../imports').ChromeOptions;
var File = require('./File');
var toArray = require('../utils').toArray;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');


module.exports = ChromeOptions;

function ChromeOptions() {
  addFinalProp(this, "_instance", new Class());
}
ChromeOptions.CAPABILITY =
  ChromeOptions.prototype.CAPABILITY =
  Class.CAPABILITY;

ChromeOptions.prototype.addArguments = function(strings) {
  if (!Array.isArray(strings)) {
    strings = toArray(arguments);
  }
  strings.forEach(function(v) {
    assert(v).isString().throws("Strings must be strings.");
  });
  this._instance.addArgumentsSync.apply(this._instance, strings);
};

ChromeOptions.prototype.addEncodedExtensions = function(strings) {
  if (!Array.isArray(strings)) {
    strings = toArray(arguments);
  }
  strings.forEach(function(v) {
    assert(v).isString().throws("Strings must be strings.");
  });
  this._instance.addEncodedExtensionsSync.apply(this._instance, strings);
};

ChromeOptions.prototype.addExtensions = function(paths) {
  if (!Array.isArray(paths)) {
    paths = toArray(arguments);
  }
  paths.forEach(function(v) {
    assert(v).isInstanceof(File).throws(
      "Paths must be instances of File."
      );
  });
  this._instance.addExtensionsSync.apply(this._instance, paths);
};

ChromeOptions.prototype.equals = function(other) {
  if (!assert(other).isInstanceof(ChromeOptions).isValid) {
    return false;
  }
  return this._instance.equalsSync(other._instance);
};
ChromeOptions.prototype.setBinary = function(path) {
  if (
    !assert(path).isInstanceof(File).isValid
    || !assert.isString(path)
    ) {
    throw new Error("Path must be an instance of File or a string.");
  }
  this._instance.setBinarySync(path);
};

ChromeOptions.prototype.setExperimentalOptions = function(name, value) {
  this._instance.setExperimentalOptionsSync(name, value);
};

ChromeOptions.prototype.toJson = function() {
  return JSON.parse(this._instance.toJSONSync().toStringSync());
};