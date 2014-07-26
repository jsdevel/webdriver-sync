'use strict';

var path = require('path');
var webdriver = require(
  path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
);
var seleniumBinaries = require('selenium-binaries');
var ChromeDriver = webdriver.ChromeDriver;
var ChromeDriverService = webdriver.ChromeDriverService;
var ChromeOptions = webdriver.ChromeOptions;
var DesiredCapabilities = webdriver.DesiredCapabilities;
var File = webdriver.File;
var RemoteWebDriver = webdriver.RemoteWebDriver;
var serviceBuilder;
var service;

if(process.env.TRAVIS){
  console.log('Hello Travis!');
  service = new ChromeDriverService.Builder()
    .usingAnyFreePort()
    .usingDriverExecutable(new File(seleniumBinaries.chromedriver))
    //.withEnvironment({'DISPLAY':':99.0'})
    //.withSilent(true)
    //.withVerbose(true)
    .build();
} else {
  service = ChromeDriverService.createDefaultService();
}

service.start();

module.exports = {
  get driver() {
    return new RemoteWebDriver(service.getUrl(), DesiredCapabilities.chrome());
  }
};
