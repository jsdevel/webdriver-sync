[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

# webdriver-sync
> Selenium testing without nested callbacks or promises!

`webdriver-sync` wraps the Java `WebDriver` API in a synchronous way allowing your
tests to be very concise.  You can avoid the intricacies of `promises` and
`async ceremony` by using it.

## webdriver-sync avoids this

```javascript
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
```

## in favor of this...

Completely synchronous API!  No promises or callbacks needed.

````javascript
driver.get("http://foo.html");
title = driver.getTitle();
link  = driver.findElement(By.id('i am a link'));
link.click();
assert(driver.getCurrentUrl().indexOf('foo title 2') > -1);
title.should.equal('foo title');
console.log(title);
driver.quit();
````

## Highlights

* 100% synchronous selenium in javascript without promises or async ceremony!
* Run Chrome, Firefox, Safari, PhantomJS, Internet Explorer, and RemoteWebDriver (Android to come)!
* Reduce code by embracing a synchronous API!
* Reduce verbosity found in statically typed langs like java and c#
* Dependency management for 3rd party binaries I.E. chromedriver and selenium-server-standalone-x.x.x.jar.
* Always up to date binary dependencies when you update your version of `webdriver-sync`.
* Run your automated tests against your app much faster on `travis-ci`.
* Connect to Sauce using the RemoteWebDriver or other drivers that extend RemoteWebDriver.

##Instantiating Drivers
Here are a few examples on how you can instantiate drivers for testing:
###InternetExplorerDriver
```javascript
var wd = require('webdriver-sync');
var IEDriver = wd.InternetExplorerDriver;
var driver = new IEDriver();
driver.get('http://google.com');
```
###PhantomJS
```javascript
var wd = require('webdriver-sync');
var PhantomJSDriver = wd.PhantomJSDriver;
var driver = new PhantomJSDriver();
driver.get('http://google.com');
```
###Firefox
```javascript
var wd = require('webdriver-sync');
var FirefoxDriver = wd.FirefoxDriver;
var driver = new FirefoxDriver();
driver.get('http://google.com');
```
###ChromeDriver
There are 2 ways to run Chrome.

The straightforward way is slower as it has to start chromedriver each time it's instantiated:
```javascript
var wd = require('webdriver-sync');
var ChromeDriver = wd.ChromeDriver;
var driver = new ChromeDriver();
driver.get('http://google.com');
```

This way uses a service and is much faster overall, but requires more setup.  You'd likely want to wrap this in a module with a getter for a new driver when you need one:
````javascript
var wd = require('webdriver-sync');
var ChromeDriverService = wd.ChromeDriverService;
var ChromeDriver = wd.ChromeDriver;
var service = new ChromeDriverService.Builder()
    .usingAnyFreePort()
    .usingDriverExecutable(new File(findsChromeDriver.find()))
    .build();

var driver = new ChromeDriver(service);
driver.get('http://google.com');
````
##Dealing with arrays and data
`webdriver-sync` allows you to treat data as you normally would.  For Arrays, you've got all the methods
you would expect:

* filter
* forEach
* map

Because `webdriver-sync` is completely synchronous by nature, we're able to leverage native javascript methods without 3rd party libaries for `asyncrony`.

Here we execute an async script, return a collection of divs, and console.log the inner text of each div.  Notice that our control flow with other assertions are not affected in any way:
````javascript
  it('can do really cool stuff!', function(){
    var numberOfElements = 0;
    driver
      .executeAsyncScript("var cb = arguments[arguments.length-1]; cb(document.querySelectorAll('div'));")
      .forEach(function(el){
        numberOfElements++;
        console.log(el.getText());
      });
    assert(numberOfElements, 'We got here!');
  });
````

See more tests for `JavascriptExecutor` here: https://github.com/jsdevel/webdriver-sync/blob/master/test/interfaces/JavascriptExecutor.js

## Explicitly Waiting with a Function

The `wait` utility method pauses execution until some arbitrary condition is met. Provide a function and `webdriver-sync` will invoke the function repeatedly until it returns a truthy value. You may optionally specify millisecond values for a `timeout` (how long to wait before considering the operation failed and throwing an error) and a `period` (how long to wait between invocations of the provided function).

For example:

```javascript
driver.findElement(webdriver.By.cssSelector('button')).click();
driver.wait(function() {
  return driver.findElements(webdriver.By.cssSelector('.thumbnail').length > 0;
}, { timeout: 1000, period: 100 });
```

## Related Projects
`webdriver-sync`'s goal is to wrap the Java API and make selenium binary management simpler overall.  Any other functionality or feature should be addressed in 3rd party modules.

Here is a list of 3rd party modules and why you'd want to use them:

* [selenium-global](https://github.com/jsdevel/node-selenium-global#example).  This module enables you to add `webdriver-sync` wrappings globally before running your tests.  If you prefer to avoid `var wd = require('webdriver-sync');` in each of your tests then you can use this.
* [selenium-binaries](https://www.npmjs.org/package/selenium-binaries).  This module handles selenium binary management.

## Design
`webdriver-sync` leverages [node-java](https://github.com/joeferner/node-java) to wrap the java API provided by the Selenium project which is by far the best supported of them all.  Wrappings are located under `src/`.  In most cases, methods proxy through to their java equivalent.

You can view `webdriver-sync`'s API [here](https://github.com/jsdevel/webdriver-sync/blob/master/src/webdriver-sync.js#L15).  You can directly instantiate any of the classes directly.  Interfaces are returnes by various methods and are usually not worth calling directly, but they're useful for verifying the type of returned data.

## Installation
`node-java` requires that you're able to compile node add ons.  The install can be a bit tricky depending on your environment.  Here are some general guidelines when installing `webdriver-sync`:

1. Ensure that your environment is setup to compile node add ons.  A good module to use in verifying that you can compile node addons is [microtime](https://github.com/wadey/node-microtime).
2. You'll need a minimum JDK version of `1.7` installed on your system.
3. `npm install webdriver-sync`  If you run into issues feel free to [reach out](https://github.com/jsdevel/webdriver-sync/issues?state=open)!
4. `webdriver-sync` will download `selenium-server-standalone-x.x.x.jar` and `chromedriver` for you which makes your life
easier.

Binaries will be downloaded to one of the following locations (listed in order of precedence):
1. A directory defined by env var `WEBDRIVER_SYNC_BINARY_PATH`
2. `/lib/webdriver-sync` if running as `root` on *nix systems
3. `$HOME/.webdriver-sync`

You can further override the download location for binaries as follows:

* Chromdriver - Place `chromedriver` or `chromedriver.exe` (for windows) on your
path.
* Selenium jar - Set `SELENIUM_SERVER_STANDALONE_JAR` in your env and have it point to the location
where you have it on disk.  You should never do this, as the API is only tested
against specific versions of selenium, but it is available.

##Documentation
As `webdriver-sync` is a wrapper around the java API, you can browse any of the
javadocs online.  You can quite literally use this module the same way you
would in java without the static typing.

Here are some links:

* [classdocs](http://selenium.googlecode.com/git/docs/api/java/org/openqa/selenium/package-summary.html)
* [selenium](http://docs.seleniumhq.org/)


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
export DISPLAY=:99
Xvfb :99 -ac -screen 0 1280x1024x32> /dev/null &
npm test
````

````javascript
//Use this in your tests for ChromeDriverService
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
* jugglinmike @<a href='https://github.com/jugglinmike'>jugglinmike</a>


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jsdevel/webdriver-sync/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[downloads-image]: http://img.shields.io/npm/dm/webdriver-sync.svg
[npm-url]: https://npmjs.org/package/webdriver-sync
[npm-image]: http://img.shields.io/npm/v/webdriver-sync.svg

[travis-url]: https://travis-ci.org/jsdevel/webdriver-sync
[travis-image]: http://img.shields.io/travis/jsdevel/webdriver-sync.svg
