var path = require('path');
var webdriver = require(
  path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
);
var DesiredCapabilities = webdriver.DesiredCapabilities;
var FirefoxDriver = webdriver.FirefoxDriver();
var RemoteWebDriver = webdriver.RemoteWebDriver;
//var service = webdriver.ChromeDriverService.createDefaultService();
//service.start();

module.exports = {
  get driver() {
    return new FirefoxDriver();
    //temporary because travis build is failing due to environment issue
    //return new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());
  }
};