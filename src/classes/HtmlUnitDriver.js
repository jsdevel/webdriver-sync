var Class = require('../imports').HtmlUnitDriver;
var Capabilities = require('../interfaces/Capabilities');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var extendAll = require('../utils').extendAll;
var assert = require('../assert');
var addFinalProp = require('../utils').addFinalProp;

module.exports = HtmlUnitDriver;

extendAll(
  HtmlUnitDriver,
  RemoteWebDriver
  );

//TODO: Finish constructor arguments
function HtmlUnitDriver(
  desiredCapabilitiesOrEnableJavascript
  ) {
  var instance;
  var first = desiredCapabilitiesOrEnableJavascript;
  var len = arguments.length;

  if (!len) {
    instance = new Class();
  } else if (len === 1) {
    if (assert(first).isInstanceof(Capabilities).isValid) {
      instance = new Class(first._instance);
    } else if (assert.isBool(first)) {
      instance = new Class(first);
    } else {
      throw new Error(
        "The first argument must be an instance of Capabilities or a boolean."
       );
    }
  } else {
    throw new Error("The wrong number of arguments was given.");
  }

  addFinalProp(this, "_instance", instance);
}
//TODO: finish static fields