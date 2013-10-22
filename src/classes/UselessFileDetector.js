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
var Class                 = require('../imports').UselessFileDetector;
var FileDetector          = require('./classes/FileDetector');
var Instance              = require('./Instance');
var extendAll               = require('../utils').extendAll;
var addFinalProp            = require('../utils').addFinalProp;

extendAll(UselessFileDetector, FileDetector);

function UselessFileDetector(instance){
   if(assert(instance).isInstanceof(Instance).isValid){
      instance = instance._instance;
   } else {
      instance = new Class();
   }
   addFinalProp(this, "_instance", instance);
}