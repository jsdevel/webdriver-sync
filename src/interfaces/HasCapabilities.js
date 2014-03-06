'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Capabilities = require('./Capabilities');

module.exports = HasCapabilities;

function HasCapabilities(instance) {
  addFinalProp(this, '_instance', instance);
}
HasCapabilities.prototype.getCapabilities = function() {
  return new Capabilities(this._instance.getCapabilitiesSync());
};