'use strict';

var Class = require('../imports').ErrorHandler;
var Long = require('../imports').Long;
var Response = require('./Response');
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = ErrorHandler;

function ErrorHandler(includeServerErrors) {
  var instance;
  if (assert.isBool(includeServerErrors)) {
    instance = new Class(includeServerErrors);
  } else {
    instance = new Class();
  }
  addFinalProp(this, '_instance', instance);
}

ErrorHandler.prototype.isIncludeServerErrors = function() {
  this._instance.isIncludeServerErrorsSync();
};
ErrorHandler.prototype.setIncludeServerErrors = function(include) {
  this._instance.setIncludeServerErrorsSync(include);
};
ErrorHandler.prototype.throwIfResponseFailed = function(response, duration) {
  assert(response).extends(Response).throws(
    'The first argument must be an instance of Response.'
    );
  assert(duration).isNumber().throws(
    'The second argument must be a number.'
    );
  return new Response(
    this._instance.throwIfResponseFailedSync(
      response._instance, new Long(duration)
      )
   );
};