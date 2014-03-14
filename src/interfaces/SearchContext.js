'use strict';

var By = require('../classes/By');
var WebElement;
var assert = require('../assert');
var addFinalProp = require('../utils').addFinalProp;
var collectionToArray = require('../utils').collectionToArray;

module.exports = SearchContext;

function SearchContext(_instance) {
  addFinalProp(this, '_instance', _instance);
}

SearchContext.prototype.findElement = function(by) {
  var el;
  assert(by).extends(By).throws('by must be an instance of By.');
  el = this._instance.findElementSync(by._instance);
  return newWebElement(el);
};

SearchContext.prototype.findElements = function(by) {
  assert(by).extends(By).throws('by must be an instance of By.');
  return collectionToArray(
    this._instance.findElementsSync(by._instance),
    function(item) {
      return newWebElement(item);
    }
  );
};

//removes circular dependency between these interfaces
function newWebElement(el) {
  if (!WebElement) {
    WebElement = require('./WebElement');
  }
  return new WebElement(el);
}