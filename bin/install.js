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
var pathToLibJvmSo;
var os = require('os');
var path = require('path');
var fs = require('fs');
var exec=require('child_process').exec;
var arch=os.arch().replace(/[^0-9]/g, "");
var platform=os.platform().replace(/[^a-z]/gi, "");
var modulePath=path.resolve(__dirname, "..");
var chromeDriverVersion=process.env.npm_package_config_chromedriverVersion;

validateSystem();//sets pathToLibJvmSo on success

if(process.argv[2] === "pre"){//preinstall
   if(!javaHome){
      err("JAVA_HOME isn't set!  The java module can't build without it.");
      err("You must set this first before installing.");
      err("Exiting...");
      exit();
   }
   if(!fs.statSync(pathToLibJvmSo).isFile()){
      err("libjvm.so wasn't found using '"+pathToLibJvmSo+"'.");
      err("Verify that $JAVA_HOME is set correctly and try again.");
      exit();
   }
   return;
}
//postinstall
if(typeof chromeDriverVersion !== 'string'){
   err("\"config.chromedriverVersion\" wasn't defined in package.json.");
   err("Chrome will not be available without this defined.");
} else {
   !function(){
      var pathToChromeDriverSource=path.resolve(
         modulePath, 'lib', 'drivers', 'chrome',
         chromeDriverVersion.replace(/\./g, "_"),
         'chromedriver'+(
            platform === 'linux'?
               "_linux"+arch:
            platform === 'mac'?
               "_mac":
            ".exe"
         )
      );
      var pathToChromeDriver=path.resolve(modulePath, 'lib', 'chromedriver');
      var command=(platform === 'win'?"copy /b ":"cp ")+
         pathToChromeDriverSource+' '+pathToChromeDriver;
      exec(command, function(error, stdout, stderr){
         if(error){
            err("Something happened while copying the chromedriver.");
            err("The command used was: \""+command+"\"");
            err(error);
         }
      });
   }();
}
function validateSystem(){
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
      showForkItToFixAndExit();
   }
   switch(platform){
      //TODO add support for platforms as required.
      case "linux":
         break;
      default:
         err("You're platform isn't supported yet.");
         showForkItToFixAndExit();
   }
}
function err(msg){
   console.error(msg);
}
function exit(code){
   process.exit(code || 1);
}
function showForkItToFixMsg(msg){
   err("This should be a simple fix in the bin/preinstall.js script.");
   err("See if you can fix it, or file an issue on the github issues page.");
   err("I'd love to see you fork and issue a pull request :P");
   exit();
}
}();