'use strict';

describe('OutputType', function() {
  var assert = require('assert');
  var path = require('path');
  var OutputType = require(
    path.resolve(__dirname, '..', '..', 'src', 'interfaces', 'OutputType')
  );
  var wd = require(
    path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
  );

  it('is available from webdriver-sync', function() {
    assert.equal(wd.OutputType, OutputType);
  });
});