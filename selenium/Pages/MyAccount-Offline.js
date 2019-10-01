/**
 * Test for About page.
 */

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");

let browser;

test.describe("MyAccount-Page", function() {
  test.beforeEach(function(done) {
    this.timeout(20000);
    browser = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox()).build();

    browser.get("http://localhost:3000/account");
    done();
  });

  test.afterEach(function(done) {
    browser.quit();
    done();
  });

  function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
      assert.ok(url.endsWith(target));
    });
  }

  test.it("Should be redirected to login", function(done) {
    browser.wait(() => {
      return browser.executeScript('return document.readyState').then((state) => {
        return state === 'complete';
      });
    });
    this.timeout(25000);
    matchUrl('login');
    done();
  });
});
