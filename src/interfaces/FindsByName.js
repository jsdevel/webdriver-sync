'use strict';

var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsByName;

function FindsByName(instance) {
  addFinalProp(this, '_instance', instance);
}

FindsByName.prototype.findElementByName = function(using) {
  return new WebElement(this._instance.findElementByNameSync(using));
};
FindsByName.prototype.findElementsByName = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByNameSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};