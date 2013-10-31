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
var Class                   = require('../imports').FirefoxDriver;
var Capabilities            = require('../interfaces/Capabilities');
var Killable                = require('../interfaces/Killable');
var TakesScreenshot         = require('../interfaces/TakesScreenshot');
var RemoteWebDriver         = require('./RemoteWebDriver');
var extendAll               = require('../utils').extendAll;
var addFinalProp            = require('../utils').addFinalProp;

module.exports=FirefoxDriver;

extendAll(
   FirefoxDriver,
   Killable,
   TakesScreenshot,
   RemoteWebDriver
);

//TODO: Finish constructor arguments
function FirefoxDriver(
   desiredCapabilities,
   requiredCapabilities
){
   var instance;
   var first = desiredCapabilities;
   var len=arguments.length;

   if(!len){
      instance = new Class();
   } else if(len === 1 || len === 2){
      assert(first)
         .isInstanceof(Capabilities)
         .throws(
            "The first argument wasn't an instanceof Capabilities."
         );
      if(len === 1){
         instance = new Class(first._instance);
      } else if(len === 2){
         assert(requiredCapabilities)
            .isInstanceof(Capabilities)
            .throws(
               "The second argument must be an instance of Capabilities."
            );
         instance = new Class(first._instance, requiredCapabilities._instance);
      }
   } else {
      throw new Error("The wrong number of arguments was given.");
   }

   addFinalProp(this, "_instance", instance);
}
//TODO: finish static fields