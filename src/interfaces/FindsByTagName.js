'use strict';

var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsByTagName;

function FindsByTagName(instance) {
  addFinalProp(this, '_instance', instance);
}

FindsByTagName.prototype.findElementByTagName = function(using) {
  return new WebElement(this._instance.findElementByTagNameSync(using));
};
FindsByTagName.prototype.findElementsByTagName = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByTagNameSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};