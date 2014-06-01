'use strict';

var async = require('async');
var exec = require('child_process').exec;
var packageJson = require('./package');
var path = require('path');
var os = require('os');
var mkdirp = require('mkdirp');
var cli = require('./src/cli');
var arch = os.arch();
var platform = os.platform();
var is64 = /x64/i.test(arch);
var isWin = /^win/i.test(platform);
var isMac = /^dar/i.test(platform);
var home = process.env.HOME || process.env.USERPROFILE;
var webDriverSyncBinaryPath = process.env.WEBDRIVER_SYNC_BINARY_PATH
  || path.resolve(home, '.webdriver-sync');
var NO_HOME_VAR_FOUND_IN_ENV=1;
var UNABLE_TO_ENABLE_PROTECTED_MODE_FOR_IE=2;

if(!home){
  cli.err('Neither of HOME or USERPROFILE were set in the env!');
  cli.exit(NO_HOME_VAR_FOUND_IN_ENV);
}

module.exports = {
  webDriverSyncBinaryPath: webDriverSyncBinaryPath,
  helperJar: path.resolve(
    __dirname,
    './src/java/webdriversynchelpers/dist/webdriversynchelpers.jar'
  ),
  isWin: isWin,
  binaries: {
    selenium: {
      download: {
        name: 'selenium-server-standalone-2.41.0.jar',
        url: 'http://selenium-release.storage.googleapis.com/2.41/'
      },
      binary: {
        name: 'selenium-server-standalone-2.41.0.jar',
        path: path.resolve(webDriverSyncBinaryPath, 'selenium-2.41.0')
      }
    },
    chromedriver: {
      download: {
        name: 'chromedriver_'
          + ( isWin
              ? 'win32'
              : ( isMac
                  ? 'mac32'
                  : ( is64
                      ? 'linux64'
                      : 'linux32'
                    )
                )
            )
          + '.zip',
        url:'http://chromedriver.storage.googleapis.com/2.10/'
      },
      binary: {
        name: 'chromedriver' + ( isWin ? '.exe' : ''),
        path: path.resolve(webDriverSyncBinaryPath, 'chromedriver-2.10')
      }
    },
    iedriver: {
      download: {
        name: 'IEDriverServer_'
          + ( is64
              ? 'x64'
              : 'Win32'
            )
          + '_2.41.0.zip',
        url:'http://selenium-release.storage.googleapis.com/2.41/'
      },
      binary: {
        name: 'IEDriverServer.exe',
        path: path.resolve(webDriverSyncBinaryPath, 'iedriver-2.41.0')
      }
    }
  }
};

Object.keys(module.exports.binaries)
  .forEach(function(resource){
    var path = module.exports.binaries[resource].binary.path;
    mkdirp.sync(path);
  });

if(isWin){
  async.parallel([
    prepareEnableProtectedModeFor(0),
    prepareEnableProtectedModeFor(1),
    prepareEnableProtectedModeFor(2),
    prepareEnableProtectedModeFor(3),
    prepareEnableProtectedModeFor(4)
  ], function(err){
    if(err){
      cli.err('Unable to enable protected mode for internet explorer!');
      cli.err('Please report this at ' + packageJson.bugs.url);
      cli.err(err.message);
      cli.err(err.stack);
      cli.exit(UNABLE_TO_ENABLE_PROTECTED_MODE_FOR_IE);
    }
  });
}

function prepareEnableProtectedModeFor(zone){
  return function enableProtectedModeForZone(cb){
    exec(
      'reg '
      + 'add '
      + '"HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Zones\\' + zone + '" '
      + '/t REG_DWORD '
      + '/v 2500 '
      + '/d 0 '
      + '/f'
      , cb
    );
  };
}
