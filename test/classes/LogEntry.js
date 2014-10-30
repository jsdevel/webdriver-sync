'use strict';

describe('LogEntry', function() {
  var wd = require('../..');
  var LogEntry = wd.LogEntry;
  var Instance = require('../../src/classes/Instance');
  var Class = require('../../src/imports').LogEntry;
  var Long = require('../../src/imports').Long;
  var Level = wd.Level;

  it('allows an instance in the constructor', function() {
    new LogEntry(
      new Instance(
        new Class(Level.ALL._instance, new Long(5), 'foo')
      )
    );
  });

  describe('an instance', function(){
    var entry;
    before(function() {
      entry = new LogEntry(Level.ALL, 5, 'boo');
    });

    describe('#getLevel', function() {
      it('returns the level from the constructor', function() {
        entry.getLevel().should.equal(Level.ALL);
      });
    });

    describe('#getMessage', function() {
      it('should return the message from the constructor', function() {
        entry.getMessage().should.equal('boo');
      });
    });

    describe('#getTimestamp', function() {
      it('returns the timestamp from the constructor', function() {
        entry.getTimestamp().should.equal(5);
      });
    });

    describe('#toString', function() {
      it('does something', function() {
        entry.toString().should.be.type('string');
      });
    });
  });
});