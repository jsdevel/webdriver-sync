'use strict';

describe('ChromeOptions', function(){
  var ChromeOptions = require('../../').ChromeOptions;

  it('should have a setExperimentalOption method', function(){
    var options = new ChromeOptions();
    options.setExperimentalOption('asdf', 'asdf');
  });
});
