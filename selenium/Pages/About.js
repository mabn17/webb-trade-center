/**
 * Test for About page.
 */

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;
const timeoutOne = 100000;
const timeoutTwo = 30000;

test.describe("About-Page", function() {
  test.beforeEach(function(done) {
    this.timeout(timeoutOne);
    browser = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox()).build();

    browser.get("http://localhost:3000/");
    done();
  });

  test.afterEach(function(done) {
    browser.quit();
    done();
  });


  function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
      element.click();
    });
  }

  function hasLink(target) {
    browser.findElement(By.linkText(target)).then(function(element) {
      assert.ok(element);
    });
  }

  function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
      assert.ok(url.endsWith(target));
    });
  }

  function assertTitle(target, type) {
    browser.findElement(By.css(type)).then(function(element) {
      element.getText().then(function(text) {
        assert.equal(text, target);
      });
    });
  }

  test.it("Checks Navigation to About", function(done) {
    browser.wait(() => {
      return browser.executeScript('return document.readyState').then((state) => {
        return state === 'complete';
      });
    });
    goToNavLink("About us");
    this.timeout(timeoutTwo);
    matchUrl('about');
    done();
  });

  test.it("Checks if the markdown file has renderd propperly", function(done) {
    browser.wait(() => {
      return browser.executeScript('return document.readyState').then((state) => {
        return state === 'complete';
      });
    });
    goToNavLink("About us");
    this.timeout(timeoutTwo);
    hasLink('Frontend');
    hasLink('Backend');
    assertTitle('Webb Trade Center', 'h6');
    done();
  });
});
