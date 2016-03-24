'use strict';

var imports = require('../imports');
var Class = imports.GeckoDriverService;
var DriverService = require('./DriverService');
var File = require('./File');
var Instance = require('./Instance');
var addFinalProp = require('../utils').addFinalProp;
var extendAll = require('../utils').extendAll;
var objectToMap = require('../utils').objectToMapStringString;
var assert = require('../assert');

module.exports = GeckoDriverService;

extendAll(GeckoDriverService, DriverService);

function GeckoDriverService(instance) {
	assert(instance).extends(Instance).throws(
		'GeckoDriverService has no public constructor.'
	);
	addFinalProp(this, '_instance', instance._instance);
}

GeckoDriverService.GECKO_DRIVER_EXE_PROPERTY
	= GeckoDriverService.prototype.GECKO_DRIVER_EXE_PROPERTY
	= Class.GECKO_DRIVER_EXE_PROPERTY;

GeckoDriverService.createDefaultService
	= GeckoDriverService.prototype.createDefaultService
	= function() {
	return new GeckoDriverService(
		new Instance(Class.createDefaultServiceSync())
	);
};