[![Build Status](https://travis-ci.org/jsdevel/webdriver-sync.png)](https://travis-ci.org/jsdevel/webdriver-sync)

# webdriver-sync

`webdriver-sync` aims to be a complete wrapper around all the classes found in the java API.
This allows you to write your selenium tests in the same synchronous fasion that
you normally would without the ceremony involved in asynchronous testing.

View the source code to see the classes that have been ported over.  It's organized and is optimized for performance.

## Why should I use this?

* You can write selenium in javascript!
* You can use `mocha` for writing test suites!
* You can reduce code by embracing a synchronous API
* You can reduce verbosity found in statically typed langs like java and c#
* You can forget about dependency management for 3rd party binaries
* Your QA team can embrace javascript :)

## Example

````javascript
/*
Following are the drivers that will become available in future releases:

AndroidDriver
IpadDriver
IphoneDriver
*/
var webdriverSync = require('webdriver-sync');
var By            = webdriverSync.By;
var ChromeDriver  = webdriverSync.ChromeDriver;
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
### Brief:

`npm install webdriver-sync`

### Details:

Ulike other implementations, `webdriver-sync` directly calls the java API
provided by the Selenium organization.  `webdriver-sync` relies on the `java` module
to accomplish this.

Installing the `java` module can be a bit tricky, so here are a few items to take into consideration:

#### All OS's i.e. *nix and windows:
* Install JDK on your system and set `JAVA_HOME` in your environment to point to the JDK location

#### Windows:
* Find where the `jvm.dll` binary is and place it's directory in your `PATH`.
* Pass appropriate flags to `node-gyp` if it can't find compiler tools.

#### Mac
* Install xcode and the command line tools.  `make` must be available from the command line.

#### Linux
* `make` must be installed.

I recommend installing the `java` module somewhere on your system before installing
`webdriver-sync` to isolate any potential issues.

If you want to drive tests with Chrome, make sure to have the chromedriver executable, either on your PATH or at `~/.webdriver-sync/chromedriver`
([download here](http://chromedriver.storage.googleapis.com/index.html)).

If you're still running into issues installing the module, the problem is likely with the `java`
module.  In addition to filing a bug here, please see https://github.com/nearinfinity/node-java
for additional help.

## Challenges
Selenium is in constant flux.  Browser updates may force unexpected updates
to `selenium-standalone-server.jar` and affected driver binaries I.E. `chromedriver`.  Any bridge, be it ruby
or python, will be affected by these updates as well as `webdriver-sync`.  It therefore falls on you, the
user of this module, to file bugs as accurately and as promptly as you can.

## Testing the Install

Once you've installed the module, you can easily test it by navigating to the
module root and running `npm test`.

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

Special thanks to the developers of `node-java`!!!


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jsdevel/webdriver-sync/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

