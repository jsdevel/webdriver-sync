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
var ExpectdContidions;
var TimeUnit;



function beforeSuite(){
   assert=require('assert');
   path = require('path');
   projectPath = path.resolve(__dirname, "..", "..", "..");
   modulePath = path.resolve(projectPath, 'src', 'webdriver-sync');
   webdriverModule=require(modulePath);
   //webdriverModule.importTo(this);
   By = webdriverModule.By;
   ChromeDriver = webdriverModule.ChromeDriver;
   Cookie = webdriverModule.Cookie;
   ExpectedConditions = webdriverModule.ExpectedConditions;
   TimeUnit = webdriverModule.TimeUnit;
   if(!driver){
      driver = new ChromeDriver;
   }
   driver.get("http://www.google.com");
}
function afterSuite(){
   driver.quit();
}
//Test
function we_should_be_able_to_show_the_google_title(){
   assert.equal(driver.getTitle(), "Google");//prints "Google"
}
//Test
function we_should_be_able_to_type_some_keys_and_submit_a_form(){
   element = driver.findElement(By.name("q"));
   element.sendKeys("Cheese!");
   element.submit();
   element = driver.findElement(By.name("q"));
   assert.equal(element.getAttribute('value'), "Cheese!");
}
//Test
function we_should_be_able_to_get_a_list_of_divs(){
   elements = driver.findElements(By.tagName('html'));
   assert(elements.length > 0, "There were no divs on the page.");
}
//Test
function we_should_be_able_to_get_the_current_url(){
   assert(driver.getCurrentUrl(), "the current url was empty.");
}
//Test
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
//Test
function we_should_be_able_to_work_with_driver_options(){
   assert(driver.manage());
}
//Test
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
   driver.get("http://www.google.com/news/");
   cookie=new Cookie("_3", "3", "/news");
   options.addCookie(cookie);
   assert.equal(options.getCookieNamed("_3").getValue(), "3");
   assert.equal(options.getCookieNamed("_3").getPath(), "/news");

   //test 4 arguments
   cookie=new Cookie("_4", "4", "/", new Date(Date.now()+3000));
   options.addCookie(cookie);
   driver.navigate().refresh();
   assert.equal(options.getCookieNamed("_4").getExpiry().getTime(), cookie.getExpiry().getTime(), "cookie added via options");

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
///Test
function we_should_be_able_to_work_with_waits(){
   (new WebDriverWait(driver, 300)).
   until(
      ExpectedConditions.
         visibilityOf(
            driver.findElement(By.tagName('body'))
         )
   );
   (new WebDriverWait(driver, 300, 10)).
   until(
      ExpectedConditions.
         visibilityOf(
            driver.findElement(By.tagName('body'))
         )
   );
   (new WebDriverWait(driver, 300)).
   withMessage("hello there!");
   assert['throws'](function(){
      (new WebDriverWait(driver, 300)).
      until(
         ExpectedConditions.
            visibilityOf(
               driver.findElement(By.name('bbbbody'))
            )
      );
   }, "waiting for a non existant element should throw an exception.");
}
//Test
function we_should_be_able_to_work_with_TimeUnit(){
   assert(TimeUnit.DAYS, "days");
   assert(TimeUnit.HOURS, "hours");
   assert(TimeUnit.MICROSECONDS, "microseconds");
   assert(TimeUnit.MILLISECONDS, "milliseconds");
   assert(TimeUnit.MINUTES, "minutes");
   assert(TimeUnit.NANOSECONDS, "nanoseconds");
   assert(TimeUnit.SECONDS, "seconds");
}

//Test
function we_should_be_able_to_sleep(){
   var start=Date.now();
   var end;
   var secondsToWait=10 * 1000;
   webdriverModule.sleep(secondsToWait);
   end=Date.now();
   assert(end-start > secondsToWait, "sleep didn't work.");
}




//make sure this test is last as it affects the time the driver waits for
//elements.
///Test
function we_should_be_able_to_work_with_timeouts(){
   var timeouts=driver.manage().timeouts();
   var start;
   var end;
   timeouts.implicitlyWait(5, TimeUnit.SECONDS);
   start=Date.now();
   try{
      driver.findElement(By.name('bbbbody'));
   }catch(e){
      end=Date.now();
   }
   assert(end-start>=5000);
   try{
      //it appears from the javadocs that the arg given should be a relatively
      //low amount
      timeouts.pageLoadTimeout(5, TimeUnit.MILLISECONDS);
   }catch(e){
      console.error("pageLoadTimeout is failing.");
   }
   try{
      //it appears from the javadocs that the arg given should be a relatively
      //low amount
      timeouts.setScriptTimeout(5, TimeUnit.MILLISECONDS);
   }catch(e){
      console.error("setScriptTimeout is failing.");
   }
}
