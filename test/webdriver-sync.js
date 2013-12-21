describe("webdriver-sync", function(){
  var assert;
  var path;
  var webdriverModule;
  var driver;
  var element;
  var By;
  var ChromeDriver;
  var Cookie;
  var ExpectedConditions;
  var TimeUnit;
  var options;

  before(function(){
    assert=require('assert');
    path = require('path');
    webdriverModule=require(
      path.resolve(__dirname, '..', 'src', 'webdriver-sync')
    );
    //webdriverModule.importTo(this);
    By = webdriverModule.By;
    ChromeDriver = webdriverModule.ChromeDriver;
    Cookie = webdriverModule.Cookie;
    ExpectedConditions = webdriverModule.ExpectedConditions;
    TimeUnit = webdriverModule.TimeUnit;
    driver = require(path.resolve(__dirname, 'lib', 'driver.js')).driver;
    options = driver.manage();
    driver.get("http://www.google.com");
  });

  after(function(){
    driver.quit();
  });

  beforeEach(function(){
    options.deleteAllCookies();
  });

  it("should be able to show the google title", function(){
    assert.equal(driver.getTitle(), "Google");//prints "Google"
  });

  it("should be able to type some keys and submit a form", function(){
    element = driver.findElement(By.name("q"));
    element.sendKeys("Cheese!");
    element.submit();
    element = driver.findElement(By.name("q"));
    assert.equal(element.getAttribute('value'), "Cheese!");
  });

  it("should be able to get a list of divs", function(){
    elements = driver.findElements(By.tagName('html'));
    assert(elements.length > 0, "There were no divs on the page.");
  });

  it("should be able to get the current url", function(){
    assert(driver.getCurrentUrl(), "the current url was empty.");
  });

  it("should be able to get the page source", function(){
    driver.getPageSource();
  });

  it("sould be able to start HtmlUnit", function(){
    var htmlDriver = new webdriverModule.HtmlUnitDriver();
    htmlDriver.quit();
  });

  it("should be able to start Firefox", function(){
    var firefoxDriver = new webdriverModule.FirefoxDriver();
    firefoxDriver.quit();
  });

  it("should be able to work with driver options", function(){
    assert(driver.manage());
  });

  it("should be able to work with expected conditions", function(){
    var by=By.cssSelector('body');
    var element = driver.findElement(by);
    ExpectedConditions.alertIsPresent();
    ExpectedConditions.elementSelectionStateToBe(by, false);
    ExpectedConditions.elementSelectionStateToBe(element, false);
    ExpectedConditions.elementToBeClickable(by);
    ExpectedConditions.elementToBeSelected(by);
    ExpectedConditions.elementToBeSelected(element);
    ExpectedConditions.frameToBeAvailableAndSwitchToIt("asdf");
    ExpectedConditions.invisibilityOfElementLocated(by);
    ExpectedConditions.invisibilityOfElementWithText(by, "adsf");
    ExpectedConditions.not(ExpectedConditions.alertIsPresent());
    ExpectedConditions.presenceOfAllElementsLocatedBy(by);
    ExpectedConditions.presenceOfElementLocated(by);
    ExpectedConditions.refreshed(ExpectedConditions.alertIsPresent());
    ExpectedConditions.stalenessOf(element);
    ExpectedConditions.textToBePresentInElement(by, "ads");
    ExpectedConditions.textToBePresentInElementValue(by, "adsf");
    ExpectedConditions.titleContains("asdf");
    ExpectedConditions.titleIs("sdf");
    ExpectedConditions.visibilityOf(element);
    ExpectedConditions.visibilityOfElementLocated(by);
  });

  it("should be able to work with TimeUnit", function(){
    assert(TimeUnit.DAYS, "days");
    assert(TimeUnit.HOURS, "hours");
    assert(TimeUnit.MICROSECONDS, "microseconds");
    assert(TimeUnit.MILLISECONDS, "milliseconds");
    assert(TimeUnit.MINUTES, "minutes");
    assert(TimeUnit.NANOSECONDS, "nanoseconds");
    assert(TimeUnit.SECONDS, "seconds");
  });

  it("should be albe to sleep", function(){
    var start=Date.now();
    var end;
    var secondsToWait=2 * 1000;
    webdriverModule.sleep(secondsToWait);
    end=Date.now();
    assert(end-start >= secondsToWait, "sleep didn't work.");
  });
});
