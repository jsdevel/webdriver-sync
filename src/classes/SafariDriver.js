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
var Class                   = require('../imports').SafariDriver;
var Capabilities            = require('../interfaces/Capabilities');
var TakesScreenshot         = require('../interfaces/TakesScreenshot');
var RemoteWebDriver         = require('./RemoteWebDriver');
var messages                = require('../messages');
var extendAll               = require('../utils').extendAll;
var addFinalProp            = require('../utils').addFinalProp;

module.exports=SafariDriver;

extendAll(
   SafariDriver,
   TakesScreenshot,
   RemoteWebDriver
);

//TODO finish constructor arguments
function SafariDriver(capabilities){
   var instance;
   var len=arguments.length;

   if(!len){
      instance = new Class();
   } else if(len === 1){
         assert(capabilities)
            .isInstanceof(Capabilities)
            .throws(
            messages.UN_FINISHED_CONSTRUCTOR
         );
         instance = new Class(capabilities._instance);
   } else {
      throw new Error(messages.UN_FINISHED_CONSTRUCTOR);
   }

   addFinalProp(this, "_instance", instance);
}