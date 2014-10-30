'use strict';

module.exports = DriverService;

function DriverService() {
  throw new Error('DriverService has a protected constructor.');
}

DriverService.prototype.getUrl = function() {
  return this._instance.getUrlSync().toStringSync();
};

DriverService.prototype.isRunning = function() {
  return this._instance.isRunningSync();
};

DriverService.prototype.start = function() {
  this._instance.startSync();
};

DriverService.prototype.stop = function() {
  this._instance.stopSync();
};