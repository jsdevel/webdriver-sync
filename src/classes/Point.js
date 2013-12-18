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
var addFinalProp = require('../utils').addFinalProp;
var Class = require('../imports').Point;

module.exports = Point;

function Point(instance, y) {
  if (typeof y === 'number') {
    instance = new Class(instance, y);
  }
  addFinalProp(this, "_instance", instance);
}
Point.prototype.getX = function() {
  return this._instance.getXSync();
};
Point.prototype.getY = function() {
  return this._instance.getYSync();
};
Point.prototype.move = function(x, y) {
  return this._instance.moveSync(x, y);
};
Point.prototype.moveBy = function(xOff, yOff) {
  return new Point(this._instance.moveBySync(xOff, yOff));
};
Point.prototype.toString = function() {
  return this._instance.toStringSync();
};