var fs = require('fs'),
    staticDependencyPaths = require('./../static-dependency-paths'),
    envPath = process.env.SELENIUM_SERVER_STANDALONE_JAR;

module.exports = {
  find: function(){
    if(envPath && fs.existsSync(envPath)) {
      return envPath;
    } else if(fs.existsSync(staticDependencyPaths.seleniumJar)) {
      return staticDependencyPaths.seleniumJar;
    }
  },
  errorMessage: [
    "webdriver-sync requires the Selenium standalone server jar.",
    "  We looked, but couldn't find it at:",
    "    - $SELENIUM_SERVER_STANDALONE_JAR (" + envPath + ")",
    "    - `" + staticDependencyPaths.seleniumJar + "`",
    "",
    "A suggested download URL is:"
    + "https://code.google.com/p/selenium/downloads/list",
    ""
  ].join("\n"),

};
