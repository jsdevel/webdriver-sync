'use strict';

var Class = require('../imports').FirefoxProfile;
var File = require('./File');
var Instance = require('./Instance');
var addFinalProp = require('../utils').addFinalProp;

module.exports = FirefoxProfile;

function FirefoxProfile(fileOrInstance){
  var instance;

  if(fileOrInstance instanceof Instance){
    instance = fileOrInstance._instance;
  } else if(fileOrInstance instanceof File){
    instance = new Class(fileOrInstance._instance);
  } else {
    instance = new Class();
  }
  addFinalProp(this, '_instance', instance);
}


FirefoxProfile.PORT_PREFERENCE
  = FirefoxProfile.prototype.PORT_PREFERENCE
  = Class.PORT_PREFERENCE;

FirefoxProfile.fromJSON = FirefoxProfile.prototype.fromJSON = function(json){
  return new FirefoxProfile(new Instance(Class.fromJsonSync(json)));
};

FirefoxProfile.prototype.setPreference = function(key, value){
  switch(typeof value){
    case 'string':
    case 'number':
    case 'boolean':
      break;
    default:
      throw new Error('value must be string, number, or boolean');
  }

  this._instance.setPreference(key, value);
};

FirefoxProfile.prototype.toJSON = function(){
  return this._instance.toJsonSync();
};