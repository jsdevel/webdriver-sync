'use strict';

describe('JavascriptExecutor', function() {
  var assert = require('assert');
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var wd = require(
      path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
    );
  var WebElement = wd.WebElement;
  var TimeUnit = wd.TimeUnit;

  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  describe('#executeScript', function() {
    it('can return a WebElement', function() {
      var el = driver.executeScript(
        'return document.querySelector("[name=q]");'
      );
      assert(el instanceof WebElement);
    });

    it('can return an array of WebElements', function() {
      var divs = driver.executeScript(
        'return document.querySelectorAll("div");'
      );
      divs.forEach(function(div) {
        assert(div instanceof WebElement);
      });
    });

    it('can return numbers', function() {
      assert.equal(driver.executeScript('return 5;'), 5);
    });

    it('can return strings', function() {
      assert.equal(driver.executeScript('return "boo";'), 'boo');
    });

    it('can return objects', function() {
      var result = driver.executeScript('return {asdf:5};');
      assert.equal(result.asdf, 5);
    });

    it('can return arrays', function() {
      var result = driver.executeScript('return ["boo"];');
      assert.equal(result[0], 'boo');
    });

    it('handles nested arrays and objects', function(){
      var result = driver.executeScript('return {arr:["boo"],obj:{asdf:5}};');
      assert.equal(result.arr[0]+result.obj.asdf, 'boo5');
    });
  });

  describe('#executeAsyncScript', function() {
    before(function(){
      driver.manage().timeouts().setScriptTimeout(5, TimeUnit.SECONDS);
    });

    it('can return a WebElement', function() {
      var el = driver.executeAsyncScript(
        wrapInAsync('document.querySelector("[name=q]")')
      );
      assert(el instanceof WebElement);
    });

    it('can return an array of WebElements', function() {
      var divs = driver.executeAsyncScript(
        wrapInAsync('document.querySelectorAll("div")')
      );
      divs.forEach(function(div) {
        assert(div instanceof WebElement);
      });
    });

    it('can return numbers', function() {
      assert.equal(driver.executeAsyncScript(wrapInAsync('5')), 5);
    });

    it('can return strings', function() {
      assert.equal(driver.executeAsyncScript(wrapInAsync('"boo"')), 'boo');
    });

    it('can return objects', function() {
      var result = driver.executeAsyncScript(wrapInAsync('{asdf:5}'));
      assert.equal(result.asdf, 5);
    });

    it('can return arrays', function() {
      var result = driver.executeAsyncScript(wrapInAsync('["boo"]'));
      assert.equal(result[0], 'boo');
    });

    it('handles nested arrays and objects', function(){
      var result = driver.executeAsyncScript(
        wrapInAsync('{arr:["boo"],obj:{asdf:5}}')
      );
      assert.equal(result.arr[0]+result.obj.asdf, 'boo5');
    });
  });

  function wrapInAsync(value){
    return 'var callback = arguments[arguments.length - 1];'
    + 'setTimeout(function(){'
    + '  callback('+value+');'
    + '}, 10);';
  }
});