'use strict';

describe('ChromeDriverService.Builder', function() {
  var path = require('path');
  var ChromeDriverService = require('../../src/classes/ChromeDriverService');
  var Builder = ChromeDriverService.Builder;
  var File = require('../../src/classes/File');
  var findsChromeDriver = require('../../src/lib/finds-chrome-driver');

  describe('interface', function() {
    var builder = new Builder();
    describe('#usingDriverExecutable and #build', function() {
      it('returns an instance of ChromeDriverService', function() {
        builder
          .usingDriverExecutable(new File(findsChromeDriver.find()))
          .build().should.be.an.instanceOf(ChromeDriverService);
      });
    });

    describe('#usingAnyFreePort', function() {
      it('may be called', function() {
        builder.usingAnyFreePort().should.be.an.instanceOf(Builder);
      });
    });

    describe('#usingPort', function() {
      it('may be called with a number', function() {
        builder.usingAnyFreePort(5).should.be.an.instanceOf(Builder);
      });
    });

    describe('#withEnvironment', function() {
      it('may be called with an object', function() {
        builder.withEnvironment({}).should.be.an.instanceOf(Builder);
      });
    });

    describe('#withLogFile', function() {
      it('may be called with a File', function() {
        builder.withLogFile(new File(
          path.resolve(__dirname, '.foo')
        )).should.be.an.instanceOf(Builder);
      });
    });

    describe('#withSilent', function() {
      it('may be called with a boolean', function() {
        builder.withSilent(true).should.be.an.instanceOf(Builder);
      });
    });

    describe('#withVerbose', function() {
      it('may be called with a boolean', function() {
        builder.withVerbose(true).should.be.an.instanceOf(Builder);
      });
    });
  });
});