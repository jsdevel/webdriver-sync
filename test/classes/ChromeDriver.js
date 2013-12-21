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

  it("can execute javascript synchronously", function() {
    driver.executeScript('alert(5);');
    driver.switchTo().alert().accept();
  });

  it("can execute javascript asynchronously", function() {
    driver.executeScript('alert(6);');
    driver.switchTo().alert().accept();
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
});