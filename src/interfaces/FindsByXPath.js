'use strict';

var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsByXPath;

function FindsByXPath(instance) {
  addFinalProp(this, '_instance', instance);
}

FindsByXPath.prototype.findElementByXPath = function(using) {
  return new WebElement(this._instance.findElementByXPathSync(using));
};
FindsByXPath.prototype.findElementsByXPath = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByXPathSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};