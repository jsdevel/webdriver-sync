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

function beforeSuite(){
   assert=require('assert');
   path = require('path');
   projectPath = path.resolve(__dirname, "..", "..", "..");
   modulePath = path.resolve(projectPath, 'src', 'facade');
   webdriverModule=require(modulePath);
   By=webdriverModule.By;
   if(!driver){
      driver = new webdriverModule.ChromeDriver;
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