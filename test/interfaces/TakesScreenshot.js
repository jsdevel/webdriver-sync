'use strict';

describe('TakesScreenshot', function() {
  var assert = require('assert');
  var path = require('path');
  var OutputType = require(
    path.resolve(__dirname, '..', '..', 'src', 'interfaces', 'OutputType')
  );
  var wd = require(
    path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
  );
  var driver;


  before(function() {
    driver = new wd.ChromeDriver();
    driver.get('http://google.com');
  });

  after(function() {
    driver.quit();
  });

  it('can use OutputType.FILE', function() {
    var file = driver.getScreenshotAs(OutputType.FILE);
  });

  it('can use OutputType.BASE64', function() {
    var base64String = driver.getScreenshotAs(OutputType.BASE64);
  });

  it('can use OutputType.BYTES', function() {
    var bytesArray = driver.getScreenshotAs(OutputType.BYTES);
  });
});