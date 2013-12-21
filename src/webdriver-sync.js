var java = require('java');
var imports = require('./imports');
var Long = imports.Long;

module.exports = {

  //BUILT IN
  get Long() {
    return imports.Long;
  },

  //===BEGIN WRAPPERS==//
  //CLASSES
  get By() {
    return new (require('./classes/By'));
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

  //ENUMS
  get Platform() {
    return require('./enums/Platform');
  },
  get TimeUnit() {
    return require('./enums/TimeUnit');
  },

  //INTERFACES
  get WebElement() {
    return require('./interfaces/WebElement');
  },
  //===END WRAPPERS==//

  //UTILITY METHODS
  importTo: function(target) {
    for (prop in this) {
      if (prop === 'importTo')
        continue;
      target[prop] = this[prop];
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
