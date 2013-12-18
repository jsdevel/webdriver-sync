/*
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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

  after(function() {
    driver.quit();
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