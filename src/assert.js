'use strict';

module.exports = assert;

function assert(proposal) {
  return {
    extends: function(clazz) {
      this.isValid = assert.extends(proposal, clazz);

      return {
        isValid: this.isValid,
        throws: throws,
        or: function(clazz) {
          if (this.isValid)
            return this;
          this.isValid = assert.extends(proposal, clazz);
          return this;
        },
        and: function(clazz) {
          if (!this.isValid)
            return this;
          this.isValid = assert.extends(proposal, clazz);
          return this;
        }
      };
    },
    isNumber: function() {
      this.isValid = assert.isNumber(proposal);

      return {
        isValid: this.isValid,
        throws: throws,
        or: function(number) {
          if (this.isValid)
            return this;
          this.isValid = assert.isNumber(number);
          return this;
        },
        and: function(number) {
          if (!this.isValid)
            return this;
          this.isValid = assert.isNumber(number);
          return this;
        }
      };
    },
    isString: function() {
      this.isValid = assert.isString(proposal);

      return {
        isValid: this.isValid,
        throws: throws,
        or: function(string) {
          if (this.isValid)
            return this;
          this.isValid = assert.isString(string);
          return this;
        },
        and: function(string) {
          if (!this.isValid)
            return this;
          this.isValid = assert.isString(string);
          return this;
        }
      };
    }
  };
}
;

assert.extends = function(instance, Constructor) {
  try {
    return instance instanceof Constructor
      || !!instance.__extends[Constructor.name];
  } catch (e) {
    return false;
  }
};

assert.isBool = function(bool) {
  return typeof bool === 'boolean';
};

assert.isNumber = function(number) {
  return typeof number === 'number';
};

assert.isString = function(str) {
  return typeof str === 'string';
};

function throws(err) {
  if (!this.isValid) {
    throw new Error(err);
  }
}