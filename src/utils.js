var Map = require('./imports').helpers.Map;

var addFinalProp = function(obj, prop, val) {
  obj[prop] = val;
};
var collectionToArray = function(collection, mapper) {
  var array = [];
  var _mapper = typeof mapper === 'function'
    ? mapper
    : function(item) {
      return item;
    };

  if (collection) {
    array = collection.toArraySync().map(_mapper);
  }

  return array;
};

function extend(Child, Parent) {
  var prop;

  if (!Child.__extends) {
    Child.__extends = Child.prototype.__extends = {};
  }

  for (prop in Parent) {
    if (!(prop in Child)) {
      Child[prop] = Parent[prop];
    }
  }
  for (prop in Parent.prototype) {
    if (!(prop in Child.prototype)) {
      Child.prototype[prop] = Parent.prototype[prop];
    }
  }
  Child.__extends[Parent.name] = true;
}
function extendAll() {
  var args = toArray(arguments);
  var Child = args.splice(0, 1)[0];
  var len = args.length;
  var i;
  if (!len) {
    return;
  }

  for (i = 0; i < len; i++) {
    extend(Child, args[i]);
  }
}
function mapToObject(map, mapper) {
  var keys = map.keySetSync();
  var len = keys.size();
  var i;
  var key;
  var obj = {};
  var _mapper = typeof mapper === 'function'
    ? mapper
    : function(item) {
      return item;
    };
  for (i = 0; i < len; i++) {
    key = keys.getSync(i);
    obj[key] = _mapper(map.getSync(key));
  }
  return obj;
}
function objectToMap(obj) {
  var key;
  var map = Map.createWithStringKeysSync();
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.putSync(key, obj[key]);
    }
  }
  return map;
}

function objectToMapStringString(obj) {
  var key;
  var map = Map.createWithStringKeysStringValuesSync();
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.putSync(""+key, ""+obj[key]);
    }
  }
  return map;
}

function toArray(arr) {
  return Array.prototype.slice.call(arr);
}
function toStringArray(arr) {
  return toArray(arr).map(function(v) {
    return (new String(v)).toString();
  });
}
module.exports.addFinalProp = addFinalProp;
module.exports.collectionToArray = collectionToArray;
module.exports.extend = extend;
module.exports.extendAll = extendAll;
module.exports.mapToObject = mapToObject;
module.exports.objectToMap = objectToMap;
module.exports.objectToMapStringString = objectToMapStringString;
module.exports.toArray = toArray;
module.exports.toStringArray = toStringArray;