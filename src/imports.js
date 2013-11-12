/*!
 * Copyright 2013 Joseph Spencer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var java = require("java");
var path = require("path");
var binaryDir = path.resolve(
   process.env.USERPROFILE || process.env.HOME,
   '.webdriver-sync'
);
var seleniumJarPath=path.resolve(
   binaryDir, 'selenium-server-standalone.jar'
);
var helperJarPath=path.resolve(
   __dirname, "java", "webdriversynchelpers", "dist", "webdriversynchelpers.jar"
);
var pathToChromeDriver=path.resolve(binaryDir, 'chromedriver');
java.classpath.push(seleniumJarPath);
java.classpath.push(helperJarPath);
java.callStaticMethodSync(
   "java.lang.System",
   "setProperty",
   "webdriver.chrome.driver",
   pathToChromeDriver
);

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

module.exports={
   helpers:{
      get Map(){
         return java.import('me.joespencer.webdriversynchelpers.Map');
      }
   },
   get By(){
      return java.import('org.openqa.selenium.By');
   },
   get ChromeDriver(){
      return java.import('org.openqa.selenium.chrome.ChromeDriver');
   },
   get ChromeDriverService(){
      return java.import('org.openqa.selenium.chrome.ChromeDriverService');
   },
   get ChromeOptions(){
      return java.import('org.openqa.selenium.chrome.ChromeOptions');
   },
   get Command(){
      return java.import('org.openqa.selenium.remote.Command');
   },
   get Cookie(){
      return java.import('org.openqa.selenium.Cookie');
   },
   get Date(){
      return java.import('java.util.Date');
   },
   get DesiredCapabilities(){
      return java.import('org.openqa.selenium.remote.DesiredCapabilities');
   },
   get Dimension(){
      return java.import('org.openqa.selenium.Dimension');
   },
   get DriverService(){
      return java.import('org.openqa.selenium.remote.service.DriverService');
   },
   get ErrorHandler(){
      return java.import('org.openqa.selenium.remote.ErrorHandler');
   },
   get ExpectedConditions(){
      return java.import('org.openqa.selenium.support.ui.ExpectedConditions');
   },
   get File(){
      return java.import('java.io.File');
   },
   get FirefoxDriver(){
      return java.import('org.openqa.selenium.firefox.FirefoxDriver');
   },
   get HtmlUnitDriver(){
      return java.import('org.openqa.selenium.htmlunit.HtmlUnitDriver');
   },
   get InternetExplorerDriver(){
      return java.import('org.openqa.selenium.ie.InternetExplorerDriver');
   },
   get Level(){
      return java.import('java.util.logging.Level');
   },
   get LocalFileDetector(){
      return java.import('org.openqa.selenium.remote.LocalFileDetector');
   },
   get Long(){
      return java.import('java.lang.Long');
   },
   get OutputType(){
      return java.import('org.openqa.selenium.OutputType');
   },
   get Platform(){
      return java.import('org.openqa.selenium.Platform');
   },
   get Point(){
      return java.import('org.openqa.selenium.Point');
   },
   get RemoteStatus(){
      return java.import('org.openqa.selenium.remote.RemoteStatus');
   },
   get RemoteWebDriver(){
      return java.import('org.openqa.selenium.remote.RemoteWebDriver');
   },
   get Response(){
      return java.import('org.openqa.selenium.remote.Response');
   },
   get SafariDriver(){
      return java.import('org.openqa.selenium.safari.SafariDriver');
   },
   get SessionId(){
      return java.import('org.openqa.selenium.remote.SessionId');
   },
   get TimeUnit(){
      return java.import('java.util.concurrent.TimeUnit');
   },
   get URL(){
      return java.import('java.net.URL');
   },
   get UselessFileDetector(){
      return java.import('org.openqa.selenium.remote.UselessFileDetector');
   },
   get UserAndPassword(){
      return java.import('org.openqa.selenium.security.UserAndPassword');
   },
   get WebDriverWait(){
      return java.import('org.openqa.selenium.support.ui.WebDriverWait');
   }
};