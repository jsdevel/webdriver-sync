'use strict';

module.exports = Credentials;

function Credentials() {
}
Credentials.prototype.getUsername = function() {
  return this._username;
};
Credentials.prototype.getPassword = function() {
  return this._password;
};