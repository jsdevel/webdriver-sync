var imports = require('../imports');
var Class = imports.ChromeDriverService;
var DriverService = require('./DriverService');
var File = require('./File');
var Instance = require('./Instance');
var addFinalProp = require('../utils').addFinalProp;
var extendAll = require('../utils').extendAll;
var objectToMap = require('../utils').objectToMapStringString;
var assert = require('../assert');

module.exports = ChromeDriverService;

extendAll(ChromeDriverService, DriverService);

function ChromeDriverService(instance) {
  assert(instance).isInstanceof(Instance).throws(
    "ChromeDriverService has no public constructor."
    );
  addFinalProp(this, "_instance", instance._instance);
}

ChromeDriverService.CHROME_DRIVER_EXE_PROPERTY
  = ChromeDriverService.prototype.CHROME_DRIVER_EXE_PROPERTY
  = Class.CHROME_DRIVER_EXE_PROPERTY;

ChromeDriverService.CHROME_DRIVER_LOG_PROPERTY
  = ChromeDriverService.prototype.CHROME_DRIVER_LOG_PROPERTY
  = Class.CHROME_DRIVER_LOG_PROPERTY;

ChromeDriverService.createDefaultService
  = ChromeDriverService.prototype.createDefaultService
  = function() {
    return new ChromeDriverService(
      new Instance(Class.createDefaultServiceSync())
     );
  };

ChromeDriverService.Builder
  = ChromeDriverService.prototype.Builder
  = Builder;

function Builder() {
  addFinalProp(this, "_instance", new imports.ChromeDriverServiceBuilder());
}

Builder.prototype.build = function() {
  return new ChromeDriverService(
    new Instance(this._instance.buildSync())
  );
};

Builder.prototype.usingAnyFreePort = function() {
  this._instance.usingAnyFreePortSync();
  return this;
};

Builder.prototype.usingDriverExecutable = function(file) {
  assert(file).isInstanceof(File).throws(
    "file must be an instance of File."
    );
  this._instance.usingDriverExecutableSync(file._instance);
  return this;
};

Builder.prototype.usingPort = function(port) {
  assert(port).isNumber().throws("port must be a number.");
  this._instance.usingPortSync(port);
  return this;
};

Builder.prototype.withEnvironment = function(environment) {
  assert(environment).isInstanceof(Object).throws(
    "environment must be an object."
    );
  this._instance.withEnvironmentSync(objectToMap(environment));
  return this;
};

Builder.prototype.withLogFile = function(logFile) {
  assert(logFile).isInstanceof(File).throws(
    "logFile must be an instance of File"
    );
  this._instance.withLogFileSync(logFile._instance);
  return this;
};