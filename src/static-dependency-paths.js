var path = require('path'),
    home = process.env.USERPROFILE || process.env.HOME,
    binaryDir = path.resolve(home, '.webdriver-sync');

module.exports = {
  chromeDriver: path.resolve(binaryDir, 'chromedriver'),
  seleniumJar: process.env.SELENIUM_SERVER_STANDALONE_JAR || path.resolve(binaryDir, 'selenium-server-standalone.jar'),
  helperJar: path.resolve(__dirname, "java", "webdriversynchelpers", "dist", "webdriversynchelpers.jar")
};
