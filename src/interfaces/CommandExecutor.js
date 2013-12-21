var addFinalProp = require('../utils').addFinalProp;
var Command = require('../classes/Command');
var Instance = require('../classes/Instance');
var Response = require('../classes/Response');

module.exports = CommandExecutor;

function CommandExecutor(instance) {
  addFinalProp(this, "_instance", instance);
}
CommandExecutor.prototype.execute = function(command) {
  if (!(command instanceof Command)) {
    throw new Error("command must be an instance of Command");
  }
  return new Response(
    new Instance(this._instance.executeSync(command._instance))
    );
};