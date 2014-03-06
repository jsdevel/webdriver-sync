'use strict';

var addFinalProp = require('../utils').addFinalProp;

module.exports = ExpectedCondition;

function ExpectedCondition(instance) {
  addFinalProp(this, '_instance', instance);
}
