'use strict';

var utils = require('../utils');
var addFinalProp = utils.addFinalProp;
var toArray = utils.collectionToArray;
var toObject = utils.mapToObject;
var classPaths = require('../classPaths');
var wd = require('../webdriver-sync');
var WebElement = wd.WebElement;
var Long = wd.Long;
var java = require('java');

module.exports = JavascriptExecutor;

function JavascriptExecutor(instance) {
  addFinalProp(this, '_instance', instance);
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
  if (result === void 0 || result === null)
    return null;
  if (typeof result !== 'object')
    return result;
  if (java.instanceOf(result, classPaths.WebElement))
    return new WebElement(result);
  if (java.instanceOf(result, classPaths.Long))
    return result.longValue;
  if (java.instanceOf(result, classPaths.List)) {
    return toArray(result, coerce);
  }
  if (java.instanceOf(result, classPaths.Map)) {
    return toObject(result, coerce);
  }
  return result;
}

function getArgs(from) {
  var args = [].slice.apply(from);
  var script = args.shift();
  var varArgs = java.newArray.apply(java, ['java.lang.Object', args]);
  return [script, varArgs];
}