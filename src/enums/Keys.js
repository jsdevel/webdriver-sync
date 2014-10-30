'use strict';

var addFinalProp = require('../utils').addFinalProp;
var Class = require('../imports').Keys;
var java = require('java');

module.exports = new Keys();

function Keys(instance){
  if(instance)addFinalProp(this, '_instance', instance);
}

//METHODS
//static
Keys.prototype.chord=function(){
  return Class.chordSync(
    java.newArray(
      'java.lang.String'
      , [].slice.call(arguments).map(function(v){return ''+v;})
    )
  );
};

//see below Keys.prototype.getKeyFromUnicode=getKeyFromUnicode;
Keys.prototype.valueOf=function(name){
  return new Keys(Class.valueOfSync(name));
};

Keys.prototype.values=function(){
  return Class.valuesSync().map(function(key){
    return new Keys(key);
  });
};

//instance
/*
These are buggy, not sure what to do about them
Keys.prototype.charAt=charAt;
Keys.prototype.length=length;
Keys.prototype.subSequence=subSequence;
*/
Keys.prototype.toString=function(){
  return this._instance.toStringSync();
};

//Properties
Keys.prototype.ADD = new Keys(Class.ADD);
Keys.prototype.ALT = new Keys(Class.ALT);
Keys.prototype.ARROW_DOWN = new Keys(Class.ARROW_DOWN);
Keys.prototype.ARROW_LEFT = new Keys(Class.ARROW_LEFT);
Keys.prototype.ARROW_RIGHT = new Keys(Class.ARROW_RIGHT);
Keys.prototype.ARROW_UP = new Keys(Class.ARROW_UP);
Keys.prototype.BACK_SPACE = new Keys(Class.BACK_SPACE);
Keys.prototype.CANCEL = new Keys(Class.CANCEL);
Keys.prototype.CLEAR = new Keys(Class.CLEAR);
Keys.prototype.COMMAND = new Keys(Class.COMMAND);
Keys.prototype.CONTROL = new Keys(Class.CONTROL);
Keys.prototype.DECIMAL = new Keys(Class.DECIMAL);
Keys.prototype.DELETE = new Keys(Class.DELETE);
Keys.prototype.DIVIDE = new Keys(Class.DIVIDE);
Keys.prototype.DOWN = new Keys(Class.DOWN);
Keys.prototype.END = new Keys(Class.END);
Keys.prototype.ENTER = new Keys(Class.ENTER);
Keys.prototype.EQUALS = new Keys(Class.EQUALS);
Keys.prototype.ESCAPE = new Keys(Class.ESCAPE);
Keys.prototype.F1 = new Keys(Class.F1);
Keys.prototype.F10 = new Keys(Class.F10);
Keys.prototype.F11 = new Keys(Class.F11);
Keys.prototype.F12 = new Keys(Class.F12);
Keys.prototype.F2 = new Keys(Class.F2);
Keys.prototype.F3 = new Keys(Class.F3);
Keys.prototype.F4 = new Keys(Class.F4);
Keys.prototype.F5 = new Keys(Class.F5);
Keys.prototype.F6 = new Keys(Class.F6);
Keys.prototype.F7 = new Keys(Class.F7);
Keys.prototype.F8 = new Keys(Class.F8);
Keys.prototype.F9 = new Keys(Class.F9);
Keys.prototype.HELP = new Keys(Class.HELP);
Keys.prototype.HOME = new Keys(Class.HOME);
Keys.prototype.INSERT = new Keys(Class.INSERT);
Keys.prototype.LEFT = new Keys(Class.LEFT);
Keys.prototype.LEFT_ALT = new Keys(Class.LEFT_ALT);
Keys.prototype.LEFT_CONTROL = new Keys(Class.LEFT_CONTROL);
Keys.prototype.LEFT_SHIFT = new Keys(Class.LEFT_SHIFT);
Keys.prototype.META = new Keys(Class.META);
Keys.prototype.MULTIPLY = new Keys(Class.MULTIPLY);
Keys.prototype.NULL = new Keys(Class.NULL);
Keys.prototype.NUMPAD0 = new Keys(Class.NUMPAD0);
Keys.prototype.NUMPAD1 = new Keys(Class.NUMPAD1);
Keys.prototype.NUMPAD2 = new Keys(Class.NUMPAD2);
Keys.prototype.NUMPAD3 = new Keys(Class.NUMPAD3);
Keys.prototype.NUMPAD4 = new Keys(Class.NUMPAD4);
Keys.prototype.NUMPAD5 = new Keys(Class.NUMPAD5);
Keys.prototype.NUMPAD6 = new Keys(Class.NUMPAD6);
Keys.prototype.NUMPAD7 = new Keys(Class.NUMPAD7);
Keys.prototype.NUMPAD8 = new Keys(Class.NUMPAD8);
Keys.prototype.NUMPAD9 = new Keys(Class.NUMPAD9);
Keys.prototype.PAGE_DOWN = new Keys(Class.PAGE_DOWN);
Keys.prototype.PAGE_UP = new Keys(Class.PAGE_UP);
Keys.prototype.PAUSE = new Keys(Class.PAUSE);
Keys.prototype.RETURN = new Keys(Class.RETURN);
Keys.prototype.RIGHT = new Keys(Class.RIGHT);
Keys.prototype.SEMICOLON = new Keys(Class.SEMICOLON);
Keys.prototype.SEPARATOR = new Keys(Class.SEPARATOR);
Keys.prototype.SHIFT = new Keys(Class.SHIFT);
Keys.prototype.SPACE = new Keys(Class.SPACE);
Keys.prototype.SUBTRACT = new Keys(Class.SUBTRACT);
Keys.prototype.TAB = new Keys(Class.TAB);
Keys.prototype.UP = new Keys(Class.UP);
Keys.prototype.ZENKAKU_HANKAKU = new Keys(Class.ZENKAKU_HANKAKU);

//static

/*this appears to be a bug in node-java
function getKeyFromUnicode(key){
  var proposedKey = Class.getKeyFromUnicodeSync(
    java.newChar(key)
  );
  if(!proposedKey)return null;
  return new Keys(proposedKey);
}
*/

//instance
/*
function charAt(index) {
  return this._instance.charAtSync(index);
}

function length(){
  return this._instance.lengthSync();
}

function subSequence(start, end){
  return this._instance.subSequenceSync(start, end);
}
*/

