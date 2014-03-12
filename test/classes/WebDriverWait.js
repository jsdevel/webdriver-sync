'use strict';

describe('WebDriverWait', function() {
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var wd = require('../../src/webdriver-sync');
  var ExpectedConditions = wd.ExpectedConditions;
  var WebDriverWait = wd.WebDriverWait;
  var By = wd.By;
  var ChromeDriver = wd.ChromeDriver;

  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  describe('constructor', function() {
    var chromeDriver;

    before(function() {
      chromeDriver = new ChromeDriver();
    });

    after(function() {
      chromeDriver.quit();
    });

    it('accepts ChromeDriver', function() {
      new WebDriverWait(chromeDriver, 100);
    });
  });

  describe('#until', function() {
    it('should take an ExpectedCondition', function() {
      (new WebDriverWait(driver, 100, 10)).until(
        ExpectedConditions.elementToBeClickable(By.linkText('Sign in'))
      );
    });
  });
});