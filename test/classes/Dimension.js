'use strict';

describe('Dimension', function(){
  var Dimension = require('../../src/classes/Dimension');
  it('is a constructor', function(){
    new Dimension();
  });

  describe('#getHeight', function(){
    it('returns the height of the Dimension', function(){
      var dimension = new Dimension(15, 20);
      dimension.getHeight().should.equal(20);
    });
  });

  describe('#getWidth', function(){
    it('returns the width of the Dimension', function(){
      var dimension = new Dimension(15, 20);
      dimension.getWidth().should.equal(15);
    });
  });
});
