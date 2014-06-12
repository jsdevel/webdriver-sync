'use strict';

describe('LoggingPreferences', function(){
  var wd = require('../../');
  var LoggingPreferences = wd.LoggingPreferences;
  var Level = wd.Level;

  it('should be instantiable', function(){
    new LoggingPreferences();
  });

  describe('.addPreferences()', function(){
    it('should create preferences', function(){
      var pref1 = new LoggingPreferences();
      var pref2 = new LoggingPreferences();
      var pref3 = pref1.addPreferences(pref2);

      pref3.should.not.equal(pref1);
      pref3.should.not.equal(pref2);
    });
  });

  describe('.enable()', function(){
    it('should enable the preference', function(){
      var prefs = new LoggingPreferences();
      prefs.enable('performance', Level.SEVERE);
      prefs.getLevel('performance').toString().should.equal('SEVERE');
    });
  });

  describe('.getEnabledTypes()', function(){
    it('should return enabled types', function(){
      var prefs = new LoggingPreferences();
      prefs.getEnabledLogTypes().length.should.equal(0);
      prefs.enable('performance', Level.INFO);
      prefs.getEnabledLogTypes()[0].should.equal('performance');
    });
  });
});
