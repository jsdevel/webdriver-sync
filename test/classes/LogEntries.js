'use strict';

describe('Logs', function(){
  var assert = require('assert');
  var wd = require('../../');
  var ChromeDriver = wd.ChromeDriver;
  var DesiredCapabilities = wd.DesiredCapabilities;
  var Level = wd.Level;
  var LoggingPreferences = wd.LoggingPreferences;
  var prefs;
  var caps;
  var driver;
  
  beforeEach(function(){
    caps = DesiredCapabilities.chrome();
    prefs = new LoggingPreferences();
    prefs.enable('browser', Level.ALL);
    caps.setCapability('loggingPrefs', prefs);
    driver = new ChromeDriver(caps);
    driver.get('http://google.com');
  });

  afterEach(function(){
    driver.quit();
  });

  describe('.getAll()', function(){
    describe('with browser', function(){
      it('should return all console logs', function(){
        driver.executeScript('console.log("hello there");');
        driver
          .manage()
          .logs()
          .get('browser')
          .getAll()[0]
          .message
          .should
          .containEql('hello there');

      });
    });
  });
});
