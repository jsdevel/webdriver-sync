'use strict';

var Class = require('../imports').ChromeDriver;
var Capabilities = require('../interfaces/Capabilities');
var ChromeDriverService = require('./ChromeDriverService');
var ChromeOptions = require('./ChromeOptions');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

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

  if (!len) {
    instance = new Class();
  } else if (len === 1 || len === 2) {
    assert(first)
      .extends(Capabilities)
      .or(ChromeOptions)
      .or(ChromeDriverService)
      .throws(
        'The first argument must be an instance of ' +
        'Capabilities, ChromeDriverService or ChromeOptions.'
        );
    if (len === 1) {
      instance = new Class(first._instance);
    } else if (len === 2) {
      assert(first)
        .extends(ChromeDriverService)
        .throws(
          'The first argument must be an instance of ChromeDriverService.'
          );
      assert(capabilitiesOrOptions)
        .extends(Capabilities)
        .or(ChromeOptions)
        .throws(
          'The second argument must be an instance of '+
          'Capabilities or ChromeOptions.'
          );
      instance = new Class(first._instance, capabilitiesOrOptions._instance);
    }
  } else {
    throw new Error('The wrong number of arguments was given.');
  }

  addFinalProp(this, '_instance', instance);
}
