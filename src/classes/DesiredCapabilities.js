/*
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Class                   = require('../imports').DesiredCapabilities;
var Capabilities            = require('../interfaces/Capabilities');
var Instance                = require('../classes/Instance');
var assert                  = require('../assert');
var extendAll               = require('../utils').extendAll;
var addFinalProp            = require('../utils').addFinalProp;

module.exports=DesiredCapabilities;

extendAll(
   DesiredCapabilities,
   Capabilities
);

function DesiredCapabilities(
   capabilities
){
   var instance;
   if(assert(capabilities).isInstanceof(Instance).isValid){
      instance = capabilities._instance;
   }
   addFinalProp(this, "_instance", instance);
}
DesiredCapabilities.android=DesiredCapabilities.prototype.android=function(){
   return new DesiredCapabilities(new Instance(Class.androidSync()));
};
DesiredCapabilities.chrome=DesiredCapabilities.prototype.chrome=function(){
   return new DesiredCapabilities(new Instance(Class.chromeSync()));
};
DesiredCapabilities.firefox=DesiredCapabilities.prototype.firefox=function(){
   return new DesiredCapabilities(new Instance(Class.firefoxSync()));
};
DesiredCapabilities.htmlUnit=DesiredCapabilities.prototype.htmlUnit=function(){
   return new DesiredCapabilities(new Instance(Class.htmlUnitSync()));
};
DesiredCapabilities.htmlUnitWithJs=DesiredCapabilities.prototype.htmlUnitWithJs=function(){
   return new DesiredCapabilities(new Instance(Class.htmlUnitWithJsSync()));
};
DesiredCapabilities.internetExplorer=DesiredCapabilities.prototype.internetExplorer=function(){
   return new DesiredCapabilities(new Instance(Class.internetExplorerSync()));
};
DesiredCapabilities.internetExplorer=DesiredCapabilities.prototype.internetExplorer=function(){
   return new DesiredCapabilities(new Instance(Class.internetExplorerSync()));
};
DesiredCapabilities.ipad=DesiredCapabilities.prototype.ipad=function(){
   return new DesiredCapabilities(new Instance(Class.ipadSync()));
};
DesiredCapabilities.iphone=DesiredCapabilities.prototype.iphone=function(){
   return new DesiredCapabilities(new Instance(Class.iphoneSync()));
};
DesiredCapabilities.opera=DesiredCapabilities.prototype.opera=function(){
   return new DesiredCapabilities(new Instance(Class.operaSync()));
};
DesiredCapabilities.phantomjs=DesiredCapabilities.prototype.phantomjs=function(){
   return new DesiredCapabilities(new Instance(Class.phantomjsSync()));
};
DesiredCapabilities.safari=DesiredCapabilities.prototype.safari=function(){
   return new DesiredCapabilities(new Instance(Class.safariSync()));
};