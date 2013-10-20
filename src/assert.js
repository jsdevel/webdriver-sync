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

var assert=function(proposal){
   return {
      isInstanceof:function(clazz){
         this.isValid=assert.isInstanceof(proposal, clazz);

         return {
            throws:throws,
            or:function(clazz){
               if(this.isValid)return this;
               this.isValid=assert.isInstanceof(proposal, clazz);
               return this;
            },
            and:function(clazz){
               if(!this.isValid)return this;
               this.isValid=assert.isInstanceof(proposal, clazz);
               return this;
            }
         };
      },
      isNumber:function(){
         this.isValid=assert.isNumber(proposal);

         return {
            throws:throws,
            or:function(number){
               if(this.isValid)return this;
               this.isValid=assert.isNumber(number);
               return this;
            },
            and:function(number){
               if(!this.isValid)return this;
               this.isValid=assert.isNumber(number);
               return this;
            }
         };
      }
   };
};

assert.isNumber=function(number){
   return typeof number === 'number';
};

assert.isString=function(str){
   return typeof str === 'string';
};

assert.isInstanceof=function(proposal, clazz){
   if(proposal instanceof clazz){
      return true;
   }
   return false;
};

function throws(err){
   if(!this.isValid){
      throw new Error(err);
   }
}

module.exports=assert;