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
var Class                 = require('../imports').ExpectedConditions;
var By                    = require('./By');
var ExpectedCondition     = require('../interfaces/ExpectedCondition');
var WebElement            = require('../interfaces/WebElement');
var addFinalProp          = require('../utils').addFinalProp;
var assert                = require('../assert');

module.exports=ExpectedConditions;

function ExpectedConditions(){return ExpectedConditions;};

ExpectedConditions.alertIsPresent=function(){
   return new ExpectedCondition(Class.alertIsPresentSync());
};

ExpectedConditions.elementSelectionStateToBe=function(arg, isSelected){
   assertByOrWebElement(arg, 'first');
   return new ExpectedCondition(
      Class.elementSelectionStateToBeSync(arg._instance, !!isSelected)
   );
};

ExpectedConditions.elementToBeClickable=function(by){
   assertBy(by, 'first');
   return new ExpectedCondition(Class.elementToBeClickableSync(by._instance));
};

ExpectedConditions.elementToBeSelected=function(arg){
   assertByOrWebElement(arg, 'first');
   return new ExpectedCondition(Class.elementToBeSelectedSync, arg._instance);
};

ExpectedConditions.frameToBeAvailableAndSwitchToIt=function(frameLocator){
   return new ExpectedCondition(
      Class.frameToBeAvailableAndSwitchToItSync(frameLocator)
   );
};

ExpectedConditions.invisibilityOfElementLocated=function(by){
   assertBy(by, 'first');
   return new ExpectedCondition(
      Class.invisibilityOfElementLocatedSync(by._instance)
   );
};

ExpectedConditions.invisibilityOfElementWithText=function(by, text){
   assertBy(by, 'first');
   return new ExpectedCondition(
      Class.invisibilityOfElementWithTextSync(by._instance, text)
   );
};

ExpectedConditions.not=function(condition){
   assertExpectedCondition(condition, 'first');
   return new ExpectedCondition(Class.notSync(condition._instance));
};

ExpectedConditions.	presenceOfAllElementsLocatedBy=function(by){
   assertBy(by, 'first');
   return new ExpectedCondition(
      Class.presenceOfAllElementsLocatedBySync(by._instance)
   );
};

ExpectedConditions.presenceOfElementLocated=function(by){
   assertBy(by, 'first');
   return new ExpectedCondition(
      Class.presenceOfElementLocatedSync(by._instance)
   );
};

ExpectedConditions.refreshed=function(condition){
   assertExpectedCondition(condition, 'first');
   return new ExpectedCondition(Class.refreshedSync(condition._instance));
};

ExpectedConditions.stalenessOf=function(webElement){
   assertWebElement(webElement);
   return new ExpectedCondition(Class.stalenessOfSync(webElement._instance));
};

ExpectedConditions.textToBePresentInElement=function(by, text){
   assertBy(by, 'first');
   return new ExpectedCondition(
      Class.textToBePresentInElementSync(by._instance, text)
   );
};

ExpectedConditions.textToBePresentInElementValue=function(by, text){
   assertBy(by, 'first');
   return new ExpectedCondition(Class.textToBePresentInElementValueSync(
      by._instance,
      text
   ));
};

ExpectedConditions.titleContains=function(title){
   return new ExpectedCondition(Class.titleContainsSync(title));
};

ExpectedConditions.titleIs=function(title){
   return new ExpectedCondition(Class.titleIsSync(title));
};

ExpectedConditions.visibilityOf=function(webElement){
   assertWebElement(webElement, 'first');
   return new ExpectedCondition(Class.visibilityOfSync(webElement._instance));
};

ExpectedConditions.visibilityOfElementLocated=function(by){
   assertBy(by, 'first');
   return new ExpectedCondition(
      Class.visibilityOfElementLocatedSync(by._instance)
   );
};

function assertBy(by, position){
   assert(by)
      .isInstanceof(By)
      .throws("The "+position+" argument wasn't an instanceof By.");
}
function assertWebElement(webElement, position){
   assert(webElement)
      .isInstanceof(WebElement)
      .throws("The "+position+" argument wasn't an instanceof WebElement.");
}
function assertByOrWebElement(arg, position){
   assert(arg)
      .isInstanceof(By)
      .or(WebElement)
      .throws("The "+position+" argument wasn't an instanceof By or WebElement.");
}
function assertExpectedCondition(condition, position){
   assert(condition)
      .isInstanceof(ExpectedCondition)
      .throws("The "+position+" argument wasn't an instanceof ExpectedCondition.");
}