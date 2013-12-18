/*!
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
var Class = require('../imports').TimeUnit;
var Long = require('../imports').Long;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = TimeUnit;

function TimeUnit(instance) {
  addFinalProp(this, "_instance", instance);
}

TimeUnit.DAYS =
  TimeUnit.prototype.DAYS =
  new TimeUnit(Class.DAYS);
TimeUnit.HOURS =
  TimeUnit.prototype.HOURS =
  new TimeUnit(Class.HOURS);
TimeUnit.MICROSECONDS =
  TimeUnit.prototype.MICROSECONDS =
  new TimeUnit(Class.MICROSECONDS);
TimeUnit.MILLISECONDS =
  TimeUnit.prototype.MILLISECONDS =
  new TimeUnit(Class.MILLISECONDS);
TimeUnit.MINUTES =
  TimeUnit.prototype.MINUTES =
  new TimeUnit(Class.MINUTES);
TimeUnit.NANOSECONDS =
  TimeUnit.prototype.NANOSECONDS =
  new TimeUnit(Class.NANOSECONDS);
TimeUnit.SECONDS =
  TimeUnit.prototype.SECONDS =
  new TimeUnit(Class.SECONDS);

TimeUnit.prototype.convert = function(duration, unit) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  assert(unit)
    .isInstanceof(TimeUnit)
    .throws("The second argument must be a TimeUnit.");
  return this._instance.convertSync(new Long(duration), unit._instance);
};

TimeUnit.prototype.sleep = function(timeout) {
  assert(timeout).isNumber().throws("The first argument must be a number.");
  this._instance.sleepSync(new Long(timeout));
};

TimeUnit.prototype.toDays = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toDaysSync(new Long(duration));
};

TimeUnit.prototype.toHours = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toHoursSync(new Long(duration));
};

TimeUnit.prototype.toMicros = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toMicrosSync(new Long(duration));
};

TimeUnit.prototype.toMillis = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toMillisSync(new Long(duration));
};

TimeUnit.prototype.toMinutes = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toMinutesSync(new Long(duration));
};

TimeUnit.prototype.toNanos = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toNanosSync(new Long(duration));
};

TimeUnit.prototype.toSeconds = function(duration) {
  assert(duration).isNumber().throws("The first argument must be a number.");
  return this._instance.toSecondsSync(new Long(duration));
};

TimeUnit.valueOf = TimeUnit.prototype.valueOf = function(name) {
  assert(name).isString().throws("The first argument must be a string.");
  return new TimeUnit(this._instance.valueOfSync(name));
};

TimeUnit.valueOf = TimeUnit.prototype.values = function() {
  return this._instance.valuesSync().map(function(v) {
    return new TimeUnit(v);
  });
};