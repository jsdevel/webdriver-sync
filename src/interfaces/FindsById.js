var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsById;

function FindsById(instance) {
  addFinalProp(this, "_instance", instance);
}

FindsById.prototype.findElementById = function(using) {
  return new WebElement(this._instance.findElementByIdSync(using));
};
FindsById.prototype.findElementsById = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByIdSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};