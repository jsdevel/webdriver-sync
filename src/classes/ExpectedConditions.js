/*
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//TODO complete this file
var Class                 = require('../imports').ExpectedConditions;
var addFinalProp          = require('../utils').addFinalProp;

module.exports=ExpectedConditions;

function ExpectedConditions(instance){
   addFinalProp(this, "_instance", instance);
}

ExpectedConditions.prototype.alertIsPresent=function(){
   return new ExpectedConditions(Class.alertIsPresentSync());
};
ExpectedConditions.alertIsPresent=ExpectedConditions.prototype.alertIsPresent;

/**
 * An expectation for checking if the given element is selected.
 * @param {By|WebElement} arg
 * @param {boolean} isSelected
 */
ExpectedConditions.prototype.elementSelectionStateToBe=function(arg, isSelected){
      Class.elementSelectionStateToBeSync(
      arg instanceof WebElement?
         arg._instance:
         arg,
      isSelected
   );
};
/**
   * An expectation for checking an element is visible and enabled such that
   * you can click it.
   * @param {By} by
   */
this.elementToBeClickable=function(by){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "elementToBeClickable",
      by
   );
};
/**
   * An expectation for checking if the given element is selected.
   * @param {By|WebElement} arg
   */
this.elementToBeSelected=function(arg){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "elementToBeSelected",
      arg instanceof WebElement?
         arg._el:
         arg
   );
};
/**
   * An expectation for checking whether the given frame is available to switch to.
   * @param {string} frameLocator
   */
this.frameToBeAvailableAndSwitchToIt=function(frameLocator){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "frameToBeAvailableAndSwitchToIt",
      frameLocator
   );
};
/**
   * An expectation for checking that an element is either invisible or not
   * present on the DOM.
   * @param {By} by
   */
this.invisibilityOfElementLocated=function(by){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "invisibilityOfElementLocated",
      by
   );
};

/**
   * An expectation for checking that an element with text is either invisible
   * or not present on the DOM.
   * @param {By} by
   * @param {string} text
   */
this.invisibilityOfElementWithText=function(by, text){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "invisibilityOfElementWithText",
      by,
      text
   );
};
/**
   * An expectation with the logical opposite condition of the given condition.
   * @param {ExpectedCondition} condition
   */
this.not=function(condition){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "not",
      condition
   );
};
/**
   * An expectation for checking that there is at least one element present on
   * a web page.
   * @param {By} by
   */
this.	presenceOfAllElementsLocatedBy=function(by){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "presenceOfAllElementsLocatedBy",
      by
   );
};
/**
   * An expectation for checking that an element is present on the DOM of a
   * page.
   * @param {By} by
   */
this.presenceOfElementLocated=function(by){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "presenceOfElementLocated",
      by
   );
};
/**
   * Wrapper for a condition, which allows for elements to update by redrawing.
   * @param {ExpectedCondition} condition
   */
this.refreshed=function(condition){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "refreshed",
      condition
   );
};
/**
   * Wait until an element is no longer attached to the DOM.
   * @param {WebElement} webElement
   */
this.stalenessOf=function(webElement){
   assertIsWebElement(webElement);
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "stalenessOf",
      webElement._el
   );
};
/**
   * An expectation for checking if the given text is present in the specified
   * element.
   * @param {By} by
   * @param {string} text
   */
this.textToBePresentInElement=function(by, text){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "textToBePresentInElement",
      by,
      text
   );
};
/**
   * An expectation for checking if the given text is present in the specified
   * elements value attribute.
   * @param {By} by
   * @param {string} text
   */
this.textToBePresentInElementValue=function(by, text){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "textToBePresentInElementValue",
      by,
      text
   );
};
/**
   * An expectation for checking that the title contains a case-sensitive
   * substring.
   * @param {string} title
   */
this.titleContains=function(title){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "titleContains",
      title
   );
};
/**
   * An expectation for checking the title of a page.
   * @param {string} title
   */
this.titleIs=function(title){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "titleIs",
      title
   );
};
/**
   * An expectation for checking that an element, known to be present on the
   * DOM of a page, is visible.
   * @param {WebElement} webElement
   */
this.visibilityOf=function(webElement){
   assertIsWebElement(webElement);
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "visibilityOf",
      webElement._el
   );
};
/**
   * An expectation for checking that an element is present on the DOM of a
   * page and visible.
   * @param {By} by
   */
this.visibilityOfElementLocated=function(by){
   return java.callStaticMethodSync(
      "org.openqa.selenium.support.ui.ExpectedConditions",
      "visibilityOfElementLocated",
      by
   );
};