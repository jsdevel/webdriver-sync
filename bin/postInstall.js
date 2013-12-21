!function() {//prevent IDE's from adding these vars globally
  var async = require('async');
  var download = require('download');
  var fs = require('fs');
  var path = require('path');
  var unzip = require('unzip');
  var config = require('../config');
  var staticDependencyPaths = require('./../src/static-dependency-paths');
  var binaryDir = staticDependencyPaths.binaryDir;
  var findsChromeDriver = require('./../src/lib/finds-chrome-driver');
  var findsSeleniumJar = require('./../src/lib/finds-selenium-jar');
  var chromedriverZip = (function(){
    var token;

    switch(process.platform){
      case 'linux':
        if(/64$/.test(process.arch)){
          token = 'linux64';
        } else {
          token = 'linux32';
        }
        break;
      case 'darwin':
        token = 'mac32';
        break;
      default:
        token = 'win32';
        break;
    }

    return config.chromedriver.zip.replace("${arch}", token);
  })();
  var chromedriverDownloadUrl = config.chromedriver.url+chromedriverZip;
  var seleniumDownloadUrl = config.selenium.url + config.selenium.jar;
  var chromedriver = findsChromeDriver.find()
  var seleniumJar = findsSeleniumJar.find()
  var request;
  var cli = require('../src/lib/cli');
  var clearLog = cli.clearLog;
  var log = cli.log;
  var err = cli.err;
  var exit = cli.exit;
  

  async.series([
    function ensureSelenium(cb){
      if(seleniumJar) {
        log("Found standalone Selenium server jar: " + seleniumJar + "\n")
        return cb();
      }

      log("Downloading " + seleniumDownloadUrl + " to " + binaryDir+"\n");

      downloadBinary(seleniumDownloadUrl, {mode:0644}, cb);
    },
    function ensureChromedriver(cb){
      if(chromedriver) {
        log("Found chromedriver: " + chromedriver + "\n")
        return cb();
      }

      log("Downloading " + chromedriverDownloadUrl + " to " + binaryDir+"\n");

      downloadBinary(chromedriverDownloadUrl, {mode:0666}, cb);
    },
    function unzipChromedriver(cb){
      var rStream;
      if(!chromedriver){
        rStream = fs.createReadStream(path.resolve(binaryDir, chromedriverZip));
        rStream
          .pipe(unzip.Parse())
          .on("entry", function(entry){
            if(entry.type === 'File'){
              entry.pipe(fs.createWriteStream(
                path.resolve(binaryDir, entry.path),
                {mode:0775}
               ));
            }
          })
          .on("error", function(error){
            cb(error); 
          })
          .on("close", function(){
            cb();
          }); 
      }
    }
  ], function(error, results){
    if(error){
      err("The following error occurred:");
      err(error);
      exit(1);
    }
  });


  function downloadBinary(url, opts, cb){
    var contentLength;
    var amountDownloaded=0;

    if(!fs.existsSync(binaryDir)){
      fs.mkdirSync(binaryDir);
    }

    request = download(url, binaryDir, opts);

    request.on("response", function(res){
      contentLength = parseInt(res.headers['content-length']);
    });
    
    request.on("error", function(error){
      cb(new Error(error))
    });

    request.on("data", function(data){
      amountDownloaded+=data.length;
      clearLog("Status: "+amountDownloaded+" of "+contentLength);
    });

    request.on("close", function(){
      log("Finished downloading "+url+"\n");
      cb();
    });
  }
}();
