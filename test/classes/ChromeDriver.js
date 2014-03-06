'use strict';

describe('ChromeDriver', function() {
  var assert = require('assert');
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var WebElement = require(
      path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
    ).WebElement;


  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  it('can execute javascript synchronously', function() {
    driver.executeScript('alert(5);');
    driver.switchTo().alert().accept();
  });

  it('can execute javascript asynchronously', function() {
    driver.executeScript('alert(6);');
    driver.switchTo().alert().accept();
  });
});