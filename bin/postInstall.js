var async = require('async');
var download = require('download');
var fs = require('fs');
var path = require('path');
var unzip = require('unzip');
var config = require('../config');

var findsChromeDriver = require('../src/helpers/finds-chrome-driver');
var findsIEDriver = require('../src/helpers/finds-ie-driver');
var findsSeleniumJar = require('../src/helpers/finds-selenium-jar');

var chromeConfig = config.binaries.chromedriver;
var ieConfig = config.binaries.iedriver;
var seleniumConfig = config.binaries.selenium;

var chromedriverDownloadUrl = chromeConfig.download.url + chromeConfig.download.name;
var seleniumDownloadUrl = seleniumConfig.download.url + seleniumConfig.download.name;
var ieDownloadUrl = ieConfig.download.url + ieConfig.download.name;

var chromedriver = findsChromeDriver.find();
var iedriver = findsIEDriver.find();
var seleniumJar = findsSeleniumJar.find();

var request;
var cli = require('../src/cli');
var clearLog = cli.clearLog;
var log = cli.log;
var err = cli.err;
var exit = cli.exit;

var tasks = [
  function ensureSelenium(cb){
    if(seleniumJar) {
      log('Found Selenium at ' + seleniumJar + '\n');
      return cb();
    }

    log('Downloading ' + seleniumDownloadUrl + ' to ' + seleniumConfig.binary.path +'\n');

    downloadBinary(seleniumDownloadUrl, seleniumConfig.binary.path, {mode:0644}, cb);
  },
  function ensureChromedriver(cb){
    if(chromedriver) {
      log('Found chromedriver at ' + chromedriver + '\n');
      return cb();
    }

    log('Downloading ' + chromedriverDownloadUrl + ' to ' + chromeConfig.binary.path + '\n');

    downloadBinary(chromedriverDownloadUrl, chromeConfig.binary.path, {mode:0666}, cb);
  },
  function unzipChromedriver(cb){
    var rStream;
    if(!chromedriver){
      rStream = fs.createReadStream(path.resolve(chromeConfig.binary.path, chromeConfig.download.name));
      rStream
        .pipe(unzip.Parse())
        .on('entry', function(entry){
          if(entry.type === 'File'){
            entry.pipe(fs.createWriteStream(
              path.resolve(chromeConfig.binary.path, entry.path),
              {mode:0775}
             ));
          }
        })
        .on('error', function(error){
          cb(error);
        })
        .on('close', function(){
          cb();
        });
    }
  }
];

if(config.isWin){
  tasks.push(function ensureIEDriver(cb){
    if(iedriver) {
      log('Found iedriver at ' + iedriver + '\n');
      return cb();
    }

    log('Downloading ' + ieDownloadUrl + ' to ' + ieConfig.binary.path + '\n');

    downloadBinary(ieDownloadUrl, ieConfig.binary.path, {mode:0666}, cb);
  });
  tasks.push(function unzipIEDriver(cb){
    var rStream;
    if(!iedriver){
      rStream = fs.createReadStream(path.resolve(ieConfig.binary.path, ieConfig.download.name));
      rStream
        .pipe(unzip.Parse())
        .on('entry', function(entry){
          if(entry.type === 'File'){
            entry.pipe(fs.createWriteStream(
              path.resolve(ieConfig.binary.path, entry.path),
              {mode:0775}
             ));
          }
        })
        .on('error', function(error){
          cb(error);
        })
        .on('close', function(){
          cb();
        });
    }
  });
}

async.series(tasks, function(error, results){
  if(error){
    err('The following error occurred:');
    err(error);
    exit(1);
  }
});


function downloadBinary(url, dest, opts, cb){
  var contentLength;
  var amountDownloaded=0;

  if(!fs.existsSync(dest)){
    fs.mkdirSync(dest);
  }

  request = download(url, dest, opts);

  request.on('response', function(res){
    contentLength = parseInt(res.headers['content-length']);
  });

  request.on('error', function(error){
    cb(new Error(error));
  });

  request.on('data', function(data){
    amountDownloaded+=data.length;
    clearLog('Status: '+amountDownloaded+' of '+contentLength);
  });

  request.on('close', function(){
    log('Finished downloading '+url+'\n');
    cb();
  });
}
