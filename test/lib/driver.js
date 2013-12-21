var path = require('path');
var webdriver = require(
  path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
);
var DesiredCapabilities = webdriver.DesiredCapabilities;
var RemoteWebDriver = webdriver.RemoteWebDriver;
var service = webdriver.ChromeDriverService.createDefaultService();
service.start();

module.exports = {
  get driver() {
    return new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());
  }
};