var Credentials = require('../interfaces/Credentials');
var addFinalProp = require('../utils').addFinalProp;
var extend = require('../utils').extend;
var Class = require('../imports').UserAndPassword;

module.exports = UserAndPassword;

extend(UserAndPassword, Credentials);
function UserAndPassword(username, password) {
  addFinalProp(this, "_username", username);
  addFinalProp(this, "_password", password);
  addFinalProp(this, "_instance", new Class(username, password));
}