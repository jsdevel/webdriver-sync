'use strict';

var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsByLinkText;

function FindsByLinkText(instance) {
  addFinalProp(this, '_instance', instance);
}

FindsByLinkText.prototype.findElementByLinkText = function(using) {
  return new WebElement(this._instance.findElementByLinkTextSync(using));
};
FindsByLinkText.prototype.findElementByPartialLinkText = function(using) {
  return new WebElement(this._instance.findElementByPartialLinkTextSync(using));
};
FindsByLinkText.prototype.findElementsByLinkText = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByLinkTextSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};
FindsByLinkText.prototype.findElementsByPartialLinkText = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByPartialLinkTextSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};