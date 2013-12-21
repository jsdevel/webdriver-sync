!function() {//prevent IDE's from adding these vars globally
  var download = require('download');
  var fs = require('fs');
  var config = require('../config');
  var staticDependencyPaths = require('./../src/static-dependency-paths');
  var binaryDir = staticDependencyPaths.binaryDir;
  var findsSeleniumJar = require('./../src/lib/finds-selenium-jar');
  var seleniumDownloadUrl = config.selenium.url + config.selenium.jar;
  var seleniumJar = findsSeleniumJar.find()
  var request;
  var cli = require('../src/lib/cli');
  var clearLog = cli.clearLog;
  var log = cli.log;
  var err = cli.err;
  var exit = cli.exit;
  
  if(seleniumJar) {
    log("Found standalone Selenium server jar: " + seleniumJar + "\n")
  } else {
    downloadSeleniumJar();
  }

  function downloadSeleniumJar(){
    var contentLength;
    var amountDownloaded=0;

    log("Downloading " + seleniumDownloadUrl + " to " + binaryDir+"\n");

    if(!fs.existsSync(binaryDir)){
      fs.mkdirSync(binaryDir);
    }

    request = download(seleniumDownloadUrl, binaryDir, {mode:0644});

    request.on("response", function(res){
      contentLength = parseInt(res.headers['content-length']);
    });

    
    request.on("error", function(error){
      err("The following error occurred:");
      err(error);
      exit(1);
    });

    request.on("data", function(data){
      amountDownloaded+=data.length;
      clearLog("Status: "+amountDownloaded+" of "+contentLength);
    });

    request.on("close", function(){
      log("Finished downloading selenium jar");
    });
  }
}();
