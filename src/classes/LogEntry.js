'use strict';

var assert = require('../assert');
var utils = require('../utils');
var addFinalProp = utils.addFinalProp;
var extendAll = utils.extendAll;
var Long = require('../imports').Long;
var Class = require('../imports').LogEntry;
var Instance = require('./Instance');
var Level = require('./Level');

module.exports = LogEntry;

function LogEntry(level, timestamp, message) {
  var instance;
  if(arguments.length === 1){
    assert(level).extends(Instance).throws(
      'expected an Instance'
    );
  } else {
    assert(level).extends(Level).throws(
      'expected level to be an instance of Level'
    );
    instance = new Class(level._instance, new Long(timestamp), message);
  }

  addFinalProp(this, '_instance', instance);
}

LogEntry.prototype.getLevel=function(){
  return Level[this._instance.getLevelSync().toStringSync()];
};
LogEntry.prototype.getMessage=function(){
  return this._instance.getMessageSync();
};
LogEntry.prototype.getTimestamp=function(){
  return this._instance.getTimestampSync();
};
LogEntry.prototype.toMap=function(){
  return utils.mapToObject(this._instance.toMapSync());
};
LogEntry.prototype.toString=function(){
  return this._instance.toStringSync();
};