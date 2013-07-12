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
var arch=os.arch().replace(/[^0-9]/g, "");
var libDir=path.resolve(process.cwd(), 'lib');
var pathToChromeDriver=path.resolve(libDir, 'chromedriver');
var pathToSeleniumServerStandalone=path.resolve(libDir, 'selenium-server-standalone.jar');
var hasMissingBinary=false;

validateJava();

if(!fs.existsSync(pathToChromeDriver)){
   hasMissingBinary=true;
   showObtainBinaryMsg(
      pathToChromeDriver,
      "https://code.google.com/p/chromedriver/downloads/list"
   );
}
if(!fs.existsSync(pathToSeleniumServerStandalone)){
   hasMissingBinary=true;
   showObtainBinaryMsg(
      pathToSeleniumServerStandalone,
      "https://code.google.com/p/selenium/downloads/list"
   );
}
if(hasMissingBinary){
   exit();
}

function validateJava(){
   var pathToLibJvmSo;
   if(!javaHome){
      err("JAVA_HOME isn't set!  The java module can't build without it.");
      err("You must set this first before installing.");
      err("Exiting...");
      exit();
   }
   switch(arch){
   //TODO add other archs here as need requires.
   case "64":
      pathToLibJvmSo=path.resolve(
         javaHome, 'jre', 'lib', 'amd64', 'server', 'libjvm.so'
      );
      break;
   case "32":
      pathToLibJvmSo=path.resolve(
         javaHome, 'jre', 'lib', 'i386', 'server', 'libjvm.so'
      );
      break;
   default:
      err("Your architecture isn't supported yet by this module!");
      err("The architecture was listed as: "+arch);
      showForkItToFixAndExit();
   }

   if(!fs.statSync(pathToLibJvmSo).isFile()){
      err("libjvm.so wasn't found using '"+pathToLibJvmSo+"'.");
      err("Verify that $JAVA_HOME is set correctly and try again.");
      exit();
   }
}
function err(msg){
   console.error(msg);
}
function exit(code){
   process.exit(code || 1);
}
function showObtainBinaryMsg(binary, suggested){
   err("The following binary wasn't found: "+binary);
   err("A suggested download URL is: "+suggested);
}
function showForkItToFixMsg(msg){
   err("This should be a simple fix in the bin/preinstall.js script.");
   err("See if you can fix it, or file an issue on the github issues page.");
   err("I'd love to see you fork and issue a pull request :P");
   exit();
}
}();