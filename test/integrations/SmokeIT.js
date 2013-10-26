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
   ExpectedConditions = webdriverModule.ExpectedConditions;
   TimeUnit = webdriverModule.TimeUnit;
   driver = require(path.resolve('test', 'lib', 'driver')).driver;
   options = driver.manage();
   driver.get("http://www.google.com");
}

function afterSuite(){
   driver.quit();
}

function before(){
   options.deleteAllCookies();
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
