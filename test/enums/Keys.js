'use strict';

describe('Keys', function() {
  var assert = require('assert');
  var Keys = require('../../src/enums/Keys');

  describe('static method', function() {
    describe('#chord', function() {
      it('returns a string terminated with Keys.NULL', function() {
        assert.equal(Keys.chord('asdfasdf'), 'asdfasdf'+Keys.NULL.toString());
      });
    });

    /*possible bug in node-java?
    describe('#getKeyFromUnicode', function() {
      it('returns Keys when a match is found', function() {
        assert(Keys.getKeyFromUnicode('\ue00d') instanceof Keys.constructor);
      });
      it('return null when no match is found', function() {
        assert.equal(Keys.getKeyFromUnicode('a'), null);
      });
    });
    */
  });

  describe('#valueOf', function() {
    it('returns keys when valid', function() {
      assert(Keys.valueOf('SPACE') instanceof Keys.constructor);
    });
    it('throws when invalid', function() {
      assert.throws(function(){Keys.valueOf('SPCE');});
    });
  });

  describe('#values', function() {
    it('returns an array of Keys', function() {
      Keys.values().forEach(function(v){
        assert(v instanceof Keys.constructor);
      });
    });
  });
});