'use strict';

describe('WebElement', function() {
  var assert = require('assert');
  var driver = require('../lib/driver').driver;
  var wd = require('../../src/webdriver-sync');
  var By = wd.By;
  var Keys = wd.Keys;

  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  describe('#sendKeys', function() {
    it('can use Keys', function() {
      var el = driver.findElement(By.name('q'));
      el.sendKeys('who', Keys.SPACE, 'knew?');
      assert.equal(el.getAttribute('value'), 'who knew?');
    });
  });
});