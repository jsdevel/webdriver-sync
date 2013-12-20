/*!
 * Copyright 2013 Joseph Spencer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function() {//prevent IDE's from adding these vars globally
  var javaHome = process.env['JAVA_HOME'];
  var os = require('os');
  var path = require('path');
  var fs = require('fs');
  var isWin = /^win/i.test(os.platform());
  var binaryDir = path.resolve(
    process.env[isWin ? 'USERPROFILE' : 'HOME'],
    '.webdriver-sync'
  );
  var pathToChromeDriver = path.resolve(binaryDir, 'chromedriver' + (isWin ? ".exe" : ""));
  var pathToSeleniumServerStandalone = path.resolve(binaryDir, 'selenium-server-standalone.jar');
  var hasMissingBinary = false;

  if (!fs.existsSync(pathToChromeDriver)) {
    hasMissingBinary = true;
    showObtainBinaryMsg(
      pathToChromeDriver,
      "https://code.google.com/p/chromedriver/downloads/list"
    );
  } else {
    log("Found: " + pathToChromeDriver);
    log("");
  }

  if (!fs.existsSync(pathToSeleniumServerStandalone)) {
    hasMissingBinary = true;
    showObtainBinaryMsg(
      pathToSeleniumServerStandalone,
      "https://code.google.com/p/selenium/downloads/list"
    );
  } else {
    log("Found: " + pathToSeleniumServerStandalone);
    log("");
  }

  if (hasMissingBinary || !isJavaValid()) {
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
      "binaryDir is: " + binaryDir,
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
  function showObtainBinaryMsg(binary, suggested) {
    err("The following binary wasn't found: " + binary);
    log("");
    err("A suggested download URL is: " + suggested);
    log("");
  }
}();
