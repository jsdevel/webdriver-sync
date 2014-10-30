'use strict';

var Class = require('../imports').FirefoxDriver;
var Capabilities = require('../interfaces/Capabilities');
var FirefoxProfile = require('../classes/FirefoxProfile');
var Killable = require('../interfaces/Killable');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = FirefoxDriver;

extendAll(
  FirefoxDriver,
  Killable,
  TakesScreenshot,
  RemoteWebDriver
  );

//TODO: Finish constructor arguments
function FirefoxDriver(
  desiredCapabilities,
  requiredCapabilities
  ) {
  var instance;
  var first = desiredCapabilities;
  var len = arguments.length;

  if (!len) {
    instance = new Class();
  } else if (len === 1 || len === 2) {
    assert(first)
      .extends(Capabilities)
      .or(FirefoxProfile)
      .throws(
        'The first argument wasn\'t an instanceof Capabilities.'
        );
    if (len === 1) {
      instance = new Class(first._instance);
    } else if (len === 2) {
      assert(requiredCapabilities)
        .extends(Capabilities)
        .throws(
          'The second argument must be an instance of Capabilities.'
          );
      instance = new Class(first._instance, requiredCapabilities._instance);
    }
  } else {
    throw new Error('The wrong number of arguments was given.');
  }

  addFinalProp(this, '_instance', instance);
}
//TODO: finish static fields