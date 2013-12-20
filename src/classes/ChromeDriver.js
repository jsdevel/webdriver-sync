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
var Class = require('../imports').ChromeDriver;
var Capabilities = require('../interfaces/Capabilities');
var ChromeDriverService = require('./ChromeDriverService');
var ChromeOptions = require('./ChromeOptions');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');
var findsChromeDriver = require('./../lib/finds-chrome-driver')

module.exports = ChromeDriver;

extendAll(
  ChromeDriver,
  TakesScreenshot,
  RemoteWebDriver
  );

function ChromeDriver(
  capabilitiesOrOptionsOrChromeDriverService,
  capabilitiesOrOptions
  ) {
  var instance;
  var first = capabilitiesOrOptionsOrChromeDriverService;
  var len = arguments.length;

  if(!findsChromeDriver.find()) {
    throw new Error("`chromedriver` could not be found on the PATH. Download Chrome driver from: http://chromedriver.storage.googleapis.com/index.html");
  }

  if (!len) {
    instance = new Class();
  } else if (len === 1 || len === 2) {
    assert(first)
      .isInstanceof(Capabilities)
      .or(ChromeOptions)
      .or(ChromeDriverService)
      .throws(
        "The first argument must be an instance of " +
        "Capabilities, ChromeDriverService or ChromeOptions."
        );
    if (len === 1) {
      instance = new Class(first._instance);
    } else if (len === 2) {
      assert(first)
        .isInstanceof(ChromeDriverService)
        .throws(
          "The first argument must be an instance of ChromeDriverService."
          );
      assert(capabilitiesOrOptions)
        .isInstanceof(Capabilities)
        .or(ChromeOptions)
        .throws(
          "The second argument must be an instance of "+
          "Capabilities or ChromeOptions."
          );
      instance = new Class(first._instance, capabilitiesOrOptions._instance);
    }
  } else {
    throw new Error("The wrong number of arguments was given.");
  }

  addFinalProp(this, "_instance", instance);
}
