'use strict';

describe('utils', function() {
  var mod;
  var sinon;
  var prequire;
  var path;
  var assert;
  var importsStub;

  before(function() {
    sinon = require('sinon');
    prequire = require('proxyquire');
    path = require('path');
    assert = require('assert');
    importsStub = {
      helpers: {
        Map: {}
      }
    };

    mod = prequire(
      path.resolve('src', 'utils.js'),
      {'./imports': importsStub}
    );
  });

  describe('#addFinalProp', function() {
    it('should set the prop to the given value', function() {
      var obj = {};
      mod.addFinalProp(obj, 'a', 'asdf');
      assert.equal(obj.a, 'asdf');
    });

    it('should not set the prop when the given value is undefined', function() {
      var obj = {};
      mod.addFinalProp(obj, 'a', ({}).asdf);
      assert.equal(obj.a, void 0);
    });
  });

  describe('#extendAll', function() {
    it('is callable', function() {
      function A() {
      }
      function B() {
      }
      function C() {
      }
      B.bar = 'bar';
      A.prototype.name = 'A';
      B.prototype.name = 'B';
      C.prototype.name = 'C';
      B.prototype.bar = 'bar';
      B.prototype.foo = 'boo';
      C.prototype.foo = 'foo';
      mod.extendAll(A, B, C);
      var instance = new A();
      assert.equal(instance.name, 'A');
      assert.equal(instance.bar, 'bar');
      assert.equal(instance.foo, 'boo');
      assert.equal(A.bar, 'bar');
      assert(A.__extends.B);
      assert(A.__extends.C);
    });
  });
});