'use strict';

var Class = require('../imports').MarionetteDriver;
var Capabilities = require('../interfaces/Capabilities');
var GeckoDriverService = require('./GeckoDriverService');
var TakesScreenshot = require('../interfaces/TakesScreenshot');
var RemoteWebDriver = require('./RemoteWebDriver');
var extendAll = require('../utils').extendAll;
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = MarionetteDriver;

extendAll(
	MarionetteDriver,
	TakesScreenshot,
	RemoteWebDriver
);

function MarionetteDriver(
	capabilitiesOrGeckoDriverService,
	capabilities
) {
	var instance;
	var first = capabilitiesOrGeckoDriverService;
	var len = arguments.length;

	if (!len) {
		instance = new Class();
	} else if (len === 1 || len === 2) {
		assert(first)
			.extends(Capabilities)
			.or(GeckoDriverService)
			.throws(
				'The first argument must be an instance of ' +
				'Capabilities, GeckoDriverService.'
			);
		if (len === 1) {
			instance = new Class(first._instance);
		} else if (len === 2) {
			assert(first)
				.extends(GeckoDriverService)
				.throws(
					'The first argument must be an instance of GeckoDriverService.'
				);
			assert(capabilities)
				.extends(Capabilities)
				.throws(
					'The second argument must be an instance of '+
					'Capabilities.'
				);
			instance = new Class(first._instance, capabilities._instance);
		}
	} else {
		throw new Error('The wrong number of arguments was given.');
	}

	addFinalProp(this, '_instance', instance);
}
