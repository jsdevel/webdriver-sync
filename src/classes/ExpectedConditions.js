'use strict';

var Class = require('../imports').ExpectedConditions;
var By = require('./By');
var ExpectedCondition = require('../interfaces/ExpectedCondition');
var WebElement = require('../interfaces/WebElement');
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = ExpectedConditions;

function ExpectedConditions() {
  return ExpectedConditions;
}

ExpectedConditions.alertIsPresent = function() {
  return new ExpectedCondition(Class.alertIsPresentSync());
};

ExpectedConditions.elementSelectionStateToBe = function(arg, isSelected) {
  assertByOrWebElement(arg, 'first');
  return new ExpectedCondition(
    Class.elementSelectionStateToBeSync(arg._instance, !!isSelected)
    );
};

ExpectedConditions.elementToBeClickable = function(arg) {
  assertByOrWebElement(arg, 'first');
  return new ExpectedCondition(Class.elementToBeClickableSync(arg._instance));
};

ExpectedConditions.elementToBeSelected = function(arg) {
  assertByOrWebElement(arg, 'first');
  return new ExpectedCondition(Class.elementToBeSelectedSync, arg._instance);
};

ExpectedConditions.frameToBeAvailableAndSwitchToIt = function(frameLocator) {
  return new ExpectedCondition(
    Class.frameToBeAvailableAndSwitchToItSync(frameLocator)
    );
};

ExpectedConditions.invisibilityOfElementLocated = function(by) {
  assertBy(by, 'first');
  return new ExpectedCondition(
    Class.invisibilityOfElementLocatedSync(by._instance)
    );
};

ExpectedConditions.invisibilityOfElementWithText = function(by, text) {
  assertBy(by, 'first');
  return new ExpectedCondition(
    Class.invisibilityOfElementWithTextSync(by._instance, text)
    );
};

ExpectedConditions.not = function(condition) {
  assertExpectedCondition(condition, 'first');
  return new ExpectedCondition(Class.notSync(condition._instance));
};

ExpectedConditions.presenceOfAllElementsLocatedBy = function(by) {
  assertBy(by, 'first');
  return new ExpectedCondition(
    Class.presenceOfAllElementsLocatedBySync(by._instance)
    );
};

ExpectedConditions.presenceOfElementLocated = function(by) {
  assertBy(by, 'first');
  return new ExpectedCondition(
    Class.presenceOfElementLocatedSync(by._instance)
    );
};

ExpectedConditions.refreshed = function(condition) {
  assertExpectedCondition(condition, 'first');
  return new ExpectedCondition(Class.refreshedSync(condition._instance));
};

ExpectedConditions.stalenessOf = function(webElement) {
  assertWebElement(webElement);
  return new ExpectedCondition(Class.stalenessOfSync(webElement._instance));
};

ExpectedConditions.textToBePresentInElement = function(arg, text) {
  assertByOrWebElement(arg, 'first');
  return new ExpectedCondition(
    Class.textToBePresentInElementSync(arg._instance, text)
    );
};

ExpectedConditions.textToBePresentInElementValue = function(arg, text) {
  assertByOrWebElement(arg, 'first');
  return new ExpectedCondition(Class.textToBePresentInElementValueSync(
    arg._instance,
    text
    ));
};

ExpectedConditions.titleContains = function(title) {
  return new ExpectedCondition(Class.titleContainsSync(title));
};

ExpectedConditions.titleIs = function(title) {
  return new ExpectedCondition(Class.titleIsSync(title));
};

ExpectedConditions.visibilityOf = function(webElement) {
  assertWebElement(webElement, 'first');
  return new ExpectedCondition(Class.visibilityOfSync(webElement._instance));
};

ExpectedConditions.visibilityOfElementLocated = function(by) {
  assertBy(by, 'first');
  return new ExpectedCondition(
    Class.visibilityOfElementLocatedSync(by._instance)
    );
};

function assertBy(by, position) {
  assert(by)
    .extends(By)
    .throws('The ' + position + ' argument wasn\'t an instanceof By.');
}
function assertWebElement(webElement, position) {
  assert(webElement)
    .extends(WebElement)
    .throws('The ' + position + ' argument wasn\'t an instanceof WebElement.');
}
function assertByOrWebElement(arg, position) {
  assert(arg)
    .extends(By)
    .or(WebElement)
    .throws(
      'The ' +
      position +
      ' argument wasn\'t an instanceof By or WebElement.'
     );
}
function assertExpectedCondition(condition, position) {
  assert(condition)
    .extends(ExpectedCondition)
    .throws(
      'The ' +
      position +
      ' argument wasn\'t an instanceof ExpectedCondition.'
     );
}
