var path = require('path'),
    config = require('../config'),
    os = require('os'),
    isWin = /^win/i.test(os.platform()),
    home = process.env[isWin ? 'USERPROFILE' : 'HOME'],
    binaryDir = path.resolve(home, '.webdriver-sync'),
    chromeDriverFileName = 'chromedriver' + (isWin ? '.exe' : '');

module.exports = {
  binaryDir: binaryDir,
  chromeDriverFileName: chromeDriverFileName,
  chromeDriver: path.resolve(binaryDir, chromeDriverFileName),
  seleniumJar: path.resolve(binaryDir, config.selenium.jar),
  helperJar: path.resolve(__dirname, "java", "webdriversynchelpers", "dist", "webdriversynchelpers.jar")
};
