'use strict';

var addFinalProp = require('../utils').addFinalProp;

module.exports = Killable;

function Killable(instance) {
  addFinalProp(this, '_instance', instance);
}
Killable.prototype.kill = function() {
  this._instance.killSync();
};