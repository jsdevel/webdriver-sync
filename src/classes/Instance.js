'use strict';

var addFinalProp = require('../utils').addFinalProp;

module.exports = Instance;

/**
 * Used to store an instance for retrieval within our app.
 * This should never be exposed to the client.
 * @param {Object} instance
 */
function Instance(instance) {
  addFinalProp(this, '_instance', instance);
}