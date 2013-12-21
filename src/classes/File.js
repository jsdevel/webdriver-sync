var Class = require('../imports').File;
var Long = require('../imports').Long;
var Instance = require('../classes/Instance');
var addFinalProp = require('../utils').addFinalProp;
var assert = require('../assert');

module.exports = File;

function File(first, child) {
  var file;
  var len = arguments.length;

  if (assert(first).isInstanceof(Instance).isValid) {
    file = first._instance;
  } else if (len === 1) {
    assert(first).isString().throws(
      "The argument must be a pathname as a string."
      );
    file = new Class(first);
  } else if (len === 2) {
    assert(child).isString().throws(
      "The second argument must be a string."
      );
    if (assert.isString(first)) {
      file = new Class(first, child);
    } else {
      assert(first).isInstanceof(File).throws(
        "The first argument must be a File."
        );
      file = new Class(first._instance, child);
    }
  } else {
    throw new Error("Expected 1 or 2 arguments but found: " + len);
  }

  addFinalProp(this, "_instance", file);
}

//FIELDS
File.pathSeparator =
  File.prototype.pathSeparator =
  Class.pathSeperator;
File.pathSeparatorChar =
  File.prototype.pathSeparatorChar =
  Class.pathSeparatorChar;
File.separator =
  File.prototype.separator =
  Class.separator;
File.separatorChar =
  File.prototype.separatorChar =
  Class.separatorChar;

File.prototype.canExecute = function() {
  return this._instance.canExecuteSync();
};

File.prototype.canRead = function() {
  return this._instance.canReadSync();
};

File.prototype.canWrite = function() {
  return this._instance.canWriteSync();
};

File.prototype.compareTo = function(pathname) {
  assert(pathname).isInstanceof(File).throws(
    "Pathname must be an instance of File."
    );
  return this._instance.compareToSync(pathname);
};

File.prototype.createNewFile = function() {
  return this._instance.createNewFileSync();
};

File.createTempFile = File.prototype.createTempFile = function(
  prefix,
  suffix,
  directory
  ) {
  assert(prefix)
    .isString()
    .throws("Prefix must be a string.  Found: " + prefix);
  assert(suffix)
    .isString()
    .throws("Suffix must be a string.  Found: " + suffix);
  if (arguments.length === 3) {
    assert(directory).isInstanceof(File).throws(
      "The directory must be an instance of File"
      );
    return new File(new Instance(this._instance.createTempFileSync(
      prefix,
      suffix,
      directory._instance
      )));
  }
  return new File(new Instance(this._instance.createTempFileSync(
    prefix,
    suffix
    )));
};

File.prototype.delete = function() {
  return this._instance.deleteSync();
};

File.prototype.deleteOnExit = function() {
  return this._instance.deleteOnExitSync();
};


File.prototype.equals = function(obj) {
  if (obj && "_instance" in obj) {
    return this._instance.equalsSync(obj._instance);
  }
  return false;
};

File.prototype.exists = function() {
  return this._instance.existsSync();
};

File.prototype.getAbsoluteFile = function() {
  return new File(new Instance(this._instance.getAbsoluteFileSync()));
};

File.prototype.getAbsolutePath = function() {
  return this._instance.getAbsolutePathSync();
};

File.prototype.getCanonicalFile = function() {
  return new File(new Instance(this._instance.getCanonicalFileSync()));
};

File.prototype.getCanonicalPath = function() {
  return this._instance.getCanonicalPathSync();
};

File.prototype.getFreeSpace = function() {
  return this._instance.getFreeSpaceSync();
};

File.prototype.getName = function() {
  return this._instance.getNameSync();
};

File.prototype.getParent = function() {
  return this._instance.getParentSync();
};

File.prototype.getParentFile = function() {
  return new File(new Instance(this._instance.getParentFileSync()));
};

File.prototype.getPath = function() {
  return this._instance.getPathSync();
};

File.prototype.getTotalSpace = function() {
  return this._instance.getTotalSpaceSync();
};

File.prototype.getUsableSpace = function() {
  return this._instance.getUsableSpaceSync();
};

File.prototype.isAbsolute = function() {
  return this._instance.isAbsoluteSync();
};

File.prototype.isDirectory = function() {
  return this._instance.isDirectorySync();
};

File.prototype.isFile = function() {
  return this._instance.isFileSync();
};

File.prototype.isHidden = function() {
  return this._instance.isHiddenSync();
};

File.prototype.lastModified = function() {
  return this._instance.lastModifiedSync();
};

File.prototype.length = function() {
  return this._instance.lengthSync();
};

File.prototype.list = function() {
  return this._instance.listSync();
};

File.prototype.listFiles = function() {
  return this._instance.listFilesSync().map(function(v) {
    return new File(new Instance(v));
  });
};

File.prototype.listRoots = function() {
  return this._instance.listRootsSync().map(function(v) {
    return new File(new Instance(v));
  });
};

File.prototype.mkdir = function() {
  return this._instance.mkdirSync();
};

File.prototype.mkdirs = function() {
  return this._instance.mkdirsSync();
};

File.prototype.renameTo = function(dest) {
  assert(dest).isInstanceof(File).throws(
    "Destination must be an instance of File."
    );
  return this._instance.renameToSync(dest._instance);
};

File.prototype.setExecutable = function(executable, ownerOnly) {
  if (assert.isBool(ownerOnly)) {
    return this._instance.setExecutableSync(!!executable, !!ownerOnly);
  } else {
    return this._instance.setExecutableSync(!!executable);
  }
};

File.prototype.setLastModified = function(time) {
  return this._instance.setLastModifiedSync(new Long(time));
};

File.prototype.setReadable = function(readable, ownerOnly) {
  if (assert.isBool(ownerOnly)) {
    return this._instance.setReadableSync(!!readable, !!ownerOnly);
  } else {
    return this._instance.setReadableSync(!!readable);
  }
};

File.prototype.setReadOnly = function() {
  return this._instance.setReadOnlySync();
};

File.prototype.setWritable = function(writable, ownerOnly) {
  if (assert.isBool(ownerOnly)) {
    return this._instance.setWritableSync(!!writable, !!ownerOnly);
  } else {
    return this._instance.setWritableSync(!!writable);
  }
};

File.prototype.toString = function() {
  return this._instance.toStringSync();
};