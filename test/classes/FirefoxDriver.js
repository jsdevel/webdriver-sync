'use strict';

describe('FirefoxDriver', function() {
  var wd = require('../../');
  var FirefoxDriver = wd.FirefoxDriver;
  var FirefoxProfile = wd.FirefoxProfile;

  it('should be able to start Firefox', function(){
    var firefoxDriver = new FirefoxDriver();
    firefoxDriver.quit();
  });

  it('should allow FirefoxProfile as a constructor argument', function(){
    var ff = new FirefoxDriver(new FirefoxProfile());
    ff.quit();
  });
});
