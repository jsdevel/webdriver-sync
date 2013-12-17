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
var java       = require("java");
var path       = require("path");
var classPaths = require('./classPaths');
var binaryDir  = path.resolve(
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
      return java.import(classPaths.By);
   },
   get ChromeDriver(){
      return java.import(classPaths.ChromeDriver);
   },
   get ChromeDriverService(){
      return java.import(classPaths.ChromeDriverService);
   },
   get ChromeOptions(){
      return java.import(classPaths.ChromeOptions);
   },
   get Command(){
      return java.import(classPaths.Command);
   },
   get Cookie(){
      return java.import(classPaths.Cookie);
   },
   get Date(){
      return java.import(classPaths.Date);
   },
   get DesiredCapabilities(){
      return java.import(classPaths.DesiredCapabilities);
   },
   get Dimension(){
      return java.import(classPaths.Dimension);
   },
   get DriverService(){
      return java.import(classPaths.DriverService);
   },
   get ErrorHandler(){
      return java.import(classPaths.ErrorHandler);
   },
   get ExpectedConditions(){
      return java.import(classPaths.ExpectedConditions);
   },
   get File(){
      return java.import(classPaths.File);
   },
   get FirefoxDriver(){
      return java.import(classPaths.FirefoxDriver);
   },
   get HtmlUnitDriver(){
      return java.import(classPaths.HtmlUnitDriver);
   },
   get InternetExplorerDriver(){
      return java.import(classPaths.InternetExplorerDriver);
   },
   get Level(){
      return java.import(classPaths.Level);
   },
   get LocalFileDetector(){
      return java.import(classPaths.LocalFileDetector);
   },
   get Long(){
      return java.import(classPaths.Long);
   },
   get OutputType(){
      return java.import(classPaths.OutputType);
   },
   get Platform(){
      return java.import(classPaths.Platform);
   },
   get Point(){
      return java.import(classPaths.Point);
   },
   get RemoteStatus(){
      return java.import(classPaths.RemoteStatus);
   },
   get RemoteWebDriver(){
      return java.import(classPaths.RemoteWebDriver);
   },
   get Response(){
      return java.import(classPaths.Response);
   },
   get SafariDriver(){
      return java.import(classPaths.SafariDriver);
   },
   get SessionId(){
      return java.import(classPaths.SessionId);
   },
   get TimeUnit(){
      return java.import(classPaths.TimeUnit);
   },
   get URL(){
      return java.import(classPaths.URL);
   },
   get UselessFileDetector(){
      return java.import(classPaths.UselessFileDetector);
   },
   get UserAndPassword(){
      return java.import(classPaths.UserAndPassword);
   },
   get WebDriverWait(){
      return java.import(classPaths.WebDriverWait);
   }
};