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
var Instance              = require('./Instance');
var Class                 = require('../imports').Cookie;
var DateClass             = require('../imports').Date;
var Long                  = require('../imports').Long;
var addFinalProp          = require('../utils').addFinalProp;
var assert                = require('../assert');

module.exports = Cookie;

function Cookie(
   name,
   value,
   pathOrDomain,
   dateOrPath,
   date,
   isSecure
){
   var _name="";
   var _value="";
   var _domain=null;
   var _path="/";
   var _date=null;
   var _expiry=null;
   var _isSecure=false;

   var cookie;
   var numOfArgs = arguments.length > 6?6:arguments.length;

   if(assert(name).isInstanceof(Instance).isValid){
      cookie = name._instance;
      _name=cookie.getNameSync();
      _value=cookie.getValueSync();
      _domain=cookie.getDomainSync();
      _path=cookie.getPathSync();
      _expiry=cookie.getExpirySync()?
               new Date(cookie.getExpirySync().getTimeSync):
               null;
      _isSecure=cookie.isSecureSync();
   } else {
      validateArgIsString(name, "name");
      validateArgIsString(value, "value");
      _name=name;
      _value=value;
      switch(numOfArgs){
      case 2:
         cookie = new Class(_name, _value);
         break;
      case 3:
         validateArgIsString(pathOrDomain, "path");
         _path=pathOrDomain;
         cookie = new Class(_name, _value, _path);
         break;
      case 4:
         validateArgIsString(pathOrDomain, "path");
         _path=pathOrDomain;
         if(dateOrPath instanceof Date){
            _date=createDate(dateOrPath);
            _expiry=dateOrPath;
         }
         cookie = new Class(_name, _value, _path, _date);
         break;
      case 5:
         validateArgIsString(pathOrDomain, "domain");
         validateArgIsString(dateOrPath, "path");
         _domain=pathOrDomain;
         _path=dateOrPath;
         if(date instanceof Date){
            _date=createDate(date);
            _expiry=date;
         }
         cookie=new Class(_name, _value, _domain, _path, _date);
         break;
      case 6:
         validateArgIsString(pathOrDomain, "domain");
         validateArgIsString(dateOrPath, "path");
         validateArgIsBoolean(isSecure, "isSecure");
         _domain=pathOrDomain;
         _path=dateOrPath;
         if(date instanceof Date){
            _date=createDate(date);
            _expiry=date;
         }
         _isSecure=isSecure;
         cookie = new Class(
            _name,
            _value,
            _domain,
            _path,
            _date?_date:null,
            _isSecure
         );
         break;
      default:
         throw new Error("cookies require a name and a value at minimum.");
      }
   }

   addFinalProp(this, "_instance", cookie);
   addFinalProp(this, "_name", _name);
   addFinalProp(this, "_value", _value);
   addFinalProp(this, "_domain", _domain);
   addFinalProp(this, "_path", _path);
   addFinalProp(this, "_expiry", _expiry);
   addFinalProp(this, "_isSecure", _isSecure);
}

Cookie.prototype.equals=function(comparison){
   if(!(comparison instanceof Cookie)){
      throw new Error("argument must be a cookie");
   }
   return this._instance.equalsSync(comparison._instance);
};
Cookie.prototype.getDomain=function(){
   return this._domain;
};
Cookie.prototype.getExpiry=function(){
   return this._expiry;
};
Cookie.prototype.getName=function(){
   return this._name;
};
Cookie.prototype.getPath=function(){
   return this._path;
};
Cookie.prototype.getValue=function(){
   return this._value;
};
Cookie.prototype.isSecure=function(){
   return this._isSecure;
};
Cookie.prototype.toString=function(){
   return this._instance.toStringSync();
};
Cookie.Builder = Builder;

function Builder(name, value){
   addFinalFor(this, "_name", name);
   addFinalFor(this, "_value", value);
}
Builder.prototype.build=function(){
   var builtCookie;
   var _instance;
   function BuiltCookie(){};
   BuiltCookie.prototype = Cookie.prototype;
   builtCookie = new BuildCookie();
   builtCookie.constructor=Cookie;
   _instance = new Class(
      this._name,
      this._value,
      this._domain||null,
      this._path||null,
      this._date||null,
      this._isSecure||null
   );
   return builtCookie;
};
Builder.prototype.domain=function(host){
   var match=/((?:[^.]+)\.[^.]+)$/.exec(host)
   if(!match){
      throw new Error("host must be a host or domain");
   }
   if(!this._domain){
      addFinalFor(this, "_domain", "."+match[1]);
   }
   return this;
};
Builder.prototype.expiresOn=function(date){
   if(!(date instanceof Date)){
      throw new Error("argument must be a Date");
   }
   if(!this._date){
      addFinalFor(this, "_date", createDate(date));
   }
   return this;
};
Builder.prototype.isSecure=function(isSecure){
   if(!this._isSecure){
      addFinalFor(this, "_isSecure", isSecure);
   }
   return this;
};
Builder.prototype.path=function(path){
   if(!this._path){
      addFinalFor(this, "_path", path);
   }
   return this;
};

function createDate(date){
   var time=date.getTime();
   return new DateClass(new Long(""+time));
}

function validateArgIsBoolean(value, arg){
   if(typeof value !== 'boolean'){
      throw new Error(arg+" must be a boolean.");
   }
}
function validateArgIsString(value, arg){
   if(typeof value !== 'string'){
      throw new Error(arg+" must be a string.");
   }
}