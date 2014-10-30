'use strict';

describe('ExpectedConditions', function() {
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var wd = require('../../src/webdriver-sync');
  var ExpectedCondition = require('../../src/interfaces/ExpectedCondition');
  var ExpectedConditions = wd.ExpectedConditions;
  var By = wd.By;

  beforeEach(function() {
    driver.get('http://google.com');
  });

  after(function(){
    driver.quit();
  });

  it('should be able to work with expected conditions', function(){
    var by=By.cssSelector('body');
    var element = driver.findElement(by);
    validate(ExpectedConditions.alertIsPresent());
    validate(ExpectedConditions.elementSelectionStateToBe(by, false));
    validate(ExpectedConditions.elementSelectionStateToBe(element, false));
    validate(ExpectedConditions.elementToBeClickable(by));
    validate(ExpectedConditions.elementToBeClickable(element));
    validate(ExpectedConditions.elementToBeSelected(by));
    validate(ExpectedConditions.elementToBeSelected(element));
    validate(ExpectedConditions.frameToBeAvailableAndSwitchToIt('asdf'));
    validate(ExpectedConditions.invisibilityOfElementLocated(by));
    validate(ExpectedConditions.invisibilityOfElementWithText(by, 'adsf'));
    validate(ExpectedConditions.not(ExpectedConditions.alertIsPresent()));
    validate(ExpectedConditions.presenceOfAllElementsLocatedBy(by));
    validate(ExpectedConditions.presenceOfElementLocated(by));
    validate(ExpectedConditions.refreshed(ExpectedConditions.alertIsPresent()));
    validate(ExpectedConditions.stalenessOf(element));
    validate(ExpectedConditions.textToBePresentInElement(by, 'ads'));
    validate(ExpectedConditions.textToBePresentInElement(element, 'ads'));
    validate(ExpectedConditions.textToBePresentInElementValue(by, 'adsf'));
    validate(ExpectedConditions.textToBePresentInElementValue(element, 'adsf'));
    validate(ExpectedConditions.titleContains('asdf'));
    validate(ExpectedConditions.titleIs('sdf'));
    validate(ExpectedConditions.visibilityOf(element));
    validate(ExpectedConditions.visibilityOfElementLocated(by));
  });

  it('should accept an element from driver#findElements', function() {
    var by = By.cssSelector('div');
    var element = driver.findElements(by)[0];
    ExpectedConditions.visibilityOf(element);
  });

  function validate(val){
    val.should.be.an.instanceOf(ExpectedCondition);
  }
});
