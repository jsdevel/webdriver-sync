var Class = require('../imports').RemoteWebDriver;
var URL = require('../imports').URL;
var addFinalProp = require('../utils').addFinalProp;
var extendAll = require('../utils').extendAll;
var assert = require('../assert');

var ErrorHandler = require('./ErrorHandler');
var Instance = require('./Instance');
var RemoteStatus = require('./RemoteStatus');
var SessionId = require('./SessionId');

var Capabilities = require('../interfaces/Capabilities');
var CommandExecutor = require('../interfaces/CommandExecutor');
var FileDetector = require('../interfaces/FileDetector');
var HasCapabilities = require('../interfaces/HasCapabilities');
var HasInputDevices = require('../interfaces/HasInputDevices');
var FindsByClassName = require('../interfaces/FindsByClassName');
var FindsByCssSelector = require('../interfaces/FindsByCssSelector');
var FindsById = require('../interfaces/FindsById');
var FindsByLinkText = require('../interfaces/FindsByLinkText');
var FindsByName = require('../interfaces/FindsByName');
var FindsByTagName = require('../interfaces/FindsByTagName');
var FindsByXPath = require('../interfaces/FindsByXPath');
var JavascriptExecutor = require('../interfaces/JavascriptExecutor');
var SearchContext = require('../interfaces/SearchContext');
var WebDriver = require('../interfaces/WebDriver');

module.exports = RemoteWebDriver;

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

function RemoteWebDriver(
  capabilitiesOrExecutorOrRemoteAddress,
  desiredCapabilities,
  requiredCapabilities
  ) {
  var instance;
  var first = capabilitiesOrExecutorOrRemoteAddress;
  var len = arguments.length;
  if (len > 0 && len < 4) {
    if (
      !assert.isString(first)
      &&
      !assert(first).isInstanceof(CommandExecutor).isValid
      &&
      !assert(first).isInstanceof(Capabilities).isValid
      ) {
      throw new Error(
        "The first argument must be a string, CommandExecutor, " +
        "or Capabilities."
        );
    }
    if (
      len > 1
      &&
      !assert(desiredCapabilities).isInstanceof(Capabilities)
      ) {
      throw new Error(
        "The second argument must be an isntance of Capabilities."
        );
    }
    if (
      len === 3
      &&
      !assert(requiredCapabilities).isInstanceof(Capabilities)
      ) {
      throw new Error(
        "The third argument must be an isntance of Capabilities."
        );
    }
  } else {
    throw new Error("Expected to see 1 to 3 arguments.");
  }
  switch (len) {
    case 1:
      assert(first).isInstanceof(Instance).throws(
        "a single agument must be an instance of Instance"
        );
      instance = new Class(first._instance);
      break;
    case 2:
      if (assert.isString(first)) {
        instance = new Class(
          new URL(first),
          desiredCapabilities._instance
          );
      } else {
        instance = new Class(
          capabilitiesOrExecutorOrRemoteAddress._instance,
          desiredCapabilities._instance
          );
      }
      break;
    case 3:
      if (assert.isString(first)) {
        instance = new Class(
          new URL(first),
          desiredCapabilities._instance,
          requiredCapabilities._instance
          );
      } else if (assert(first).isInstanceof(CommandExecutor).isValid) {
        instance = new Class(
          first._instance,
          desiredCapabilities._instance,
          requiredCapabilities._instance
          );
      } else {
        throw new Error(
          "The first argment wasn't a string or an instance of CommandExecutor."
          );
      }
      break;
  }

  addFinalProp(this, "_instance", instance);
}

RemoteWebDriver.prototype.getCommandExecutor = function() {
  return new CommandExecutor(
    this._instance.getCommandExecutorSync()
    );
};

RemoteWebDriver.prototype.getErrorHandler = function() {
  return new ErrorHandler(this._instance.getErrorHandlerSync());
};

RemoteWebDriver.prototype.getFileDetector = function() {
  return new FileDetector(this._instance.getFileDetectorSync());
};

RemoteWebDriver.prototype.getRemoteStatus = function() {
  return new RemoteStatus(
    new Instance(this._instance.getRemoteStatusSync())
    );
};

RemoteWebDriver.prototype.getSessionId = function() {
  return new SessionId(
    new Instance(this._instance.getSessionIdSync())
    );
};

RemoteWebDriver.prototype.setFileDetector = function(detector) {
  assert(detector).isInstanceof(FileDetector).throws(
    "detector wasn't an instance of FileDetector"
    );
  this._instance.setFileDetectorSync(detector._instance);
};

RemoteWebDriver.prototype.setLogLevel = function(level) {
  this._instance.setLogLevelSync(level);
};
RemoteWebDriver.prototype.toString = function() {
  return this._instance.toStringSync();
};