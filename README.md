[![Build Status](https://travis-ci.org/jsdevel/webdriver-sync.png)](https://travis-ci.org/jsdevel/webdriver-sync)

# webdriver-sync

`webdriver-sync` allows you to write purely synchronous integration tests using
the Selenium API.  The module aims to be a complete wrapper around all the
classes found in the java implementation.  All other API's use asynchronous methods which
makes testing very cumbersome.

## Highlights

* Write 100% selenium in javascript!
* Run Chrome, Firefox, Safari, PhantomJS, Internet Explorer, and RemoteWebDriver (Android to come)!
* Reduce code by embracing a synchronous API!
* Reduce verbosity found in statically typed langs like java and c#
* Forget about dependency management for 3rd party binaries I.E. chromedriver and selenium-server-standalone-x.x.x.jar.  Say hello to an install process that handles all that for you.
* Connect to Sauce using the RemoteWebDriver or other drivers that extend RemoteWebDriver.

## Example
````javascript
var wd = require('wd');
var By            = wd.By;
var ChromeDriver  = wd.ChromeDriver;
var driver        = new ChromeDriver;
var title;
var link;

driver.get("http://foo.html");
title= driver.getTitle();
link = driver.findElement(By.id('i am a link'));
link.click();

assert(driver.getCurrentUrl().indexOf('foo title 2') > -1);
assert(title.indexOf('foo title') > -1);
driver.quit();
````

## Installation
`npm install webdriver-sync`

`webdriver-sync` will download needed binaries for you which makes your life
easier.  `webdriver-sync` will download these binaries to `$HOME/.webdriver-sync`.
The following list has ways of overriding this process:

* Chromdriver - Place `chromedriver` or `chromedriver.exe` (for windows) on your
path.
* Selenium jar - Set `SELENIUM_SERVER_STANDALONE_JAR` to point to the location 
where you have it on disk.  You should never do this, as the API is only tested
against specific versions selenium, but it is available.

##Documentation
As `webdriver-sync` is a wrapper around the java API, you can browse any of the
javadocs online.  You can quite literally use this module the same way you
would in java without the static typing.

Working with Maps and Lists is extremely delightful in javascript:
````javascript
  driver.executeScript("return document.querySelectorAll('div');").forEach(function(el){
    console.log(el.getText());
  });
````

##Running Headless
You can run Chrome, Firefox, Safari, and PhantomJS headless with `webdriver-sync`!
You must have `Xvfb` installed, or an equivalent.

Here's how Chromdriver can be run headless:
````shell
#Run this on a tty
Xvfb :99 > /dev/null &
````

````javascript
//Use this in your tests
var service = new ChromeDriverService.Builder()
    .usingAnyFreePort()
    .usingDriverExecutable(new File(findsChromeDriver.find()))
    .withEnvironment({"DISPLAY":":99.0"})
    .build();

var driver = new ChromeDriver(service);
//Running Headless!
````
## Why Sync?

Prior to node, most of my testing was done in Java and JUnit.  I found the sync
API to be much easier to follow and maintain, and I wasn't happy with all the
async ceremony out there with the node API[s] (similar to the following):

``````javascript
browser.get("http://foo.html", function() {
   browser.title(function(err, title) {
   assert.ok(~title.indexOf('foo title'), 'Wrong title!');
   browser.elementById('i am a link', function(err, el) {
      browser.clickElement(el, function() {
         browser.eval("window.location.href", function(err, href) {
         assert.ok(~href.indexOf('foo title 2'));
         browser.quit();
         });
      });
   });
   });
});
``````

I much prefer this:

``````javascript
driver.get("http://foo.html");
title = driver.getTitle();
link  = driver.findElement(By.id('i am a link'));
link.click();
assert(driver.getCurrentUrl().indexOf('foo title 2') > -1);
assert(title.indexOf('foo title') > -1);
driver.quit();
``````

And that's exactly what `webdriver-sync` aims to achieve.  It should look just
like the java API provided by the Selenium organization, but without the static typing.


## LICENSE
``````
The MIT License (MIT)

Copyright (c) 2013 Joseph Spencer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
``````

## CREDIT when it is due!
Special thanks to the developers of <a href="https://github.com/joeferner/node-java">node-java</a>!!!

###Contributors (listed chronilogically)
* Justin Searls @searls


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jsdevel/webdriver-sync/trend.png)](https://bitdeli.com/free "Bitdeli Badge")