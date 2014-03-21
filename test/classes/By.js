'use strict';

describe('By', function() {
  var assert = require('assert');
  var path = require('path');
  var driver = require(path.resolve(__dirname, '..', 'lib', 'driver')).driver;
  var By = require(
      path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync')
    ).By;


  beforeEach(function() {
    driver.get('http://getbootstrap.com');
  });

  after(function(){
    driver.quit();
  });

  describe('#className', function() {
    it('can be used', function() {
      driver.findElements(By.className('navbar')).length.should.equal(1);
    });
  });

  describe('#cssSelector', function() {
    it('can be used', function() {
      driver.findElements(By.cssSelector('body')).length.should.equal(1);
    });
  });

  describe('#id', function() {
    it('can be used', function() {
      driver.findElements(By.id('content')).length.should.equal(1);
    });
  });

  describe('#linkText', function() {
    it('can be used', function() {
      driver.findElements(By.linkText('GitHub')).length.should.equal(1);
    });
  });


  describe('#name', function() {
    it('can be used', function() {
      driver.findElements(By.name('viewport')).length.should.equal(1);
    });
  });

  describe('#partialLinkText', function() {
    it('can be used', function() {
      driver.findElements(
        By.partialLinkText('Download')
      ).length.should.equal(1);
    });
  });

  describe('#tagName', function() {
    it('can be used', function() {
      driver.findElements(By.tagName('div')).length.should.be.above(1);
    });
  });

  describe('#xpath', function() {
    it('can be used', function() {
      driver.findElements(By.xpath('//div')).length.should.be.above(1);
    });
  });
});
