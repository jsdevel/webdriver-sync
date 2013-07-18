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
var ExpectedConditions;
var Cookie;

function beforeSuite(){
   assert=require('assert');
   path = require('path');
   projectPath = path.resolve(__dirname, "..", "..", "..");
   modulePath = path.resolve(projectPath, 'src', 'facade');
   webdriverModule=require(modulePath);
   By=webdriverModule.By;
   ExpectedConditions=webdriverModule.ExpectedConditions;
   Cookie=webdriverModule.Cookie;
   if(!driver){
      driver = new webdriverModule.ChromeDriver;
   }
   driver.get("http://www.google.com");
}
function afterSuite(){
   driver.quit();
}
///Test
function we_should_be_able_to_show_the_google_title(){
   assert.equal(driver.getTitle(), "Google");//prints "Google"
}
///Test
function we_should_be_able_to_type_some_keys_and_submit_a_form(){
   element = driver.findElement(By.name("q"));
   element.sendKeys("Cheese!");
   element.submit();
   element = driver.findElement(By.name("q"));
   assert.equal(element.getAttribute('value'), "Cheese!");
}
///Test
function we_should_be_able_to_get_a_list_of_divs(){
   elements = driver.findElements(By.tagName('html'));
   assert(elements.length > 0, "There were no divs on the page.");
}
///Test
function we_should_be_able_to_get_the_current_url(){
   assert(driver.getCurrentUrl(), "the current url was empty.");
}
///Test
function we_should_be_able_to_get_the_page_source(){
   driver.getPageSource();
}
///Test
function we_should_be_able_to_start_HtmlUnit(){
   var htmlDriver = new webdriverModule.HtmlUnitDriver();
   htmlDriver.quit();
}
///Test
function we_should_be_able_to_start_Firefox(){
   var firefoxDriver = new webdriverModule.FirefoxDriver();
   firefoxDriver.quit();
}
///Test
function we_should_be_able_to_work_with_driver_options(){
   assert(driver.manage());
}
///Test
function we_should_be_able_to_work_with_cookies(){
   var cookie;
   var options=driver.manage();
   var date;
   assert['throws'](function(){
      new Cookie("asdf");
   }, "createing a cookie without a name should fail.");
   assert.equal(options.getCookieNamed("jack"), null);

   //test 2 arguments
   cookie=new Cookie("_2", "2");
   options.addCookie(cookie);
   assert.equal(options.getCookieNamed("_2").getValue(), "2");

   //test 3 arguments and path
   cookie=new Cookie("_3", "3", "/news");
   options.addCookie(cookie);
   driver.get("http://www.google.com/news/");
   assert.equal(options.getCookieNamed("_3").getValue(), "3");
   assert.equal(options.getCookieNamed("_3").getPath(), "/news");

   //test 4 arguments
   cookie=new Cookie("_4", "4", "/", 300);
   options.addCookie(cookie);
   driver.navigate().refresh();
   assert.equal(options.getCookieNamed("_4").getExpiry().getTime(), cookie.getExpiry().getTime());

   //test 4 arguments
   cookie=new Cookie("_neg4", "neg4", "/", null);
   options.addCookie(cookie);

   //test 5 arguments
   cookie=new Cookie("_5", "5", "maps.google.com", "/", 3600);
   assert['throws'](function(){
      options.addCookie(cookie);
   }, "allowed to add a cookie for a different domain.");

   //test 5 arguments
   cookie=new Cookie("_6", "6", ".google.com", "/", 3600, true);
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
//Test
function we_should_be_able_to_work_with_expected_conditions(){
   var by=By.cssSelector('body');
   var element = driver.findElement(by);
   ExpectedConditions.alertIsPresent();
   ExpectedConditions.elementSelectionStateToBe(by, false);
   ExpectedConditions.elementSelectionStateToBe(element, false);
   ExpectedConditions.elementToBeClickable(by);
   ExpectedConditions.elementToBeSelected(by);
   ExpectedConditions.elementToBeSelected(element)
   ExpectedConditions.frameToBeAvailableAndSwitchToIt("asdf");
   ExpectedConditions.invisibilityOfElementLocated(by);
   ExpectedConditions.invisibilityOfElementWithText(by, "adsf");
   ExpectedConditions.not(ExpectedConditions.alertIsPresent());
   ExpectedConditions.presenceOfAllElementsLocatedBy(by);
   ExpectedConditions.presenceOfElementLocated(by);
   ExpectedConditions.refreshed(ExpectedConditions.alertIsPresent());
   ExpectedConditions.stalenessOf(element);
   ExpectedConditions.textToBePresentInElement(by, "ads");
   ExpectedConditions.textToBePresentInElementValue(by, "adsf");
   ExpectedConditions.titleContains("asdf");
   ExpectedConditions.titleIs("sdf");
   ExpectedConditions.visibilityOf(element);
   ExpectedConditions.visibilityOfElementLocated(by);
}
