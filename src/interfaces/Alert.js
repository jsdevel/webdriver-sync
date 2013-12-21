var Credentials = require('./Credentials');
var addFinalProp = require('../utils').addFinalProp;

module.exports = Alert;

function Alert(instance) {
  addFinalProp(this, "_instance", instance);
}
Alert.prototype.accept = function() {
  this._instance.acceptSync();
};
Alert.prototype.authenticateUsing = function(credentials) {
  if (!(credentials instanceof Credentials)) {
    throw new Error("Expected to see an instance of Credentials.");
  }
  this._instance.authenticateUsingSync(credentials._instance);
};
Alert.prototype.dismiss = function() {
  this._instance.dismissSync();
};
Alert.prototype.getText = function() {
  return this._instance.getTextSync();
};
Alert.prototype.sendKeys = function(string) {
  this._instance.sendKeysSync(string);
};