'use strict';

describe('webdriver-sync', function(){
  var assert;
  var path;
  var wd;
  var driver;
  var element;
  var By;
  var ChromeDriver;
  var Cookie;
  var ExpectedConditions;
  var TimeUnit;
  var options;

  before(function(){
    assert=require('assert');
    path = require('path');
    wd=require('../');
    //wd.importTo(this);
    By = wd.By;
    ChromeDriver = wd.ChromeDriver;
    Cookie = wd.Cookie;
    ExpectedConditions = wd.ExpectedConditions;
    TimeUnit = wd.TimeUnit;
    driver = require('./lib/driver.js').driver;
    options = driver.manage();
    driver.get('http://www.google.com');
  });

  after(function(){
    driver.quit();
  });


  describe('driver', function(){
    beforeEach(function(){
      options.deleteAllCookies();
    });

    it('should be able to show the google title', function(){
      assert.equal(driver.getTitle(), 'Google');//prints 'Google'
    });

    it('should be able to type some keys and submit a form', function(){
      element = driver.findElement(By.name('q'));
      element.sendKeys('Cheese!');
      element.submit();
      element = driver.findElement(By.name('q'));
      assert.equal(element.getAttribute('value'), 'Cheese!');
    });

    it('should be able to get a list of divs', function(){
      var elements = driver.findElements(By.tagName('html'));
      assert(elements.length > 0, 'There were no divs on the page.');
    });

    it('should be able to get the current url', function(){
      assert(driver.getCurrentUrl(), 'the current url was empty.');
    });

    it('should be able to get the page source', function(){
      driver.getPageSource();
    });

    xit('sould be able to start HtmlUnit', function(){
      var htmlDriver = new wd.HtmlUnitDriver();
      htmlDriver.quit();
    });

    it('should be able to work with driver options', function(){
      assert(driver.manage());
    });

    it('should be able to work with TimeUnit', function(){
      assert(TimeUnit.DAYS, 'days');
      assert(TimeUnit.HOURS, 'hours');
      assert(TimeUnit.MICROSECONDS, 'microseconds');
      assert(TimeUnit.MILLISECONDS, 'milliseconds');
      assert(TimeUnit.MINUTES, 'minutes');
      assert(TimeUnit.NANOSECONDS, 'nanoseconds');
      assert(TimeUnit.SECONDS, 'seconds');
    });

    describe('#exportTo', function() {
      it('should export all Constructors to target', function() {
        var target = {};
        wd.exportTo(target);
        assert('ChromeDriver' in target, 'ChromeDriver');
        assert('Keys' in target, 'Keys');
        assert('PhantomJSDriver' in target, 'PhantomJSDriver');
        assert('SafariDriver' in target, 'SafariDriver');
        assert(!('exportTo' in target), 'exportTo');
        assert(!('sleep' in target), 'sleep');
      });
    });

    it('should be albe to sleep', function(){
      var start=Date.now();
      var end;
      var secondsToWait=2 * 1000;
      wd.sleep(secondsToWait);
      end=Date.now();
      assert(end-start >= secondsToWait, 'sleep didn\'t work.');
    });
  });

  describe('wait', function() {
    var start;

    beforeEach(function() {
      start = Date.now();
    });

    it('should halt execution until the condition is satisfied', function() {
      var count = 0;
      wd.wait(function() {
        return ++count === 2;
      });

      assert.equal(count, 2);
    });

    it('should throw an error after the provided timeout', function() {
      var error;

      try {
        wd.wait(function() {
          return false;
        }, { timeout: 1000 });
      } catch(err) {
        error = err;
      }

      assert.ok(error);
      assert(Date.now() - start >= 300);
    });

    it('should honor the specified polling period', function() {
      var callTimes = [];
      var perceivedPeriod;

      wd.wait(function() {
        callTimes.push(Date.now());
        return callTimes.length === 2;
      }, { timeout: 1000, period: 120 });

      perceivedPeriod = callTimes[1] - callTimes[0];
      assert(perceivedPeriod >= 120);
      assert(perceivedPeriod < 200);
    });
  });
});
