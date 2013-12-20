var path = require('path'),
    os = require('os'),
    isWin = /^win/i.test(os.platform()),
    home = process.env[isWin ? 'USERPROFILE' : 'HOME'],
    binaryDir = path.resolve(home, '.webdriver-sync');

module.exports = {
  binaryDir: binaryDir,
  chromeDriver: path.resolve(binaryDir, 'chromedriver' + (isWin ? '.exe' : '')),
  seleniumJar: process.env.SELENIUM_SERVER_STANDALONE_JAR || path.resolve(binaryDir, 'selenium-server-standalone.jar'),
  helperJar: path.resolve(__dirname, "java", "webdriversynchelpers", "dist", "webdriversynchelpers.jar")
};
