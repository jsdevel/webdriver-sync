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

var Class                 = require('../imports').RemoteStatus;
var Instance              = require('./Instance');
var addFinalProp          = require('../utils').addFinalProp;
var objectToMap           = require('../utils').objectToMap;
var assert                = require('../assert');

module.exports=RemoteStatus;

function RemoteStatus(statusMap){
   if(assert(statusMap).isInstanceof(Instance).isValid){
      addFinalProp(this, "_instance", statusMap._instance);
      return this;
   }
   assert(statusMap).isInstanceof(Object).throws(
      "The first argument must be a map."
   );
   addFinalProp(this, "_instance", new Class(objectToMap(statusMap)));
}

RemoteStatus.prototype.getBuildRevision=function(){
   return this._instance.getBuildRevisionSync();
};
RemoteStatus.prototype.getBuildTime=function(){
   return this._instance.getBuildTimeSync();
};
RemoteStatus.prototype.getOsArch=function(){
   return this._instance.getOsArchSync();
};
RemoteStatus.prototype.getOsName=function(){
   return this._instance.getOsNameSync();
};
RemoteStatus.prototype.getOsVersion=function(){
   return this._instance.getOsVersionSync();
};
RemoteStatus.prototype.getReleaseLabel=function(){
   return this._instance.getReleaseLabelSync();
};
RemoteStatus.prototype.toString=function(){
   return this._instance.toStringSync();
};