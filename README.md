[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

# webdriver-sync
> Synchronous Selenium testing in node!

## Highlights

* 100% synchronous selenium in javascript without promises or async ceremony!
* Run Chrome, Firefox, Safari, PhantomJS, Internet Explorer, and RemoteWebDriver (Android to come)!
* Reduce code by embracing a synchronous API!
* Reduce verbosity found in statically typed langs like java and c#
* Forget about dependency management for 3rd party binaries I.E. chromedriver and selenium-server-standalone-x.x.x.jar.  Say hello to an install process that handles all that for you.
* Connect to Sauce using the RemoteWebDriver or other drivers that extend RemoteWebDriver.

## Why Sync?

Prior to node, most of my testing was done in Java and JUnit.  I found the sync
API easier to follow and maintain.  I also wasn't happy with all the
async ceremony found in all other node APIs (similar to the following):

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
title.should.equal('foo title');
console.log(title);
driver.quit();
``````

And that's exactly what `webdriver-sync` aims to achieve.  It should look and act just
like the java API provided by the Selenium organization without the static typing.


###Dealing with arrays
`webdriver-sync` allows you to treat data as you normally would.  For Arrays, you've got all the methods
you would expect:
* filter
* forEach
* map

Here we execute an async script, return a collection of divs, and console.log the inner text of each div.  Notice that our control flow with other assertions are not affected in any way:
````javascript
  it('can do really cool stuff!', function(){//no done callback needed!
    var numOfEls = 0;
    driver
      .executeAsyncScript("var cb = arguments[arguments.length-1]; cb(document.querySelectorAll('div'));")
      .forEach(function(el){
        numOfEls++;
        console.log(el.getText());
      });
    assert(numOfEls, 'We got here!');
  });
````

See more tests for `JavascriptExecutor` here: https://github.com/jsdevel/webdriver-sync/blob/master/test/interfaces/JavascriptExecutor.js


## Example
Notice in this example that we are *not* using promises.  This means we can embrace modules that don't
understand promises, much like `assert` or `should`.

<b>Note:</b> You can avoid `var By = wd.By;` by using `wd.exportTo(global);` to further
reduce verbosity.

````javascript
var assert        = require('assert');
var wd            = require('webdriver-sync');
var By            = wd.By;
var ChromeDriver  = wd.ChromeDriver;
var driver        = new ChromeDriver;
var title;
var link;

driver.get("http://foo.html");

title = driver.getTitle();
link  = driver.findElement(By.id('i am a link'));
link.click();

assert(driver.getCurrentUrl().indexOf('foo title 2') > -1);
title.should.equal('foo title');
console.log(link.getText());
driver.quit();
````

## Installation
`webdriver-sync` depends on the Java JDK being loaded.  Ideally Oracle's release of the JDK.

`npm install webdriver-sync`  If you run into issues when `node-java` is installing, try setting JAVA_HOME in your env.

`webdriver-sync` will download `selenium-server-standalone-x.x.x.jar` and `chromedriver` for you which makes your life
easier.  These binaries will be downloaded to `$HOME/.webdriver-sync` on your system.

You can override parts of this process as follows:

* Chromdriver - Place `chromedriver` or `chromedriver.exe` (for windows) on your
path.
* Selenium jar - Set `SELENIUM_SERVER_STANDALONE_JAR` in your env and have it point to the location
where you have it on disk.  You should never do this, as the API is only tested
against specific versions of selenium, but it is available.

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

##LOGGING
By default, `webdriver-sync` disables any output from the selenium java bindings.  To
change this behavior, you can set either of the following env vars to any non-empty
value:

* WEBDRIVER_SYNC_ENABLE_SELENIUM_STDOUT
* WEBDRIVER_SYNC_ENABLE_SELENIUM_STDERR

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

###Contributors (listed chronologically).

Anyone who contributes to webdriver-sync, either through code changes or testing
will be listed here when their efforts are significant:
* Justin Searls @<a href='https://github.com/searls'>searls</a>
* @<a href='https://github.com/alphamerchant'>alphamerchant</a>
* Campbell Morgan @<a href='https://github.com/campbellwmorgan'>campbellwmorgan</a>
* Nick Tulett @<a href='https://github.com/NickTulett'>NickTulett</a>
* Andrew Nichols @<a href='https://github.com/tandrewnichols'>tandrewnichols</a>


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jsdevel/webdriver-sync/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[downloads-image]: http://img.shields.io/npm/dm/webdriver-sync.svg
[npm-url]: https://npmjs.org/package/webdriver-sync
[npm-image]: http://img.shields.io/npm/v/webdriver-sync.svg

[travis-url]: https://travis-ci.org/jsdevel/webdriver-sync
[travis-image]: http://img.shields.io/travis/jsdevel/webdriver-sync.svg
