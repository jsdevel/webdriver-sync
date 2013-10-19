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
var Map                = require('./imports').helpers.Map;

var addFinalProp=function(obj, prop, val){
   if(val){
      Object.defineProperty(obj, prop, {get:function(){return val;}});
   }
};
var collectionToArray=function(collection, mapper){
   var size = collection.sizeSync();
   var i;
   var array=[];
   var _mapper=typeof mapper === 'function' ?
                        mapper :
                        function(item){return item;};
   for(i=0;i<size;i++){
      array.push(
         _mapper(collection.getSync(i))
      );
   }
   return array;
};
function fakeInstace(Class, _instance){
   var response;
   function _Class(){}
   _Class.prototype=Class.prototype;
   response = new _Class();
   addFinalProp(response, "_instance", _instance);
   return response;
}
function extend(Child, Parent){
   extendAll(Child, Parent);
}
function extendAll(){
   var args = toArray(arguments);
   var len=args.length;
   var Child=args[0];
   var i;
   var extended={};
   var prototype;
   var prop;
   if(!len){
      return;
   }
   for(i=len-1;i>-1;i--){
      prototype=args[i].prototype;
      for(prop in prototype){
         if(prototype.hasOwnProperty(prop)){
            extended[prop] = prototype[prop];
         }
      }
   }
   Child.prototype=extended;
   Child.prototype.constructor=Child;
}
function mapToObject(map, mapper){
   var keys = map.keySetSync();
   var len  = keys.size();
   var i;
   var key;
   var obj={};
   var _mapper = typeof mapper === 'function'
      ?mapper
      :function(item){return item;};
   for(i=0;i<len;i++){
      key=keys.getSync(i);
      obj[key] = _mapper(map.getSync(key));
   }
   return obj;
}
function objectToMap(obj){
   var key;
   var map = Map.createWithStringKeys();
   for(key in obj){
      if(obj.hasOwnProperty(key)){
         map.set(key, obj[key]);
      }
   }
   return map;
}
function toArray(arr){
   return Array.prototype.slice.call(arr);
}
function toStringArray(arr){
   return toArray(arr).map(function(v){
      return (new String(v)).toString();
   });
}
module.exports.addFinalProp=addFinalProp;
module.exports.collectionToArray=collectionToArray;
module.exports.extend=extend;
module.exports.extendAll=extendAll;
module.exports.fakeInstance=fakeInstance;
module.exports.mapToObject=mapToObject;
module.exports.objectToMap=objectToMap;
module.exports.toArray=toArray;
module.exports.toStringArray=toStringArray;