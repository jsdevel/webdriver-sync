'use strict';

var assert = require('../assert');
var utils = require('../utils');
var addFinalProp = utils.addFinalProp;
var extendAll = utils.extendAll;
var Long = require('../imports').Long;
var Class = require('../imports').WebDriverWait;
var WebDriver = require('../interfaces/WebDriver');
var Wait = require('../interfaces/Wait');

module.exports = WebDriverWait;

extendAll(WebDriverWait, Wait);

function WebDriverWait(driver, timeout, sleep) {
  var instance;
  var argLength = arguments.length;

  if(argLength >= 2){
    assert(driver).extends(WebDriver).throws(
      'driver was not an instance of WebDriver'
    );
  }

  if(argLength >= 3){
    assert(sleep).isNumber().throws(
      'expected sleep to be  a number'
    );
  }

  assert(timeout).isNumber().throws(
    'expected timeout to be a number'
  );

  switch (arguments.length) {
    case 2:
      instance = new Class(
        driver._instance,
        new Long(timeout)
      );
      break;
    case 3:
      instance = new Class(
        driver._instance,
        new Long(timeout),
        new Long(sleep)
      );
      break;
  }

  addFinalProp(this, '_instance', instance);
}