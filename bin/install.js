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
!function(){//prevent IDE's from adding these vars globally
var javaHome=process.env['JAVA_HOME'];
var os = require('os');
var path = require('path');
var fs = require('fs');
var isWin=/win/.test(os.platform());
var binaryDir = path.resolve(
   process.env[isWin ? 'USERPROFILE':'HOME'],
   '.webdriver-sync'
);
log("");
log("Preparing to validate your environment.");
log("JAVA_HOME is: "+javaHome);
log("binaryDir is: "+binaryDir);
log("");
var arch=os.arch().replace(/[^0-9]/g, "");
var pathToChromeDriver=path.resolve(binaryDir,'chromedriver'+(isWin?".exe":""));
var pathToSeleniumServerStandalone=path.resolve(binaryDir, 'selenium-server-standalone.jar');
var hasMissingBinary=false;

validateJava();

if(!fs.existsSync(pathToChromeDriver)){
   hasMissingBinary=true;
   showObtainBinaryMsg(
      pathToChromeDriver,
      "https://code.google.com/p/chromedriver/downloads/list"
   );
} else {
   log("Found: "+pathToChromeDriver);
   log("");
}
if(!fs.existsSync(pathToSeleniumServerStandalone)){
   hasMissingBinary=true;
   showObtainBinaryMsg(
      pathToSeleniumServerStandalone,
      "https://code.google.com/p/selenium/downloads/list"
   );
} else {
   log("Found: "+pathToSeleniumServerStandalone);
   log("");
}
if(hasMissingBinary){
   exit();
}

function validateJava(){
   var pathToLibJvm;
   if(!javaHome){
      err("JAVA_HOME isn't set!  The java module can't build without it.");
      err("You must set this first before installing.");
      err("Exiting...");
      exit();
   }
   if(isWin){
      pathToLibJvm=path.resolve(
         javaHome, 'jre', 'bin', 'server', 'jvm.dll'
      );
   } else {
      switch(arch){
      //TODO add other archs here as need requires.
      case "64":
         pathToLibJvm=path.resolve(
            javaHome, 'jre', 'lib', 'amd64', 'server', 'libjvm.so'
         );
         break;
      case "32":
         pathToLibJvm=path.resolve(
            javaHome, 'jre', 'lib', 'i386', 'server', 'libjvm.so'
         );
         break;
      default:
         err("Your architecture isn't supported yet by this module!");
         err("The architecture was listed as: "+arch);
         showForkItToFixAndExit();
      }
   }

   if(!fs.existsSync(pathToLibJvm)){
      err("libjvm.so wasn't found using '"+pathToLibJvm+"'.");
      err("Verify that $JAVA_HOME is set correctly and try again.");
      exit();
   }
}
function log(msg){
   console.log(msg);
}
function err(msg){
   console.error(msg);
}
function exit(code){
   process.exit(code || 1);
}
function showObtainBinaryMsg(binary, suggested){
   err("The following binary wasn't found: "+binary);
   log("");
   err("A suggested download URL is: "+suggested);
   log("");
}
function showForkItToFixMsg(msg){
   err("This should be a simple fix in the bin/preinstall.js script.");
   err("See if you can fix it, or file an issue on the github issues page.");
   err("I'd love to see you fork and issue a pull request :P");
   exit();
}
}();