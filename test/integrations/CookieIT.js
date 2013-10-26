/*!
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var assert;
var path;
var webdriverModule;
var driver;
var modulePath;
var element;
var By;
var ChromeDriver;
var Cookie;
var options;

function beforeSuite(){
   assert=require('assert');
   path = require('path');
   modulePath = path.resolve('src', 'webdriver-sync');
   webdriverModule=require(modulePath);
   //webdriverModule.importTo(this);
   By = webdriverModule.By;
   ChromeDriver = webdriverModule.ChromeDriver;
   Cookie = webdriverModule.Cookie;
   if(!driver){
      driver = new ChromeDriver;
      options = driver.manage();
   }
   driver.get("http://www.google.com");
}

function afterSuite(){
   driver.quit();
}

function before(){
   options.deleteAllCookies();
}

//Test
function creating_a_cookie_without_a_name_should_fail(){
   assert['throws'](function(){
      new Cookie();
   });
}

//Test
function creating_a_cookie_without_a_value_should_fail(){
   assert['throws'](function(){
      new Cookie("asdf");
   });
}

//Test
function cookie_values_with_2_arguments(){
   var cookie = new Cookie("asdf", "dan");
   assert.equal(cookie.getName(), "asdf");
   assert.equal(cookie.getValue(), "dan");
   assert.equal(cookie.getPath(), "/");
   assert.equal(cookie.getDomain(), null);
   assert.equal(cookie.getExpiry(), null);
   assert.equal(cookie.isSecure(), false);
}

//Test
function cookie_values_with_3_arguments(){
   var cookie = new Cookie("asdf", "dan", "/asdf");
   assert.equal(cookie.getName(), "asdf");
   assert.equal(cookie.getValue(), "dan");
   assert.equal(cookie.getPath(), "/asdf");
   assert.equal(cookie.getDomain(), null);
   assert.equal(cookie.getExpiry(), null);
   assert.equal(cookie.isSecure(), false);
}

//Test
function cookie_values_with_4_arguments(){
   var date = new Date(Date.now() + 10000);
   var cookie = new Cookie("asdf", "dan", "/asdf", date);
   assert.equal(cookie.getName(), "asdf");
   assert.equal(cookie.getValue(), "dan");
   assert.equal(cookie.getPath(), "/asdf");
   assert.equal(cookie.getDomain(), null);
   assert.equal(cookie.getExpiry().getTime(), date.getTime() - (date.getTime()%1000));
   assert.equal(cookie.isSecure(), false);
}

//Test
function cookie_values_with_5_arguments(){
   var date = new Date(Date.now() + 10000);
   var cookie = new Cookie("asdf", "dan", "asdf.com", "/asdf", date);
   assert.equal(cookie.getName(), "asdf");
   assert.equal(cookie.getValue(), "dan");
   assert.equal(cookie.getPath(), "/asdf");
   assert.equal(cookie.getDomain(), "asdf.com");
   assert.equal(cookie.getExpiry().getTime(), date.getTime() - (date.getTime()%1000));
   assert.equal(cookie.isSecure(), false);
}

//Test
function cookie_values_with_6_arguments(){
   var date = new Date(Date.now() + 10000);
   var cookie = new Cookie("asdf", "dan", "asdf.com", "/asdf", date, true);
   assert.equal(cookie.getName(), "asdf");
   assert.equal(cookie.getValue(), "dan");
   assert.equal(cookie.getPath(), "/asdf");
   assert.equal(cookie.getDomain(), "asdf.com");
   assert.equal(cookie.getExpiry().getTime(), date.getTime() - (date.getTime()%1000));
   assert.equal(cookie.isSecure(), true);
}

//Test
function we_should_be_able_to_work_with_cookies(){
   var cookie;
   var options=driver.manage();
   assert.equal(options.getCookieNamed("jack"), null);

   //test 2 arguments
   cookie=new Cookie("_2", "2");
   options.addCookie(cookie);
   assert.equal(options.getCookieNamed("_2").getValue(), "2");

   //test 3 arguments and path
   driver.get("http://www.google.com/news/");
   cookie=new Cookie("_3", "3", "/news");
   options.addCookie(cookie);
   assert.equal(options.getCookieNamed("_3").getValue(), "3");
   assert.equal(options.getCookieNamed("_3").getPath(), "/news");

   //test 4 arguments
   cookie=new Cookie("_4", "4", "/", new Date(Date.now()+30000));
   options.addCookie(cookie);
   driver.navigate().refresh();
   assert.equal(
      options.getCookieNamed("_4").getExpiry().getTime(),
      cookie.getExpiry().getTime(),
      "cookie added via options"
   );

   //test 4 arguments
   cookie=new Cookie("_neg4", "neg4", "/", null);
   options.addCookie(cookie);

   //test 5 arguments
   cookie=new Cookie("_5", "5", "maps.google.com", "/", new Date(Date.now()+(3600*1000)));
   assert['throws'](function(){
      options.addCookie(cookie);
   }, "allowed to add a cookie for a different domain.");

   //test 5 arguments
   cookie=new Cookie("_6", "6", ".google.com", "/", new Date(Date.now()+(3600*1000)), true);
   options.addCookie(cookie);
   driver.navigate().refresh();
   assert(!options.getCookieNamed("_6"),"secure cookies aren't added appropriately");
   driver.findElement(By.cssSelector(".gbit")).click();
   assert(options.getCookieNamed("_6"),"secure cookies aren't seen on https");

   options.deleteCookie(cookie);
   options.deleteCookieNamed("_5");
   options.deleteAllCookies();
   assert(!options.getCookies().length, "deleting cookies failed.");
}