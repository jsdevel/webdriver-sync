'use strict';

describe('Level', function() {
  var Level = require('../../src/classes/Level');

  it('exposes static properties that are instances of Level', function() {
    [
      'ALL',
      'CONFIG',
      'FINE',
      'FINER',
      'FINEST',
      'INFO',
      'OFF',
      'SEVERE',
      'WARNING'
    ].forEach(function(level){
      Level[level].should.be.an.instanceOf(Level);
    });
  });
});