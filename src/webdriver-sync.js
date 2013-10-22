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
var java = require('java');

module.exports={
   By:new require('./classes/By'),
   ChromeDriver:require('./classes/ChromeDriver'),
   ChromeDriverService:require('./classes/ChromeDriverService'),
   ChromeOptions:require('./classes/ChromeOptions'),
   Command:require('./classes/Command'),
   Cookie:require('./classes/Cookie'),
   Dimension:require('./classes/Dimension'),
   DriverService:require('./classes/DriverService'),
   ErrorHandler:require('./classes/ErrorHandler'),
   ExpectedConditions:require('./classes/ExpectedConditions'),
   File:require('./classes/File'),
   //FirefoxDriver:require('./classes/FirefoxDriver'),
   //HtmlUnitDriver:require('./classes/HtmlUnitDriver'),
   Level:require('./classes/Level'),
   LocalFileDetector:require('./classes/LocalFileDetector'),
   Platform:require('./enums/Platform'),
   Point:require('./classes/Point'),
   RemoteStatus:require('./classes/RemoteStatus'),
   Response:require('./classes/Response'),
   SessionId:require('./classes/SessionId'),
   TimeUnit:require('./enums/TimeUnit'),
   UselessFileDetector:require('./classes/UselessFileDetector'),
   UserAndPassword:require('./classes/UserAndPassword'),
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