'use strict';

describe('MarionetteDriver', function() {
  var wd = require('../../');
  var MarionettedDriver = wd.MarionetteDriver;
  var Capabilities = wd.DesiredCapabilities;

  it('should be able to start Firefox', function(){
    var marionetteDriver = new MarionettedDriver();
    marionetteDriver.quit();
  });

  it('should allow Capabilities as a constructor argument', function(){
    var ff = new MarionettedDriver(new Capabilities());
    ff.quit();
  });
});
