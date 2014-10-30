'use strict';

module.exports = LoggingPreferences;

var Level = require('./Level');
var LoggingPreferencesClass = require('../imports').LoggingPreferences;
var utils = require('../utils');
var addFinalProp = utils.addFinalProp;
var collectionToArray = utils.collectionToArray;
var assert = require('../assert');

function LoggingPreferences(){
  addFinalProp(
    this,
    '_instance',
    new LoggingPreferencesClass()
  );
}

LoggingPreferences.prototype.addPreferences = function(prefs){
  assert(prefs).extends(LoggingPreferences).throws(
    'expectes prefs to be an instance of LoggingPreferences'
  );
  return new LoggingPreferences(
    this._instance.addPreferencesSync(prefs._instance)
  );
};

LoggingPreferences.prototype.enable = function(logType, level){
  assert(logType).isString().throws('expected logType to be a string');
  assert(level).extends(Level).throws('expected level to be a Level');
  this._instance.enableSync(logType, level._instance);
};

LoggingPreferences.prototype.getEnabledLogTypes = function(){
  return collectionToArray(this._instance.getEnabledLogTypesSync());
};

LoggingPreferences.prototype.getLevel = function(logType){
  assert(logType).isString().throws('expected logType to be a string');
  return new Level(this._instance.getLevelSync(logType));
};
