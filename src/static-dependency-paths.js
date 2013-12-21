var path = require('path'),
    config = require('../config'),
    os = require('os'),
    isWin = /^win/i.test(os.platform()),
    home = process.env[isWin ? 'USERPROFILE' : 'HOME'],
    binaryDir = path.resolve(home, '.webdriver-sync');

module.exports = {
  binaryDir: binaryDir,
  chromeDriver: path.resolve(binaryDir, 'chromedriver' + (isWin ? '.exe' : '')),
  seleniumJar: path.resolve(binaryDir, config.selenium.jar),
  helperJar: path.resolve(__dirname, "java", "webdriversynchelpers", "dist", "webdriversynchelpers.jar")
};
