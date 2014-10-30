'use strict';

var java = require('java');
var Class = require('../imports').DesiredCapabilities;
var Capabilities = require('../interfaces/Capabilities');
var Instance = require('../classes/Instance');
var assert = require('../assert');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;

module.exports = DesiredCapabilities;

extendAll(DesiredCapabilities, Capabilities);

function DesiredCapabilities(capabilities) {
  var instance;
  if (assert(capabilities).extends(Instance).isValid) {
    instance = capabilities._instance;
  }
  addFinalProp(this, '_instance', instance);
}
DesiredCapabilities.android =
  DesiredCapabilities.prototype.android = function() {
    return new DesiredCapabilities(new Instance(Class.androidSync()));
  };
DesiredCapabilities.chrome =
  DesiredCapabilities.prototype.chrome = function() {
    return new DesiredCapabilities(new Instance(Class.chromeSync()));
  };
DesiredCapabilities.firefox =
  DesiredCapabilities.prototype.firefox = function() {
    return new DesiredCapabilities(new Instance(Class.firefoxSync()));
  };
DesiredCapabilities.htmlUnit =
  DesiredCapabilities.prototype.htmlUnit = function() {
    return new DesiredCapabilities(new Instance(Class.htmlUnitSync()));
  };
DesiredCapabilities.htmlUnitWithJs =
  DesiredCapabilities.prototype.htmlUnitWithJs = function() {
    return new DesiredCapabilities(new Instance(Class.htmlUnitWithJsSync()));
  };
DesiredCapabilities.internetExplorer =
  DesiredCapabilities.prototype.internetExplorer = function() {
    return new DesiredCapabilities(new Instance(Class.internetExplorerSync()));
  };
DesiredCapabilities.internetExplorer =
  DesiredCapabilities.prototype.internetExplorer = function() {
    return new DesiredCapabilities(new Instance(Class.internetExplorerSync()));
  };
DesiredCapabilities.ipad =
  DesiredCapabilities.prototype.ipad = function() {
    return new DesiredCapabilities(new Instance(Class.ipadSync()));
  };
DesiredCapabilities.iphone =
  DesiredCapabilities.prototype.iphone = function() {
  return new DesiredCapabilities(new Instance(Class.iphoneSync()));
};
DesiredCapabilities.opera =
  DesiredCapabilities.prototype.opera = function() {
    return new DesiredCapabilities(new Instance(Class.operaSync()));
  };
DesiredCapabilities.phantomjs =
  DesiredCapabilities.prototype.phantomjs = function() {
    return new DesiredCapabilities(new Instance(Class.phantomjsSync()));
  };
DesiredCapabilities.safari =
  DesiredCapabilities.prototype.safari = function() {
    return new DesiredCapabilities(new Instance(Class.safariSync()));
  };


DesiredCapabilities.prototype.setCapability = function(name, value){
  if (value) {
    if (value instanceof Object && '_instance' in value)
      value = value._instance;
    else if (value instanceof Array)
      value = java.newArray('java.lang.String', value);
  }
  this._instance.setCapabilitySync(name, value);
};
