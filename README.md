webdriver-sync
==============

Porting WebDriver to node to provide a completely synchronous selenium
experience in node.js!

Why Sync?
==============
Prior to node, most of my testing was done in Java and JUnit.  I found the sync
API to be much easier to follow and maintain, and I wasn't happy with all the
async ceremony out there with the node API[s] (similar to the following):

``````
....
browser.get("http://admc.io/wd/test-pages/guinea-pig.html", function() {
   browser.title(function(err, title) {
   assert.ok(~title.indexOf('I am a page title - Sauce Labs'), 'Wrong title!');
   browser.elementById('i am a link', function(err, el) {
      browser.clickElement(el, function() {
         browser.eval("window.location.href", function(err, href) {
         assert.ok(~href.indexOf('guinea-pig2'));
         browser.quit();
         });
      });
   });
   });
});
....
``````

I much prefer this:

``````
driver.get("http://admc.io/wd/test-pages/guinea-pig.html");
var title=driver.getTitle();
assert(title.indexOf('I am a page title - Sauce Labs') > -1);
var link=findElement(By.id('i am a link'));
link.click();
assert(driver.getCurrentUrl().indexOf('guinea-pig2') > -1);
driver.quit();
``````

And that's exactly what `webdriver-sync` aims to achieve.  It should look just
like the java API provided by the Selenium organization.

If you've used the Selenium Java API, or have access to it, then you pretty
much know how to use this module.

Example
==============
Here's an example integration test that's in the module.  You can run this by
`cd node_modules/webdriver-sync;npm test`.  Note that require has the full
path to the module.  This is because I use this during development of the
module.  `require('webdriver-sync')` should do the trick after installing.

``````
var assert;
var path;
var webdriverModule;
var driver;
var modulePath;
var element;
var By;

function before(){
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
function after(){

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
   elements = driver.findElements(By.tagName('div'));
   console.log(elements.length);
}
``````

Requirements
=============
`npm` `node` `java`

Installing
==============
`npm install webdriver-sync`

You'll see some error messages about chromedriver and selenium-server-standalone
not being found.  Grap the binaries and place them in the specified location,
then run install again.

The module is still in beta, so please fork, issue pull requests, and or submit
issues as needed!

LICENSE
=============
webdriver-sync is licensed under the Apache 2.0 license.

Copyright 2013 Joseph Spencer

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

CREDIT when it is due!
============
Special thanks to the developers of `node-java`!!!