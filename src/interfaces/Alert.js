/*!
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
var Credentials  = require('./Credentials');
var addFinalProp = require('../utils').addFinalProp;

module.exports=Alert;

function Alert(instance){
   addFinalProp(this, "_instance", instance);
}
Alert.prototype.accept=function(){
   this._instance.acceptSync();
};
Alert.prototype.authenticateUsing=function(credentials){
   if(!(credentials instanceof Credentials)){
      throw new Error("Expected to see an instance of Credentials.");
   }
   this._instance.authenticateUsingSync(credentials._instance);
};
Alert.prototype.dismiss=function(){
   this._instance.dismissSync();
};
Alert.prototype.getText=function(){
   return this._instance.getTextSync();
};
Alert.prototype.sendKeys=function(string){
   this._instance.sendKeysSync(string);
};