var mod;
var sinon;
var prequire;
var path;
var assert;
var importsStub;

function beforeSuite(){
   sinon = require('sinon');
   prequire = require('proxyquire');
   path = require('path');
   assert = require('assert');
   importsStub={
      helpers:{
         Map:{}
      }
   };

   mod = prequire(
      path.resolve('src', 'utils'),
      {'./imports':importsStub}
   );
}

//Test
function addFinalProp_should_set_the_prop_to_the_given_value(){
   var obj = {};
   mod.addFinalProp(obj, "a", "asdf");
   assert.equal(obj.a, "asdf");
}

//Test
function addFinalProp_should_not_set_the_prop_when_the_given_value_is_undefined(){
   var obj = {};
   mod.addFinalProp(obj, "a", ({}).asdf);
   assert.equal(obj.a, void 0);
}

//Test
function test_extendAll(){
   function A(){}
   function B(){}
   function C(){}
   B.bar="bar";
   A.prototype.name="A";
   B.prototype.name="B";
   C.prototype.name="C";
   B.prototype.bar="bar";
   B.prototype.foo="boo";
   C.prototype.foo="foo";
   mod.extendAll(A,B,C);
   var instance = new A();
   assert.equal(instance.name, "A");
   assert.equal(instance.bar, "bar");
   assert.equal(instance.foo, "boo");
   assert.equal(A.bar, "bar");
   assert(A.__extends.B);
   assert(A.__extends.C);
}
