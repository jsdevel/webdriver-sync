describe("ChromeDriver", function() {
  var assert = require('assert');
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var WebElement = require(
      path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
    ).WebElement;

  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  it("can return a WebElement", function() {
    var el = driver.executeScript('return document.querySelector("[name=q]");');
    assert(el instanceof WebElement);
  });

  it("can return an array of WebElements", function() {
    var divs = driver.executeScript('return document.querySelectorAll("div");');
    divs.forEach(function(div) {
      assert(div instanceof WebElement);
    });
  });

  it("can return numbers", function() {
    assert.equal(driver.executeScript("return 5;"), 5);
  });

  it("can return strings", function() {
    assert.equal(driver.executeScript("return 'boo';"), 'boo');
  });

  it("can return objects", function() {
    var result = driver.executeScript("return {asdf:5};");
    assert.equal(result.asdf, 5);
  });

  it("can return arrays", function() {
    var result = driver.executeScript("return ['boo'];");
    assert.equal(result[0], 'boo');
  });

  it("handles nested arrays and objects", function(){
    var result = driver.executeScript("return {arr:['boo'],obj:{asdf:5}};");
    assert.equal(result.arr[0]+result.obj.asdf, 'boo5');
  });
});