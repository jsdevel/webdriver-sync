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
var Class         = require('../imports').TimeUnit;

var TimeUnit={
   get DAYS(){return Class.DAYS;},
   get HOURS(){return Class.HOURS;},
   get MICROSECONDS(){return Class.MICROSECONDS;},
   get MILLISECONDS(){return Class.MILLISECONDS;},
   get MINUTES(){return Class.MINUTES;},
   get NANOSECONDS(){return Class.NANOSECONDS;},
   get SECONDS(){return Class.SECONDS;}
};

module.exports=TimeUnit;
