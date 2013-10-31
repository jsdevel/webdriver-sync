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
var addFinalProp                = require('../utils').addFinalProp;
var Class                       = require('../imports').Response;
var SessionId                   = require('./SessionId');
var Instance                    = require('./Instance');

module.exports=Response;

function Response(sessionId){
   var instance;
   if(assert(sessionId).isInstanceof(SessionId).isValid){
      instance = new Class(sessionId._instance);
   } else if(assert(sessionId).isInstanceof(Instance).isValid){
      instance = sessionId._instance;
   } else {
      instance = new Class();
   }
   addFinalProp(this, "_instance", instance);
}

Response.prototype.getSessionId=function(){
   return this._instance.getSessionIdSync();
};
Response.prototype.getState=function(){
   return this._instance.getStateSync();
};
Response.prototype.getStatus=function(){
   return this._instance.getStatusSync();
};
Response.prototype.getValue=function(){
   return this._instance.getValueSync();
};
Response.prototype.setSessionId=function(stringSessionId){
   return this._instance.setSessionIdSync(stringSessionId);
};
Response.prototype.setState=function(stringState){
   return this._instance.setStateSync(stringState);
};
Response.prototype.setStatus=function(stringStatus){
   return this._instance.setStatusSync(stringStatus);
};
Response.prototype.setValue=function(value){
   return this._instance.setValueSync(value);
};
Response.prototype.toString=function(){
   return this._instance.toStringSync();
};