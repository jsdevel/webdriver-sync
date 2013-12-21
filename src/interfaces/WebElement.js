var SearchContext = require('./SearchContext');
var Dimension = require('../classes/Dimension');
var Point = require('../classes/Point');
var addFinalProp = require('../utils').addFinalProp;
var extend = require('../utils').extend;
var java = require('java');

module.exports = WebElement;

extend(WebElement, SearchContext);

function WebElement(instance) {
  addFinalProp(this, "_instance", instance);
}
WebElement.prototype.clear = function() {
  this._instance.clearSync();
};
WebElement.prototype.click = function() {
  this._instance.clickSync();
};
WebElement.prototype.getAttribute = function(name) {
  return this._instance.getAttributeSync(name);
};
WebElement.prototype.getCssValue = function(propertyName) {
  return this._instance.getCssValueSync(propertyName);
};
WebElement.prototype.getLocation = function() {
  return new Point(this._instance.getLocationSync());
};
WebElement.prototype.getSize = function() {
  return new Dimension(this._instance.getSizeSync());
};
WebElement.prototype.getTagName = function() {
  return this._instance.getTagNameSync();
};
WebElement.prototype.getText = function() {
  return this._instance.getTextSync();
};
WebElement.prototype.isDisplayed = function() {
  return this._instance.isDisplayedSync();
};
WebElement.prototype.isEnabled = function() {
  return this._instance.isEnabledSync();
};
WebElement.prototype.isSelected = function() {
  return this._instance.isSelectedSync();
};
WebElement.prototype.sendKeys = function() {
  this._instance.sendKeysSync(
    java.newArray(
      "java.lang.CharSequence",
      Array.prototype.slice.call(arguments)
      )
    );
};
WebElement.prototype.submit = function() {
  this._instance.submitSync();
};