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
var Class                   = require('../imports').File;
var Instance                = require('../classes/Instance');
var assert                  = require('../assert');

module.exports=File;

function File(first, child){
   var file;
   var len = arguments.length;

   if(assert(first).isInstanceof(Instance).isValid){
      file=first._instance;
   } else if(len === 1){
      assert(first).isString().throws(
         "The argument must be a pathname as a string."
      );
      file = new Class(first);
   } else if(len === 2){
      assert(child).isString().throws(
         "The second argument must be a string."
      );
      if(assert.isString(first)){
         file = new Class(first, child);
      } else {
         assert(first).isInstanceof(File).throws(
            "The first argument must be a File."
         );
         file = new Class(first._instance, child);
      }
   } else {
      throw new Error("Expected 1 or 2 arguments but found: "+len);
   }

   addFinalProp(this, "_instance", file);
}

//FIELDS
File.pathSeparator     = File.prototype.pathSeparator     = Class.pathSeperator;
File.pathSeparatorChar = File.prototype.pathSeparatorChar = Class.pathSeparatorChar;
File.separator         = File.prototype.separator         = Class.separator;
File.separatorChar     = File.prototype.separatorChar     = Class.separatorChar;

//TODO finsh
//METHODS


File.prototype.canExecute=function(){
   return this._instance.canExecuteSync();
};
File.prototype.canRead=function(){
   return this._instance.canReadSync();
};
File.prototype.canWrite=function(){
   return this._instance.canWriteSync();
};
File.prototype.compareTo=function(pathname){
   assert(pathname).isInstanceof(File).throws(
      "Pathname must be an instance of File."
   );
   return this._instance.compareToSync(pathname);
};
File.prototype.createNewFile=function(){
   return this._instance.createNewFileSync();
};
File.prototype.createTempFile=function(prefix, suffix){

   assert(pathname).isInstanceof(File).throws(
      "Pathname must be an instance of File."
   );
   return this._instance.compareToSync(pathname);
   555asdf
};
static File	createTempFile(String prefix, String suffix)
static File	createTempFile(String prefix, String suffix, File directory)
boolean	delete()
void	deleteOnExit()
boolean	equals(Object obj)
boolean	exists()
File	getAbsoluteFile()
String	getAbsolutePath()
File	getCanonicalFile()
String	getCanonicalPath()
long	getFreeSpace()
String	getName()
String	getParent()
File	getParentFile()
String	getPath()
long	getTotalSpace()
long	getUsableSpace()
int	hashCode()
boolean	isAbsolute()
boolean	isDirectory()
boolean	isFile()
boolean	isHidden()
long	lastModified()
long	length()
String[]	list()
String[]	list(FilenameFilter filter)
File[]	listFiles()
File[]	listFiles(FileFilter filter)
File[]	listFiles(FilenameFilter filter)
static File[]	listRoots()
boolean	mkdir()
boolean	mkdirs()
boolean	renameTo(File dest)
boolean	setExecutable(boolean executable)
boolean	setExecutable(boolean executable, boolean ownerOnly)
boolean	setLastModified(long time)
boolean	setReadable(boolean readable)
boolean	setReadable(boolean readable, boolean ownerOnly)
boolean	setReadOnly()
boolean	setWritable(boolean writable)
boolean	setWritable(boolean writable, boolean ownerOnly)
String	toString()