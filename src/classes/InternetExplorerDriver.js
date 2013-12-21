var Class = require('../imports').InternetExplorerDriver;
var Capabilities = require('../interfaces/Capabilities');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var assert = require('../assert');
var messages = require('../messages');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;

module.exports = InternetExplorerDriver;

extendAll(
  InternetExplorerDriver,
  TakesScreenshot,
  RemoteWebDriver
  );

//TODO finish constructor arguments
function InternetExplorerDriver(capabilities) {
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