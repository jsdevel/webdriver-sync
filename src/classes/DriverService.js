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

module.exports = DriverService;

function DriverService(){
   throw new Error("DriverService has a protected constructor.");
}

DriverService.prototype.getUrl=function(){
   return this._instance.getUrlSync().toStringSync();
};

DriverService.prototype.isRunning=function(){
   return this._instance.isRunningSync();
};

DriverService.prototype.start=function(){
   this._instance.startSync();
};

DriverService.prototype.stop=function(){
   this._instance.stopSync();
};