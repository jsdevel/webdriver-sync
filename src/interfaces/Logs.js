'use strict';

module.exports = Logs;

var utils = require('../utils');
var addFinalProp = utils.addFinalProp;
var collectionToArray = utils.collectionToArray;
var assert = require('../assert');
var Instance = require('../classes/Instance');
var LogEntries = require('../classes/LogEntries');

function Logs(instance){
  assert(instance).extends(Instance).throws(
    'expected instance to be an Instance'
  );
  addFinalProp(this, '_instance', instance._instance);
}

Logs.prototype.get = function(level){
  return new LogEntries(new Instance(
    this._instance.getSync(level)
  ));
};

Logs.prototype.getAvailableLogTypes = function(level){
  return collectionToArray(this._instance.getAvailableLogTypesSync());
};
