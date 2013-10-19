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
var addFinalProp                = require('../utils').addFinalProp;
var mapToObject                 = require('../utils').mapToObject;
var Platform                    = require('../enums/Platform');

module.exports = Capabilities;

function Capabilities(instance){
   addFinalProp(this, "_instance", instance);
}
Capabilities.prototype.asMap=function(){
   return mapToObject(this._instance.asMapSync());
};
Capabilities.prototype.getBrowserName=function(){
   return this._instance.getBrowserNameSync();
};
Capabilities.prototype.getCapability=function(name){
   return this._instance.getCapabilitySync(name);
};
Capabilities.prototype.getPlatform=function(){
   return new Platform(this._instance.getPlatformSync());
};
Capabilities.prototype.getVersion=function(){
   return this._instance.getVersionSync();
};
Capabilities.prototype.is=function(capabilityName){
   return this._instance.isSync(capabilityName);
};
Capabilities.prototype.isJavascriptEnabled=function(){
   return this._instance.isJavascriptEnabledSync();
};