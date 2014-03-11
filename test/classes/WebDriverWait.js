'use strict';

describe('WebDriverWait', function() {
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var wd = require('../../src/webdriver-sync');
  var ExpectedConditions = wd.ExpectedConditions;
  var WebDriverWait = wd.WebDriverWait;
  var By = wd.By;

  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  describe('#until', function() {
    it('should take an ExpectedCondition', function() {
      (new WebDriverWait(driver, 100, 10)).until(
        ExpectedConditions.elementToBeClickable(By.linkText('Sign in'))
      );
    });
  });
});