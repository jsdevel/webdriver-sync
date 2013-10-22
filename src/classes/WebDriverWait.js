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


function assertIsWebDriver(driver){
   if(!(driver instanceof WebDriver)){
      throw new Error("driver isn't an instance of WebDriver.");
   }
   return driver;
}
function assertIsNumber(num){
   if(typeof num !== "number"){
      throw new Error("num isn't a number.");
   }
   return num;
}




/**
 * @constructor
 * @param {WebDriver} driver
 * @param {number} timeout in seconds
 * @param {number} sleep in mills
 */
function WebDriverWait(driver, timeout, sleep){
   var wait;

   assertIsWebDriver(driver);
   assertIsNumber(timeout);
   if(sleep){
      assertIsNumber(sleep);
   }


   switch(arguments.length){
   case 2:
      wait=new WebDriverWaitClass(
         driver._driver,
         java.newInstanceSync("java.lang.Long", timeout)
      );
      break;
   case 3:
      wait=new WebDriverWaitClass(
         driver._driver,
         java.newInstanceSync("java.lang.Long", timeout),
         java.newInstanceSync("java.lang.Long", sleep)
      );
      break;
   }

   /**
    * Repeatedly applies this instance's input value to the given function until
    * one of the following occurs: the function returns neither null nor false,
    * the function throws an unignored exception, the timeout expires, the
    * current thread is interrupted.
    *
    * @param {ExpectedCondition} isTrue
    */
   this.until=function(isTrue){
      return wait.untilSync(isTrue);
   };
   /**
    * Sets the message to be displayed when time expires.
    * @param {string} message
    */
   this.withMessage=function(message){
      return wait.withMessageSync(message);
   };
}