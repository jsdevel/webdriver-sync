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
 * SafariDriver
 */

module.exports={
   helpers:{
      Map:java.import('me.joespencer.webdriversynchelpers.Map')
   },
   By:java.import('org.openqa.selenium.By'),
   ChromeDriver:java.import('org.openqa.selenium.chrome.ChromeDriver'),
   ChromeDriverService:java.import('org.openqa.selenium.chrome.ChromeDriverService'),
   ChromeOptions:java.import('org.openqa.selenium.chrome.ChromeOptions'),
   Command:java.import('org.openqa.selenium.remote.Command'),
   Cookie:java.import('org.openqa.selenium.Cookie'),
   Date:java.import('java.util.Date'),
   Dimension:java.import('org.openqa.selenium.Dimension'),
   DriverService:java.import('org.openqa.selenium.remote.service.DriverService'),
   ErrorHandler:java.import('org.openqa.selenium.remote.ErrorHandler'),
   ExpectedConditions:java.import('org.openqa.selenium.support.ui.ExpectedConditions'),
   File:java.import('java.io.File'),
   FirefoxDriver:java.import('org.openqa.selenium.firefox.FirefoxDriver'),
   HtmlUnitDriver:java.import('org.openqa.selenium.htmlunit.HtmlUnitDriver'),
   Level:java.import('java.util.logging.Level'),
   LocalFileDetector:java.import('org.openqa.selenium.remote.LocalFileDetector'),
   Long:java.import('java.lang.Long'),
   OutputType:java.import('org.openqa.selenium.OutputType'),
   Platform:java.import('org.openqa.selenium.Platform'),
   Point:java.import('org.openqa.selenium.Point'),
   RemoteStatus:java.import('org.openqa.selenium.remote.RemoteStatus'),
   Response:java.import('org.openqa.selenium.remote.Response'),
   SessionId:java.import('org.openqa.selenium.remote.SessionId'),
   TimeUnit:java.import('java.util.concurrent.TimeUnit'),
   URL:java.import('java.net.URL'),
   UselessFileDetector:java.import('org.openqa.selenium.remote.UselessFileDetector'),
   UserAndPassword:java.import('org.openqa.selenium.security.UserAndPassword'),
   WebDriverWait:java.import('org.openqa.selenium.support.ui.WebDriverWait')
};