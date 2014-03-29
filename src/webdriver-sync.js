'use strict';

var java = require('java');
var imports = require('./imports');
var Long = imports.Long;

if(!process.env.WEBDRIVER_SYNC_ENABLE_SELENIUM_STDOUT){
  imports.helpers.ConsoleControl.stopOutSync();
}

if(!process.env.WEBDRIVER_SYNC_ENABLE_SELENIUM_STDERR){
  imports.helpers.ConsoleControl.stopErrSync();
}

module.exports = {

  //BUILT IN
  get Long() {
    return imports.Long;
  },

  //===BEGIN WRAPPERS==//
  //CLASSES
  get By() {
    return new (require('./classes/By'))();
  },
  get ChromeDriver() {
    return require('./classes/ChromeDriver');
  },
  get ChromeDriverService() {
    return require('./classes/ChromeDriverService');
  },
  get ChromeOptions() {
    return require('./classes/ChromeOptions');
  },
  get Command() {
    return require('./classes/Command');
  },
  get Cookie() {
    return require('./classes/Cookie');
  },
  get DesiredCapabilities() {
    return require('./classes/DesiredCapabilities');
  },
  get Dimension() {
    return require('./classes/Dimension');
  },
  get DriverService() {
    return require('./classes/DriverService');
  },
  get ErrorHandler() {
    return require('./classes/ErrorHandler');
  },
  get ExpectedConditions() {
    return require('./classes/ExpectedConditions');
  },
  get File() {
    return require('./classes/File');
  },
  get FirefoxDriver() {
    return require('./classes/FirefoxDriver');
  },
  get FirefoxProfile() {
    return require('./classes/FirefoxProfile');
  },
  get PhantomJSDriver() {
    return require('./classes/PhantomJSDriver');
  },
  get HtmlUnitDriver() {
    return require('./classes/HtmlUnitDriver');
  },
  get InternetExplorerDriver() {
    return require('./classes/InternetExplorerDriver');
  },
  get Level() {
    return require('./classes/Level');
  },
  get LogEntry() {
    return require('./classes/LogEntry');
  },
  get LocalFileDetector() {
    return require('./classes/LocalFileDetector');
  },
  get Point() {
    return require('./classes/Point');
  },
  get RemoteStatus() {
    return require('./classes/RemoteStatus');
  },
  get RemoteWebDriver() {
    return require('./classes/RemoteWebDriver');
  },
  get Response() {
    return require('./classes/Response');
  },
  get SafariDriver() {
    return require('./classes/SafariDriver');
  },
  get SessionId() {
    return require('./classes/SessionId');
  },
  get UselessFileDetector() {
    return require('./classes/UselessFileDetector');
  },
  get UserAndPassword() {
    return require('./classes/UserAndPassword');
  },
  get WebDriverWait() {
    return require('./classes/WebDriverWait');
  },

  //ENUMS
  get Keys() {
    return require('./enums/Keys');
  },
  get Platform() {
    return require('./enums/Platform');
  },
  get TimeUnit() {
    return require('./enums/TimeUnit');
  },

  //INTERFACES
  get OutputType() {
    return require('./interfaces/OutputType');
  },
  get WebElement() {
    return require('./interfaces/WebElement');
  },
  //===END WRAPPERS==//

  //UTILITY METHODS
  importTo:function(target){
    console.warn('#importTo is deprecated!  Use #exportTo instead.');
    return this.exportTo(target);
  },

  /**
   * Use this method to expose all Selenium Classes to the given target.
   * Useful if you wish to avoid wd.blablabla.
   *
   * @param {Object} target
   */
  exportTo: function(target) {
    var prop;
    for (prop in this) {
      if(this.hasOwnProperty(prop)){
        if (prop[0].toLowerCase() !== prop[0]){//upercase so export
          target[prop] = this[prop];
        }
      }
    }
  },
  /**
   * @param {number} amount in mills to sleep for.
   */
  sleep: function(amount) {
    java.callStaticMethodSync(
      'java.lang.Thread',
      'sleep',
      new Long(amount)
      );
  }
};
