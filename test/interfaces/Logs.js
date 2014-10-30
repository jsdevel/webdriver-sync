'use strict';

describe('Logs', function(){
  var assert = require('assert');
  var driver;
  var wd = require('../../');
  var driverHelper = require('../lib/driver.js');
  var Logs = wd.Logs;
  var LogEntries = wd.LogEntries;
  var logs;

  beforeEach(function(){
    driver = driverHelper.driver;
    driver.get('http://google.com');
    logs = driver.manage().logs();
  });

  afterEach(function(){
    driver.quit();
  });

  it('should expect an Instance', function(){
    assert.throws(function(){
      new Logs(5);
    });
  });

  it('should be returned from Options.logs()', function(){
    logs.should.be.an.instanceOf(Logs);
  });

  describe('.getAvailableLogTypes()', function(){
    it('should return an array of strings', function(){
      var availableTypes = logs.getAvailableLogTypes();
      availableTypes.should.be.an.instanceOf(Array);
      availableTypes.length.should.be.above(0);
      availableTypes[0].should.be.type('string');
    });
  });

  describe('.get()', function(){
    it('should accept browser logs', function(){
      logs.get('browser').should.be.an.instanceOf(LogEntries);
    });

    it('should accept driver logs', function(){
      logs.get('driver').should.be.an.instanceOf(LogEntries);
    });

    it('should accept client logs', function(){
      logs.get('client').should.be.an.instanceOf(LogEntries);
    });
  });

});
