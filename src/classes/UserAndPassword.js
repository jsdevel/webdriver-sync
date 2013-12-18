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
var Credentials = require('../interfaces/Credentials');
var addFinalProp = require('../utils').addFinalProp;
var extend = require('../utils').extend;
var Class = require('../imports').UserAndPassword;

module.exports = UserAndPassword;

extend(UserAndPassword, Credentials);
function UserAndPassword(username, password) {
  addFinalProp(this, "_username", username);
  addFinalProp(this, "_password", password);
  addFinalProp(this, "_instance", new Class(username, password));
}