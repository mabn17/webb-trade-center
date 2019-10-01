/**
 * Test for About page.
 */

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

test.describe("About-Page", function() {
  test.beforeEach(function(done) {
    this.timeout(20000);
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
    goToNavLink("About us");
    this.timeout(20000);
    matchUrl('about');
    done();
  });

  test.it("Checks if the markdown file has renderd propperly", function(done) {
    goToNavLink("About us");
    this.timeout(25000);
    hasLink('Frontend');
    hasLink('Backend');
    assertTitle('Webb Trade Center', 'h6');
    done();
  });
});
