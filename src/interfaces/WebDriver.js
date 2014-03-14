'use strict';

var Alert = require('./Alert');
var Instance = require('../classes/Instance');
var SearchContext = require('./SearchContext');
var WebElement = require('./WebElement');
var Cookie = require('../classes/Cookie');
var Dimension = require('../classes/Dimension');
var Long = require('../imports').Long;
var Point = require('../classes/Point');
var extend = require('../utils').extend;
var addFinalProp = require('../utils').addFinalProp;
var collectionToArray = require('../utils').collectionToArray;
var assert = require('../assert');
var TimeUnit = require('../enums/TimeUnit');

module.exports = WebDriver;

extend(WebDriver, SearchContext);
function WebDriver(_instance) {
  addFinalProp(this, '_instance', _instance);
}
WebDriver.prototype.close = function() {
  this._instance.closeSync();
};
WebDriver.prototype.get = function(src) {
  this._instance.getSync(src);
};
WebDriver.prototype.getCurrentUrl = function() {
  return this._instance.getCurrentUrlSync();
};
WebDriver.prototype.getPageSource = function() {
  return this._instance.getPageSourceSync();
};
WebDriver.prototype.getTitle = function() {
  return this._instance.getTitleSync();
};
WebDriver.prototype.getWindowHandle = function() {
  return this._instance.getWindowHandle();
};
WebDriver.prototype.getWindowHandles = function() {
  return collectionToArray(this._instance.getWindowHandlesSync());
};
//TODO
WebDriver.prototype.manage = function() {
  return new Options(this._instance.manageSync());
};
WebDriver.prototype.navigate = function() {
  return new Navigation(this._instance.navigateSync());
};
WebDriver.prototype.quit = function() {
  this._instance.quitSync();
};
WebDriver.prototype.switchTo = function() {
  return new TargetLocator(this._instance.switchToSync());
};
WebDriver.prototype.ImeHandler = ImeHandler;
WebDriver.prototype.Navigation = Navigation;
WebDriver.prototype.Options = Options;
WebDriver.prototype.TargetLocator = TargetLocator;
WebDriver.prototype.Timeouts = Timeouts;
WebDriver.prototype.Window = Window;

//IME HANDLER
function ImeHandler(instance) {
  addFinalProp(this, '_instance', instance);
}
ImeHandler.prototype.activateEngine = function(engine) {
  this._instance.activateEngineSync(engine);
};
ImeHandler.prototype.deactivate = function() {
  this._instance.deactivateSync();
};
ImeHandler.prototype.getActiveEngine = function() {
  return this._instance.getActiveEngineSync();
};
ImeHandler.prototype.getAvailableEngines = function() {
  return collectionToArray(this._instance.getAvailableEnginesSync);
};
ImeHandler.prototype.isActivated = function() {
  return this._instance.isActivatedSync();
};

//NAVIGATION
function Navigation(instance) {
  addFinalProp(this, '_instance', instance);
}
Navigation.prototype.back = function() {
  this._instance.backSync();
};
Navigation.prototype.forward = function() {
  this._instance.forwardSync();
};
Navigation.prototype.refresh = function() {
  this._instance.refreshSync();
};
Navigation.prototype.to = function(url) {
  this._instance.toSync(url);
};

//OPTIONS
function Options(instance) {
  addFinalProp(this, '_instance', instance);
}
Options.prototype.addCookie = function(cookie) {
  assertIsCookie(cookie);
  this._instance.addCookieSync(cookie._instance);
};
Options.prototype.deleteAllCookies = function() {
  this._instance.deleteAllCookiesSync();
};
Options.prototype.deleteCookie = function(cookie) {
  assertIsCookie(cookie);
  this._instance.deleteCookieSync(cookie._instance);
};
Options.prototype.deleteCookieNamed = function(name) {
  this._instance.deleteCookieNamedSync(name);
};
Options.prototype.getCookieNamed = function(name) {
  var proposedCookie = this._instance.getCookieNamedSync(name);
  if (proposedCookie) {
    return new Cookie(new Instance(proposedCookie));
  }
  return null;
};
Options.prototype.getCookies = function() {
  var cookies = this._instance.getCookiesSync();
  var arr = collectionToArray(cookies, function(item) {
    return new Cookie(new Instance(item));
  });
  return arr;
};
Options.prototype.ime = function() {
  return new ImeHandler(this._instance.imeSync());
};
Options.prototype.timeouts = function() {
  return new Timeouts(this._instance.timeoutsSync());
};
Options.prototype.window = function() {
  return new Window(this._instance.windowSync());
};


//TARGET LOCATOR
function TargetLocator(instance) {
  addFinalProp(this, '_instance', instance);
}
TargetLocator.prototype.activeElement = function() {
  return new WebElement(
    this._instance.activeElementSync()
    );
};
TargetLocator.prototype.alert = function() {
  return new Alert(this._instance.alertSync());
};
TargetLocator.prototype.defaultContent = function() {
  return new WebDriver(this._instance.defaultContentSync());
};
TargetLocator.prototype.frame = function(proposed) {
  var arg;
  if (proposed instanceof WebElement) {
    arg = proposed._instance;
  } else {
    arg = proposed;
  }
  return new WebDriver(this._instance.frameSync(arg));
};
TargetLocator.prototype.window = function(name) {
  return new WebDriver(this._instance.windowSync(name));
};

function Timeouts(instance) {
  addFinalProp(this, '_instance', instance);
}
Timeouts.prototype.implicitlyWait = function(time, unit) {
  assertIsTimeUnit(unit);
  return new this.constructor(
    this._instance.implicitlyWaitSync(new Long(time), unit._instance)
    );
};
Timeouts.prototype.pageLoadTimeout = function(time, unit) {
  assertIsTimeUnit(unit);
  return new this.constructor(
    this._instance.pageLoadTimeoutSync(new Long(time), unit._instance)
    );
};
Timeouts.prototype.setScriptTimeout = function(time, unit) {
  assertIsTimeUnit(unit);
  return new this.constructor(
    this._instance.setScriptTimeoutSync(new Long(time), unit._instance)
    );
};

function Window(instance) {
  addFinalProp(this, '_instance', instance);
}
Window.prototype.getPosition = function() {
  return new Point(this._instance.getPositionSync());
};
Window.prototype.getSize = function() {
  return new Dimension(this._instance.getSizeSync());
};
Window.prototype.maximize = function() {
  this._instance.maximizeSync();
};
Window.prototype.setPosition = function(targetPosition) {
  if (!(targetPosition instanceof Point)) {
    throw new Error('argument must be a Point');
  }
  this._instance.setPositionSync(targetPosition._instance);
};
Window.prototype.setSize = function(targetSize) {
  if (!(targetSize instanceof Dimension)) {
    throw new Error('argument must be a Dimension');
  }
  this._instance.setSizeSync(targetSize._instance);
};


//utils
function assertIsCookie(cookie) {
  if (!(cookie instanceof Cookie)) {
    throw new Error('argument wasn\'t an instance of Cookie.');
  }
}

function assertIsTimeUnit(unit){
  assert(unit)
    .extends(TimeUnit)
    .throws('unit must be an instance of TimeUnit');
}