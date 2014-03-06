'use strict';

var path = require('path'),
    config = require('../config'),
    os = require('os'),
    isWin = /^win/i.test(os.platform()),
    home = process.env[isWin ? 'USERPROFILE' : 'HOME'],
    binaryDir,
    chromeDriverFileName = 'chromedriver' + (isWin ? '.exe' : ''),
    cli = require('./lib/cli');

if(!home){
  cli.err('Neither of HOME or USERPROFILE were set in the env!');
  cli.exit(1);
}

binaryDir = path.resolve(home, '.webdriver-sync'),

module.exports = {
  binaryDir: binaryDir,
  chromeDriverFileName: chromeDriverFileName,
  chromeDriver: path.resolve(binaryDir, chromeDriverFileName),
  seleniumJar: path.resolve(binaryDir, config.selenium.jar),
  helperJar: path.resolve(__dirname, 'java', 'webdriversynchelpers', 'dist', 'webdriversynchelpers.jar')
};
