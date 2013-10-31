/*!
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
var Class         = require('../imports').OutputType;
var File          = require('../classes/File');
var Instance      = require('../classes/Instance');
var addFinalProp  = require('../utils').addFinalProp;

module.exports=OutputType;

function OutputType(instance){
   addFinalProp(this, "_instance", instance);
}

OutputType.BASE64 = OutputType.prototype.BASE64 = new OutputType(Class.BASE64);
OutputType.BYTES  = OutputType.prototype.BYTES  = new OutputType(Class.BYTES);
OutputType.FILE   = OutputType.prototype.FILE   = new OutputType(Class.FILE);

OutputType.prototype.convertFromBase64Png=function(base64Png){
   if(this._instance === Class.FILE){
      return new File(
         new Instance(this._instance.convertFromBase64PngSync(base64Png))
      );
   }
   return this._instance.convertFromBase64PngSync(base64Png);
};
OutputType.prototype.convertFromPngBytes=function(png){
   if(this._instance === Class.FILE){
      return new File(
         new Instance(this._instance.convertFromPngBytesSync(png))
      );
   }

   return this._instance.convertFromPngBytesSync(png);
};