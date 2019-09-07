/**
 * Test for Index page.
 */

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

test.describe("Index-Page", function() {
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

  function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
      assert.ok(url.endsWith(target));
    });
  }

  test.it("Checks Home Navigation and if it renders propperly.", function(done) {
    matchUrl('/');
    goToNavLink("Home");
    matchUrl('/');    

    done();
  });

  test.it("Checks the value of page title.", function(done) {
    browser.getTitle().then(function(title) {
      assert.equal(title, 'WTC | Martinborg.me');
    });

    done();
  });
});
