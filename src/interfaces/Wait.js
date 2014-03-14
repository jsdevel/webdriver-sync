'use strict';

var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');
var ExpectedCondition = require('./ExpectedCondition');

module.exports = Wait;

function Wait(instance){
  addFinalProp(this, '_instance', instance);
}

Wait.prototype.until = function(func){
  assert(func).extends(ExpectedCondition).throws(
    'func not an instance of ExpectedCondition'
  );
  this._instance.untilSync(func._instance);
};