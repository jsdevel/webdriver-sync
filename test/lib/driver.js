var path = require('path');
var webdriver = require(
  path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
);
var DesiredCapabilities = webdriver.DesiredCapabilities;
var ChromeDriver = webdriver.ChromeDriver;
var ChromeOptions = webdriver.ChromeOptions;
var PhantomJSDriver = webdriver.PhantomJSDriver;
var RemoteWebDriver = webdriver.RemoteWebDriver;
var chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--no-sandbox");
//var service = webdriver.ChromeDriverService.createDefaultService();
//service.start();

module.exports = {
  get driver() {
    return new ChromeDriver();
    //temporary because travis build is failing due to environment issue
    //return new RemoteWebDriver(service.getUrl(), 
    //DesiredCapabilities.chrome());
  }
};