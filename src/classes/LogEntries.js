'use strict';

module.exports = LogEntries;

var utils = require('../utils');
var addFinalProp = utils.addFinalProp;
var collectionToArray = utils.collectionToArray;
var assert = require('../assert');
var Level = require('./Level');
var LogEntry = require('./Level');
var Instance = require('./Instance');

function LogEntries(instance){
  assert(instance).extends(Instance).throws(
    'expected instance to be an Instance'
  );
  addFinalProp(this, '_instance', instance._instance);
}

LogEntries.prototype.filter = function(level){
  assert(level).extends(Level).throws('level must be an instance of Level');
  return toLogEntryArray(this._instance.filterSync(level));
};

LogEntries.prototype.getAll = function(){
  return toLogEntryArray(this._instance.getAllSync());
};

function toLogEntryArray(list){
  return collectionToArray(list, function(item){
    return new LogEntry(new Instance(item));
  });
}
