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
   obj[prop]=val;
};
var collectionToArray=function(collection, mapper){
   var size = collection.sizeSync();
   var i;
   var array=[];
   var item;
   var _mapper=typeof mapper === 'function' ?
                        mapper :
                        function(item){return item;};
   for(i=0;i<size;i++){
      item=collection.getSync(i);
      array.push(
         _mapper(item)
      );
   }
   return array;
};

function extend(Child, Parent){
   var prop;
   var __extends;

   if(!Child.__extends){
      Child.__extends=Child.prototype.__extends={};
   }

   for(prop in Parent){
      if(!(prop in Child)){
         Child[prop] = Parent[prop];
      }
   }
   for(prop in Parent.prototype){
      if(!(prop in Child.prototype)){
         Child.prototype[prop] = Parent.prototype[prop];
      }
   }
   Child.__extends[Parent.name]=true;
}
function extendAll(){
   var args = toArray(arguments);
   var Child = args.splice(0,1)[0];
   var len=args.length;
   var i;
   if(!len){
      return;
   }

   for(i=0;i<len;i++){
      extend(Child, args[i]);
   }
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
         map.setSync(key, obj[key]);
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
module.exports.mapToObject=mapToObject;
module.exports.objectToMap=objectToMap;
module.exports.toArray=toArray;
module.exports.toStringArray=toStringArray;