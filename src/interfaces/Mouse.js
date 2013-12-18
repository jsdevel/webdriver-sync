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
var addFinalProp = require('../utils').addFinalProp;
var Coordinates = require('./Coordinates');
var Long = require('../imports').Long;

module.exports = Mouse;

function Mouse(instance) {
  addFinalProp(this, "_instance", instance);
}
Mouse.prototype.click = function(where) {
  assertCoordinates(where);
  this._instance.clickSync(where);
};
Mouse.prototype.contextClick = function(where) {
  assertCoordinates(where);
  this._instance.contextClickSync(where);
};
Mouse.prototype.doubleClick = function(where) {
  assertCoordinates(where);
  this._instance.doubleClickSync(where);

};
Mouse.prototype.mouseDown = function(where) {
  assertCoordinates(where);
  this._instance.mouseDownSync(where);
};
Mouse.prototype.mouseMove = function(where, xOffset, yOffset) {
  assertCoordinates(where);
  if (typeof xOffset === 'number' && typeof yOffset === 'number') {
    this._instance.mouseMoveSync(where);
  } else {
    this._instance.mouseMoveSync(where, new Long(xOffset), new Long(yOffset));
  }

};
Mouse.prototype.mouseUp = function(where) {
  assertCoordinates(where);
  this._instance.mouseUpSync(where);
};

function asssertCoordinates(where) {
  if (!(where instanceof Coordinates)) {
    throw new Error("where must be an instanceof Coordinates");
  }
}

function assertCoordinates(coords){
  if(coords instanceof Coordinates){
    return;
  }
  throw new Error("the first argument wasn't an instance of Coordinates");
}