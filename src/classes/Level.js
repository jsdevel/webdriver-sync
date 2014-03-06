'use strict';

var Class = require('../imports').Level;
var addFinalProp = require('../utils').addFinalProp;

module.exports = Level;

function Level(instance) {
  addFinalProp(this, '_instance', instance);
}

Level.ALL = Level.prototype.ALL = new Level(Class.ALL);
Level.CONFIG = Level.prototype.CONFIG = new Level(Class.CONFIG);
Level.FINE = Level.prototype.FINE = new Level(Class.FINE);
Level.FINER = Level.prototype.FINER = new Level(Class.FINER);
Level.FINEST = Level.prototype.FINEST = new Level(Class.FINEST);
Level.INFO = Level.prototype.INFO = new Level(Class.INFO);
Level.OFF = Level.prototype.OFF = new Level(Class.OFF);
Level.SEVERE = Level.prototype.SEVERE = new Level(Class.SEVERE);
Level.WARNING = Level.prototype.WARNING = new Level(Class.WARNING);