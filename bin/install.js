!function() {//prevent IDE's from adding these vars globally
  var javaHome = process.env['JAVA_HOME'];
  var path = require('path');
  var fs = require('fs');
  var staticDependencyPaths = require('./../src/static-dependency-paths');
  var findsSeleniumJar = require('./../src/lib/finds-selenium-jar');

  var seleniumJar = findsSeleniumJar.find()
  if(seleniumJar) {
    console.log("Found standalone Selenium server jar: " + seleniumJar + "\n")
  } else {
    console.warn(findsSeleniumJar.errorMessage)
  }

  if (!isJavaValid()) {
    exit();
  }

  function isJavaValid() {
    var potentialLibJvmLocations = [
      'jre\\bin\\server\\jvm.dll',
      'jre/lib/amd64/server/libjvm.so',
      'jre/lib/i386/server/libjvm.so',
      'jre/lib/server/libjvm.dylib'
    ];
    var proposedPathToLibJvm;
    var pathToLibJvm;

    log([
      "",
      "Preparing to validate your environment.",
      "JAVA_HOME is: " + javaHome,
      "binaryDir is: " + staticDependencyPaths.binaryDir,
      ""
    ].join('\n'));

    if (!javaHome) {
      err("JAVA_HOME isn't set!  The java module can't build without it.");
      err("You must set this first before installing.");
      err("Exiting...");
      return false;
    }

    while (potentialLibJvmLocations.length) {
      proposedPathToLibJvm = path.resolve(javaHome, potentialLibJvmLocations.shift());
      if (fs.existsSync(proposedPathToLibJvm)) {
        pathToLibJvm = proposedPathToLibJvm;
        break;
      }
    }

    if (!pathToLibJvm || !fs.existsSync(pathToLibJvm)) {
      err("libjvm.so wasn't found using '" + pathToLibJvm + "'.");
      err("Verify that $JAVA_HOME is set correctly and try again.");
      return false;
    }
    return true;
  }
  function log(msg) {
    console.log(msg);
  }
  function err(msg) {
    console.error(msg);
  }
  function exit(code) {
    process.exit(code || 1);
  }
}();
