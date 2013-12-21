!function() {//prevent IDE's from adding these vars globally
  var javaHome = process.env['JAVA_HOME'];
  var path = require('path');
  var fs = require('fs');
  var staticDependencyPaths = require('./../src/static-dependency-paths');
  var cli = require('../src/lib/cli');
  var log = cli.log;
  var err = cli.err;
  var exit = cli.exit;

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

    log("Preparing to validate your environment.");
    log("JAVA_HOME is: " + javaHome);
    log("binaryDir is: " + staticDependencyPaths.binaryDir);

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
}();
