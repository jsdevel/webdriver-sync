'use strict';

describe('RemoteWebDriver', function() {
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;

  after(function() {
    driver.quit();
  });

  describe('#setLogLevel', function() {
    var Level = require('../../src/classes/Level');
    it('accepts Level', function() {
      driver.setLogLevel(Level.SEVERE);
    });
  });
});