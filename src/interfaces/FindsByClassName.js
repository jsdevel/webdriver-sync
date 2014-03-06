'use strict';

var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsByClassName;

function FindsByClassName(instance) {
  addFinalProp(this, '_instance', instance);
}

FindsByClassName.prototype.findElementByClassName = function(using) {
  return new WebElement(this._instance.findElementByClassNameSync(using));
};
FindsByClassName.prototype.findElementsByClassName = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByClassNameSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};