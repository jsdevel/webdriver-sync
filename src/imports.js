var java = require("java");
var path = require("path");
var classPaths = require('./classPaths');
var findsChromeDriver = require('./lib/finds-chrome-driver');
var findsSeleniumJar = require('./lib/finds-selenium-jar');
var staticDependencyPaths = require('./static-dependency-paths');

var seleniumJar = findsSeleniumJar.find()
if(!seleniumJar) {
  throw new Error(findsSeleniumJar.errorMessage)
}
java.classpath.push(seleniumJar);
java.classpath.push(staticDependencyPaths.helperJar);

chromeDriverPath = findsChromeDriver.find()
if(chromeDriverPath) {
  java.callStaticMethodSync(
    "java.lang.System",
    "setProperty",
    "webdriver.chrome.driver",
    chromeDriverPath
  );
}

/*
 * Class marked protected or otherwise implicitly private
 * RemoteWebDriver.RemoteTargetLocator
 * RemoteWebDriver.RemoteWebDriverOptions
 * RemoteWebDriver.RemoteWebDriverOptions.RemoteInputMethodManager
 * RemoteWebDriver.RemoteWebDriverOptions.RemoteTimeouts
 * RemoteWebDriver.RemoteWebDriverOptions.RemoteWindow
 */

/* TODO
 * AndroidDriver
 * AndroidWebDriver
 * AndroidWebElement
 * DesiredCapabilities
 * DriverCommandExecutor
 * EventFiringKeyboard
 * EventFiringMouse
 * EventFiringWebDriver
 * ExtensionConnection
 * HtmlUnitDriver
 * HtmlUnitDriver.HtmlUnitWindow
 * HtmlUnitKeyboard
 * HtmlUnitMouse
 * HtmlUnitWebElement
 * HttpCommandExecutor
 * InternetExplorerDriver
 * IPhoneDriver
 * IPhoneSimulatorCommandExecutor
 * IPhoneSimulatorDriver
 * MarionetteConnection
 * NewProfileExtensionConnection
 * RemoteKeyboard
 * RemoteWebElement
 */

module.exports = {
  helpers: {
    get Map() {
      return java.import('me.joespencer.webdriversynchelpers.Map');
    }
  },
  get By() {
    return java.import(classPaths.By);
  },
  get ChromeDriver() {
    return java.import(classPaths.ChromeDriver);
  },
  get ChromeDriverService() {
    return java.import(classPaths.ChromeDriverService);
  },
  get ChromeDriverServiceBuilder() {
    return java.import(classPaths.ChromeDriverServiceBuilder);
  },
  get ChromeOptions() {
    return java.import(classPaths.ChromeOptions);
  },
  get Command() {
    return java.import(classPaths.Command);
  },
  get Cookie() {
    return java.import(classPaths.Cookie);
  },
  get Date() {
    return java.import(classPaths.Date);
  },
  get DesiredCapabilities() {
    return java.import(classPaths.DesiredCapabilities);
  },
  get Dimension() {
    return java.import(classPaths.Dimension);
  },
  get DriverService() {
    return java.import(classPaths.DriverService);
  },
  get ErrorHandler() {
    return java.import(classPaths.ErrorHandler);
  },
  get ExpectedConditions() {
    return java.import(classPaths.ExpectedConditions);
  },
  get File() {
    return java.import(classPaths.File);
  },
  get FirefoxDriver() {
    return java.import(classPaths.FirefoxDriver);
  },
  get PhantomJSDriver() {
    return java.import(classPaths.PhantomJSDriver);
  },
  get HtmlUnitDriver() {
    return java.import(classPaths.HtmlUnitDriver);
  },
  get InternetExplorerDriver() {
    return java.import(classPaths.InternetExplorerDriver);
  },
  get Level() {
    return java.import(classPaths.Level);
  },
  get LocalFileDetector() {
    return java.import(classPaths.LocalFileDetector);
  },
  get Long() {
    return java.import(classPaths.Long);
  },
  get OutputType() {
    return java.import(classPaths.OutputType);
  },
  get Platform() {
    return java.import(classPaths.Platform);
  },
  get Point() {
    return java.import(classPaths.Point);
  },
  get RemoteStatus() {
    return java.import(classPaths.RemoteStatus);
  },
  get RemoteWebDriver() {
    return java.import(classPaths.RemoteWebDriver);
  },
  get Response() {
    return java.import(classPaths.Response);
  },
  get SafariDriver() {
    return java.import(classPaths.SafariDriver);
  },
  get SessionId() {
    return java.import(classPaths.SessionId);
  },
  get TimeUnit() {
    return java.import(classPaths.TimeUnit);
  },
  get URL() {
    return java.import(classPaths.URL);
  },
  get UselessFileDetector() {
    return java.import(classPaths.UselessFileDetector);
  },
  get UserAndPassword() {
    return java.import(classPaths.UserAndPassword);
  },
  get WebDriverWait() {
    return java.import(classPaths.WebDriverWait);
  }
};
