var Class = require('../imports').SafariDriver;
var Capabilities = require('../interfaces/Capabilities');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var messages = require('../messages');
var assert = require('../assert');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;

module.exports = SafariDriver;

extendAll(
  SafariDriver,
  TakesScreenshot,
  RemoteWebDriver
  );

//TODO finish constructor arguments
function SafariDriver(capabilities) {
  var instance;
  var len = arguments.length;

  if (!len) {
    instance = new Class();
  } else if (len === 1) {
    assert(capabilities)
      .isInstanceof(Capabilities)
      .throws(
        messages.UN_FINISHED_CONSTRUCTOR
        );
    instance = new Class(capabilities._instance);
  } else {
    throw new Error(messages.UN_FINISHED_CONSTRUCTOR);
  }

  addFinalProp(this, "_instance", instance);
}