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

  describe('#getText', function() {
    it('is consistent', function() {
      var el = driver.findElementByXPath('.//a[contains(@href, "about")]');
      var timesToTest = 100;
      while(timesToTest--){
        assert.equal(
            el.getAttribute('href'),
            driver.findElementByXPath('.//a[contains(string(),"' + el.getText() + '")]').getAttribute('href')
        );
      }
    });
  });
});