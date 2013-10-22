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
var File                   = require('../classes/File');
var Instance               = require('../classes/Instance');
var OutputType             = require('./OutputType');
var addFinalProp           = require('../utils').addFinalProp;
var assert                 = require('../assert');

module.exports=TakesScreenshot;

function TakesScreenshot(instance){
   addFinalProp(this, "_instance", instance);
}

TakesScreenshot.prototype.getScreenshotAs=function(target){
   assert(target).isInstanceof(OutputType).throws(
      "Target must be an instance of OutputType"
   );
   if(target === OutputType.BASE64 || target === OutputType.BYTES){
      return this._instance.getScreenshotAs(target._instance);
   } else if(target === OutputType.FILE){
      return new File(
         new Instance(this._instance.getScreenshotAsSync(target._instance))
      );
   }
   throw new Error(
      "This type isn't supported.  Expected one of: OutputType.FILE, OutputType.BASE64, or OutputType.BYTES."
   );
};