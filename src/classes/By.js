'use strict';

var Class = require('../imports').By;
var addFinalProp = require('../utils').addFinalProp;

module.exports = By;

function By(instance) {
  addFinalProp(this, '_instance', instance);
}

By.prototype.className = function(name) {
  return new By(Class.classNameSync(name));
};

By.prototype.cssSelector = function(selector) {
  return new By(Class.cssSelectorSync(selector));
};

By.prototype.id = function(id) {
  return new By(Class.idSync(id));
};

By.prototype.linkText = function(linkText) {
  return new By(Class.linkTextSync(linkText));
};

By.prototype.name = function(name) {
  return new By(Class.nameSync(name));
};

By.prototype.partialLinkText = function(partialLinkText) {
  return new By(Class.partialLinkTextSync(partialLinkText));
};

By.prototype.tagName = function(tagName) {
  return new By(Class.tagNameSync(tagName));
};

By.prototype.xpath = function(xpath) {
  return new By(Class.xpathSync(xpath));
};