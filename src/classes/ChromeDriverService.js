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
var Class                   = require('../imports').ChromeDriverService;
var DriverService           = require('./DriverService');
var Instance                = require('./Instance');
var addFinalProp            = require('../utils').addFinalProp;
var extendAll               = require('../utils').extendAll;
var objectToMap             = require('../utils').objectToMap;
var assert                  = require('../assert');

module.exports = ChromeDriverService;

extendAll(ChromeDriverService, DriverService);

function ChromeDriverService(instance){
   assert(instance).isInstanceof(Instance).throws(
      "ChromeDriverService has no public constructor."
   );
   addFinalProp(this, "_instance", instance._instance);
}

ChromeDriverService.CHROME_DRIVER_EXE_PROPERTY
   =ChromeDriverService.prototype.CHROME_DRIVER_EXE_PROPERTY
   =Class.CHROME_DRIVER_EXE_PROPERTY;

ChromeDriverService.CHROME_DRIVER_LOG_PROPERTY
   =ChromeDriverService.prototype.CHROME_DRIVER_LOG_PROPERTY
   =Class.CHROME_DRIVER_LOG_PROPERTY;

ChromeDriverService.createDefaultService
   =ChromeDriverService.prototype.createDefaultService
   =function(){
      return new ChromeDriverService(new Instance(Class.createDefaultServiceSync()));
   };

ChromeDriverService.Builder
   = ChromeDriverService.prototype.Builder
   = Builder;

function Builder(){
   addFinalProp(this, "_instance", new Class.Builder());
}

Builder.prototype.build=function(){
   addFinalProp(this, "_instance", new Class.Builder());
};

Builder.prototype.usingAnyFreePort=function(){
   this._instance.usingAnyFreePortSync();
   return this;
};

Builder.prototype.usingDriverExecutable=function(file){
   assert(file).isInstanceof(File).throws(
      "file must be an instance of File."
   );
   this._instance.usingDriverExecutableSync(file._instance);
   return this;
};

Builder.prototype.usingPort=function(port){
   assert(port).isNumber().throws("port must be a number.");
   this._instance.usingPortSync(port);
   return this;
};

Builder.prototype.withEnvironment=function(environment){
   assert(environment).isInstanceof(Object).throws(
      "environment must be an object."
   );
   this._instance.withEnvironmentSync(objectToMap(environment));
   return this;
};

Builder.prototype.withLogFile=function(logFile){
   assert(logFile).isInstanceof(File).throws(
      "logFile must be an instance of File"
   );
   this._instance.withLogFileSync(logFile._instance);
   return this;
};