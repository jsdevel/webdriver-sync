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
var java    = require('java');
var imports = require('./imports');
var Long    = imports.Long;

module.exports={
   get By(){
      return new (require('./classes/By'));
   },
   get ChromeDriver(){
      return require('./classes/ChromeDriver');
   },
   get ChromeDriverService(){
      return require('./classes/ChromeDriverService');
   },
   get ChromeOptions(){
      return require('./classes/ChromeOptions');
   },
   get Command(){
      return require('./classes/Command');
   },
   get Cookie(){
      return require('./classes/Cookie');
   },
   get DesiredCapabilities(){
      return require('./classes/DesiredCapabilities');
   },
   get Dimension(){
      return require('./classes/Dimension');
   },
   get DriverService(){
      return require('./classes/DriverService');
   },
   get ErrorHandler(){
      return require('./classes/ErrorHandler');
   },
   get ExpectedConditions(){
      return require('./classes/ExpectedConditions');
   },
   get File(){
      return require('./classes/File');
   },
   //FirefoxDriver:require('./classes/FirefoxDriver'),
   //HtmlUnitDriver:require('./classes/HtmlUnitDriver'),
   get Level(){
      return require('./classes/Level');
   },
   get LocalFileDetector(){
      return require('./classes/LocalFileDetector');
   },
   get Platform(){
      return require('./enums/Platform');
   },
   get Point(){
      return require('./classes/Point');
   },
   get RemoteStatus(){
      return require('./classes/RemoteStatus');
   },
   get RemoteWebDriver(){
      return require('./classes/RemoteWebDriver');
   },
   get Response(){
      return require('./classes/Response');
   },
   get SessionId(){
      return require('./classes/SessionId');
   },
   get TimeUnit(){
      return require('./enums/TimeUnit');
   },
   get UselessFileDetector(){
      return require('./classes/UselessFileDetector');
   },
   get UserAndPassword(){
      return require('./classes/UserAndPassword');
   },
   //WebDriverWait:require('./classes/WebDriverWait'),
   importTo:function(target){
      for(prop in this){
         if(prop === "importTo")continue;
         target[prop] = this[prop];
      }
   },

   /**
    * @param {number} amount in mills to sleep for.
    */
   sleep:function(amount){
      java.callStaticMethodSync(
         "java.lang.Thread",
         "sleep",
         new Long(amount)
      );
   }
};