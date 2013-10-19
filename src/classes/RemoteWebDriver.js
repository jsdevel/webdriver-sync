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
var RemoteWebDriver       = require('../interfaces/RemoteWebDriver');
var HasCapabilities       = require('../interfaces/HasCapabilities');
var HasInputDevices       = require('../interfaces/HasInputDevices');
var FindsByClassName      = require('../interfaces/FindsByClassName');
var FindsByCssSelector    = require('../interfaces/FindsByCssSelector');
var FindsById             = require('../interfaces/FindsById');
var FindsByLinkText       = require('../interfaces/FindsByLinkText');
var FindsByName           = require('../interfaces/FindsByName');
var FindsByTagName        = require('../interfaces/FindsByTagName');
var FindsByXPath          = require('../interfaces/FindsByXPath');
var JavascriptExecutor    = require('../interfaces/JavascriptExecutor');
var SearchContext         = require('../interfaces/SearchContext');
var WebDriver             = require('../interfaces/WebDriver');

module.exports=RemoteWebDriver;

extendAll(
   RemoteWebDriver,
   HasCapabilities,
   HasInputDevices,
   FindsByClassName,
   FindsByCssSelector,
   FindsById,
   FindsByLinkText,
   FindsByName,
   FindsByTagName,
   FindsByXPath,
   JavascriptExecutor,
   SearchContext,
   WebDriver
);
function RemoteWebDriver(){

}
