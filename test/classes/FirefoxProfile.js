'use strict';

describe('FirefoxProfile', function() {
  var FirefoxProfile = require('../../src/classes/FirefoxProfile');

  it('should have a PORT_PREFERENCE', function() {
    FirefoxProfile.PORT_PREFERENCE.should.equal('webdriver_firefox_port');
  });

  it('should have fromJSON and toJSON methods', function(){
    var profile = new FirefoxProfile();
    var json = profile.toJSON();
    json.should.be.type('string');
    profile.fromJSON(json).toJSON().should.equal(json);
  });

  it('can set preferences', function(){
    var profile = new FirefoxProfile();

    profile.setPreference('foo', 5);
    profile.setPreference('foo', 'asdf');
    profile.setPreference('foo', true);
  });
});