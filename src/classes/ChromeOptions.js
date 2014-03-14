'use strict';

var java = require('java');
var Class = require('../imports').ChromeOptions;
var File = require('./File');
var toArray = require('../utils').toArray;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');


module.exports = ChromeOptions;

function ChromeOptions() {
  addFinalProp(this, '_instance', new Class());
}
ChromeOptions.CAPABILITY =
  ChromeOptions.prototype.CAPABILITY =
  Class.CAPABILITY;

ChromeOptions.prototype.addArguments = function(strings) {
  if (!Array.isArray(strings)) {
    strings = toArray(arguments);
  }
  strings.forEach(function(v) {
    assert(v).isString().throws('Strings must be strings.');
  });
  this._instance.addArgumentsSync(java.newArray('java.lang.String', strings));
};

ChromeOptions.prototype.addEncodedExtensions = function(strings) {
  if (!Array.isArray(strings)) {
    strings = toArray(arguments);
  }
  strings.forEach(function(v) {
    assert(v).isString().throws('Strings must be strings.');
  });
  this._instance.addEncodedExtensionsSync.apply(this._instance, strings);
};

ChromeOptions.prototype.addExtensions = function(paths) {
  if (!Array.isArray(paths)) {
    paths = toArray(arguments);
  }
  paths.forEach(function(v) {
    assert(v).extends(File).throws(
      'Paths must be instances of File.'
      );
  });
  this._instance.addExtensionsSync.apply(this._instance, paths);
};

ChromeOptions.prototype.equals = function(other) {
  if (!assert(other).extends(ChromeOptions).isValid) {
    return false;
  }
  return this._instance.equalsSync(other._instance);
};
ChromeOptions.prototype.setBinary = function(path) {
  if (
    !assert(path).extends(File).isValid
    || !assert.isString(path)
    ) {
    throw new Error('Path must be an instance of File or a string.');
  }
  this._instance.setBinarySync(path);
};

ChromeOptions.prototype.setExperimentalOptions = function(name, value) {
  this._instance.setExperimentalOptionsSync(name, value);
};

ChromeOptions.prototype.toJson = function() {
  return JSON.parse(this._instance.toJSONSync().toStringSync());
};