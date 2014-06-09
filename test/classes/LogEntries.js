'use strict';

describe('Logs', function(){
  var assert = require('assert');
  var driver;
  var wd = require('../../');
  var ChromeDriver = wd.ChromeDriver;
  var Level = wd.Level;
  var logs;
  
  beforeEach(function(){
    driver = new ChromeDriver();
    driver.get('http://google.com');
  });

  afterEach(function(){
    driver.quit();
  });

  describe('.getAll()', function(){
    describe('with browser', function(){
      it('should return all console logs', function(){
        driver.executeScript('console.log(5);');
        //console.log(logs.get('browser').getAll()[0].getMessage());
        console.log(driver.manage().logs().get('browser').getAll());
      });
    });
  });
});
