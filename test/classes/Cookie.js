'use strict';

describe('Cookie', function() {
  var assert;
  var path;
  var wd;
  var driver;
  var modulePath;
  var By;
  var Cookie;
  var options;

  before(function() {
    assert = require('assert');
    path = require('path');
    modulePath = path.resolve(__dirname, '..', '..', 'src', 'webdriver-sync');
    wd = require(modulePath);
    //wd.importTo(this);
    By = wd.By;
    Cookie = wd.Cookie;
    driver = require('../lib/driver').driver;
    options = driver.manage();
    options.deleteAllCookies();
    driver.get('http://www.google.com');
  });

  after(function() {
    driver.quit();
  });

  beforeEach(function() {
    options.deleteAllCookies();
  });

  it('should fail when creating a cookie without a name', function() {
    assert.throws(function() {
      new Cookie();
    });
  });

  it('should fail when creating a cookie without a value', function() {
    assert.throws(function() {
      new Cookie('asdf');
    });
  });

  it('should accept 2 arguments', function() {
    var cookie = new Cookie('asdf', 'dan');
    assert.equal(cookie.getName(), 'asdf');
    assert.equal(cookie.getValue(), 'dan');
    assert.equal(cookie.getPath(), '/');
    assert.equal(cookie.getDomain(), null);
    assert.equal(cookie.getExpiry(), null);
    assert.equal(cookie.isSecure(), false);
  });

  it('should accept 3 arguments', function() {
    var cookie = new Cookie('asdf', 'dan', '/asdf');
    assert.equal(cookie.getName(), 'asdf');
    assert.equal(cookie.getValue(), 'dan');
    assert.equal(cookie.getPath(), '/asdf');
    assert.equal(cookie.getDomain(), null);
    assert.equal(cookie.getExpiry(), null);
    assert.equal(cookie.isSecure(), false);
  });

  it('should accept 4 arguments', function() {
    var date = new Date(Date.now() + 10000);
    var cookie = new Cookie('asdf', 'dan', '/asdf', date);
    assert.equal(cookie.getName(), 'asdf');
    assert.equal(cookie.getValue(), 'dan');
    assert.equal(cookie.getPath(), '/asdf');
    assert.equal(cookie.getDomain(), null);
    assert.equal(
      cookie.getExpiry().getTime(),
      date.getTime() - (date.getTime() % 1000)
    );
    assert.equal(cookie.isSecure(), false);
  });

  it('should accept 5 arguments', function() {
    var date = new Date(Date.now() + 10000);
    var cookie = new Cookie('asdf', 'dan', 'asdf.com', '/asdf', date);
    assert.equal(cookie.getName(), 'asdf');
    assert.equal(cookie.getValue(), 'dan');
    assert.equal(cookie.getPath(), '/asdf');
    assert.equal(cookie.getDomain(), 'asdf.com');
    assert.equal(
      cookie.getExpiry().getTime(),
      date.getTime() - (date.getTime() % 1000)
    );
    assert.equal(cookie.isSecure(), false);
  });

  it('should accept 6 arguments', function() {
    var date = new Date(Date.now() + 10000);
    var cookie = new Cookie('asdf', 'dan', 'asdf.com', '/asdf', date, true);
    assert.equal(cookie.getName(), 'asdf');
    assert.equal(cookie.getValue(), 'dan');
    assert.equal(cookie.getPath(), '/asdf');
    assert.equal(cookie.getDomain(), 'asdf.com');
    assert.equal(
      cookie.getExpiry().getTime(),
      date.getTime() - (date.getTime() % 1000)
    );
    assert.equal(cookie.isSecure(), true);
  });

  it('should allow us to work with cookies', function() {
    var cookie;
    var options = driver.manage();
    assert.equal(options.getCookieNamed('jack'), null);

    //test 2 arguments
    cookie = new Cookie('_2', '2');
    options.addCookie(cookie);
    assert.equal(options.getCookieNamed('_2').getValue(), '2');

    //test 3 arguments and path
    driver.get('http://www.google.com/news/');
    cookie = new Cookie('_3', '3', '/news');
    options.addCookie(cookie);
    assert.equal(options.getCookieNamed('_3').getValue(), '3');
    assert.equal(options.getCookieNamed('_3').getPath(), '/news');

    //test 4 arguments
    cookie = new Cookie('_4', '4', '/', new Date(Date.now() + 30000));
    options.addCookie(cookie);
    driver.navigate().refresh();
    assert.equal(
      options.getCookieNamed('_4').getExpiry().getTime(),
      cookie.getExpiry().getTime(),
      'cookie added via options'
      );

    //test 4 arguments
    cookie = new Cookie('_neg4', 'neg4', '/', null);
    options.addCookie(cookie);

    //test 5 arguments
    cookie = new Cookie(
      '_5',
      '5',
      'maps.google.com',
      '/',
      new Date(Date.now() + (3600 * 1000))
    );
    assert.throws(function() {
      options.addCookie(cookie);
    }, 'allowed to add a cookie for a different domain.');

    options.deleteCookie(cookie);
    options.deleteCookieNamed('_5');
    options.deleteAllCookies();
    assert(!options.getCookieNamed('_5'), 'deleting cookies failed.');
  });

  it('sets secure cookies', function() {
    var cookie;
    driver.get('http://www.google.com/news/');
    //test 6 arguments
    cookie = new Cookie(
      '_6',
      '6',
      '.google.com',
      '/',
      new Date(Date.now() + (3600 * 1000)),
      true
    );
    options.addCookie(cookie);
    driver.findElement(By.partialLinkText('Sign')).click();
    assert.equal(options.getCookieNamed('_6').isSecure(), true);
  });
});
