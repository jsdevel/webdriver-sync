var WebElement = require('./WebElement');
var addFinalProp = require('../utils').addFinalProp;
var collectionsToArrayList = require('../utils').collectionsToArrayList;

module.exports = FindsByCssSelector;

function FindsByCssSelector(instance) {
  addFinalProp(this, "_instance", instance);
}

FindsByCssSelector.prototype.findElementByCssSelector = function(using) {
  return new WebElement(this._instance.findElementByCssSelectorSync(using));
};
FindsByCssSelector.prototype.findElementsByCssSelector = function(using) {
  return collectionsToArrayList(
    this._instance.findElementsByCssSelectorSync(using),
    function(item) {
      return new WebElement(item);
    }
  );
};