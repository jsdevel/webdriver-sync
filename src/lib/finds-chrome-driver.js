var which = require('which');

module.exports = {
  find: function() {
    try {
      return which.sync("chromedriver");
    } catch(e) {
      return null;
    }
  }
}
