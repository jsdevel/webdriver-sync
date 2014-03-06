'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Class = require('../imports').Platform;

module.exports = Platform;

function Platform(instance) {
  addFinalProp(this, '_instance', instance);
}

Platform.prototype.getMajorVersion = function() {
  return this._instance.getMajorVersionSync();
};
Platform.prototype.getMinorVersion = function() {
  return this._instance.getMinorVersionSync();
};
Platform.prototype.getPartOfOsName = function() {
  return this._instance.getPartOfOsNameSync();
};
Platform.prototype.is = function(compareWith) {
  if (!(compareWith instanceof Platform)) {
    throw new Error('argument must be an instance of Platform');
  }
  return this._instance.isSync(compareWith._instance);
};

Platform.ANDROID = Platform.prototype.ANDROID = new Platform(Class.ANDROID);
Platform.ANY = Platform.prototype.ANY = new Platform(Class.ANY);
Platform.LINUX = Platform.prototype.LINUX = new Platform(Class.LINUX);
Platform.MAC = Platform.prototype.MAC = new Platform(Class.MAC);
Platform.UNIX = Platform.prototype.UNIX = new Platform(Class.UNIX);
Platform.VISTA = Platform.prototype.VISTA = new Platform(Class.VISTA);
Platform.WIN8 = Platform.prototype.WIN8 = new Platform(Class.WIN8);
Platform.WINDOWS = Platform.prototype.WINDOWS = new Platform(Class.WINDOWS);
Platform.XP = Platform.prototype.XP = new Platform(Class.XP);


Platform.extractFromSysProperty
  = Platform.prototype.extractFromSysProperty
  = function(osName, osVersion) {
    if (osVersion) {
      return new Platform(Class.extractFromSysPropertySync(osName, osVersion));
    }
    return new Platform(Class.extractFromSysPropertySync(osName));
  };

Platform.getCurrent
  = Platform.prototype.getCurrent
  = function() {
    return new Platform(Class.getCurrentSync());
  };

Platform.valueOf
  = Platform.prototype.valueOf
  = function(name) {
    return new Platform(Class.valueOfSync(name));
  };

Platform.values
  = Platform.prototype.values
  = function() {
    return Class.valuesSync.map(function(v) {
      return new Platform(v);
    });
  };

