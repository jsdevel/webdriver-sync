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
var Class                   = require('../imports').ChromeDriver;
var Capabilities            = require('../interfaces/Capabilities');
var TakesScreenshot         = require('../interfaces/TakesScreenshot');
var RemoteWebDriver         = require('./RemoteWebDriver');
var addFinalProp            = require('../utils').addFinalProp;

module.exports=ChromeDriver;

extendAll(
   ChromeDriver,
   TakesScreenshot,
   RemoteWebDriver
);

function ChromeDriver(){
   var instance;
/*
ChromeDriver()
ChromeDriver(Capabilities capabilities)
ChromeDriver(ChromeDriverService service)
ChromeDriver(ChromeDriverService service, Capabilities capabilities)
ChromeDriver(ChromeDriverService service, ChromeOptions options)
ChromeDriver(ChromeOptions options)
*/

   addFinalProp(this, "_instance", instance);
}