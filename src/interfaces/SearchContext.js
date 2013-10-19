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
var WebElement        = require('./WebElement');
var addFinalProp      = require('../utils').addFinalProp;
var collectionToArray = require('../utils').collectionToArray;

function SearchContext(_instance){
   addFinalProp(this, "_instance", _instance);
}
SearchContext.prototype.findElement=function(by){
   return new WebElement(this._instance.findElementSync(by));
};
SearchContext.prototype.findElements=function(by){
   return collectionToArray(
      this._instance.findElementsSync(by),
      function(item){ return new WebElement(item);}
   );
};