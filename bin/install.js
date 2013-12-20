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
  var path = require('path');
  var fs = require('fs');
  var staticDependencyPaths = require('./../src/static-dependency-paths');

  complainIfSeleniumJarIsNotFound()

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
    ].toString('\n'));

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
  function complainIfSeleniumJarIsNotFound() {
    if (!fs.existsSync(staticDependencyPaths.seleniumJar)) {
      err("The Selenium standalone server jar is required at runtime, but wasn't found at $SELENIUM_SERVER_STANDALONE_JAR or '" + staticDependencyPaths.seleniumJar + "'");
      log("");
      err("A suggested download URL is: https://code.google.com/p/selenium/downloads/list");
    } else {
      log("Found: " + staticDependencyPaths.seleniumJar);
    }
    log("");
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
