/*
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  addFinalProp(this, "_instance", instance);
}

ErrorHandler.prototype.isIncludeServerErrors = function() {
  this._instance.isIncludeServerErrorsSync();
};
ErrorHandler.prototype.setIncludeServerErrors = function(include) {
  this._instance.setIncludeServerErrorsSync(include);
};
ErrorHandler.prototype.throwIfResponseFailed = function(response, duration) {
  assert(response).isInstanceof(Response).throws(
    "The first argument must be an instance of Response."
    );
  assert(duration).isNumber().throws(
    "The second argument must be a number."
    );
  return new Response(
    this._instance.throwIfResponseFailedSync(
      response._instance, new Long(duration)
      )
   );
};