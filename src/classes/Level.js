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
var Class                      = require('../imports').Level;
var addFinalProp               = require('../utils').addFinalProp;

module.exports = Level;

function Level(instance){
   addFinalProp(this, "_instance", instance);
}

Level.ALL=Level.prototype.ALL =new Level(Class.ALL);
Level.CONFIG=Level.prototype.CONFIG =new Level(Class.CONFIG);
Level.FINE=Level.prototype.FINE =new Level(Class.FINE);
Level.FINER=Level.prototype.FINER =new Level(Class.FINER);
Level.FINEST=Level.prototype.FINEST =new Level(Class.FINEST);
Level.INFO=Level.prototype.INFO =new Level(Class.INFO);
Level.OFF=Level.prototype.OFF =new Level(Class.OFF);
Level.SEVERE=Level.prototype.SEVERE =new Level(Class.SEVERE);
Level.WARNING=Level.prototype.WARNING =new Level(Class.WARNING);