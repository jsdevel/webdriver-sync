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
var imports           = require('./imports');
var utils             = require('./utils');

module.exports={
   By:imports.By,
   ChromeDriver:imports.ChromeDriver,
   ChromeDriverService:imports.ChromeDriverService,
   ChromeOptions:imports.ChromeOptions,
   Command:imports.Command,
   Cookie:imports.Cookie,
   Date:imports.Date,
   Dimension:imports.Dimension,
   DriverService:imports.DriverService,
   ErrorHandler:imports.ErrorHandler,
   ExpectedConditions:imports.ExpectedConditions,
   File:imports.File,
   FirefoxDriver:imports.FirefoxDriver,
   HtmlUnitDriver:imports.HtmlUnitDriver,
   Level:imports.Level,
   LocalFileDetector:imports.LocalFileDetector,
   Long:imports.Long,
   OutputType:imports.OutputType,
   Platform:imports.Platform,
   Point:imports.Point,
   RemoteStatus:imports.RemoteStatus,
   Response:imports.Response,
   SessionId:imports.SessionId,
   TimeUnit:imports.TimeUnit,
   URL:imports.URL,
   UselessFileDetector:imports.UselessFileDetector,
   UserAndPassword:imports.UserAndPassword,
   WebDriverWait:imports.WebDriverWait,
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