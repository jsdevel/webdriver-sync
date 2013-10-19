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
var addFinalProp  = require('../utils').addFinalProp;
var Class         = require('../imports').Platform;

module.exports=Platform;

function Platform(instance){
   addFinalProp(this, "_instance", instance);
}
Platform.prototype.getMajorVersion=function(){
   return this._instance.getMajorVersionSync();
};
Platform.prototype.getMinorVersion=function(){
   return this._instance.getMinorVersionSync();
};
Platform.prototype.getPartOfOsName=function(){
   return this._instance.getPartOfOsNameSync();
};
Platform.prototype.is=function(compareWith){
   if(!(compareWith instanceof Platform)){
      throw new Error("argument must be an instance of Platform");
   }
   return this._instance.isSync(compareWith._instance);
};


addFinalProp(Platform, "ANDROID", new Platform(Class.ANDROID));
addFinalProp(Platform, "ANY",     new Platform(Class.ANY));
addFinalProp(Platform, "LINUX",   new Platform(Class.LINUX));
addFinalProp(Platform, "MAC",     new Platform(Class.MAC));
addFinalProp(Platform, "UNIX",    new Platform(Class.UNIX));
addFinalProp(Platform, "VISTA",   new Platform(Class.VISTA));
addFinalProp(Platform, "WIN8",    new Platform(Class.WIN8));
addFinalProp(Platform, "WINDOWS", new Platform(Class.WINDOWS));
addFinalProp(Platform, "XP",      new Platform(Class.XP));


addFinalProp(Platform, "extractFromSysProperty", function(osName, osVersion){
   if(osVersion){
      return new Platform(Class.extractFromSysPropertySync(osName, osVersion));
   }
   return new Platform(Class.extractFromSysPropertySync(osName));
});

addFinalProp(Platform, "getCurrent", function(){
   return new Platform(Class.getCurrentSync(osName));
});

addFinalProp(Platform, "valueOf", function(name){
   return new Platform(Class.valueOfSync(name));
});

addFinalProp(Platform, "values", function(){
   return Class.valuesSync.map(function(v){
      return new Platform(v);
   });
});
