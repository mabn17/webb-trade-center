/**
 * Test for Login page.
 */

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

const timeoutOne = 45000;
const timeoutTwo = 30000;

test.describe("Login-Page", function() {
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
    browser.findElement(By.id(target)).then(function(element) {
      element.click();
    });
  }

  function nameAndAction(name, action = 'click', text = '') {
    browser.findElement(By.name(name)).then(function(element) {
      if (action === 'fill') {
        element.clear();
        element.sendKeys(text);
      } else {
        element.click();
      }
    });
  }

  function assertTitle(target, type) {
    browser.findElement(By.css(type)).then(function(element) {
      element.getText().then(function(text) {
        assert.equal(text, target);
      });
    });
  }

  function matchUrl(target) {
    browser.getCurrentUrl().then(function(url) {
      assert.ok(url.endsWith(target));
    });
  }

  test.it("Checks Sign-In Navigation and if it renders propperly.", function(done) {
    goToNavLink("login");
    this.timeout(timeoutOne);
    matchUrl('login');
    done();
  });

  test.it("Trys wrong input values (PASSWORD 1) and compares them to error messages", function(done) {
    goToNavLink("login");

    nameAndAction('email', 'fill', 'email@email.com');
    this.timeout(timeoutTwo);
    nameAndAction('password', 'fill', 'p');
    this.timeout(timeoutTwo);
    nameAndAction('login');
    this.timeout(timeoutOne);
    assertTitle('Password has to be atleast 4 characters long.', 'h1');

    done();
  });

  test.it("Trys wrong input values (EMAIL 1) and compares them to error messages", function(done) {
    goToNavLink("login");
    this.timeout(timeoutOne);
    nameAndAction('password', 'fill', 'pass');
    this.timeout(timeoutTwo);
    nameAndAction('email', 'fill', 'email');
    this.timeout(timeoutTwo);
    nameAndAction('login');
    this.timeout(timeoutOne);
    assertTitle('Invalid email address.', 'h1');

    done();
  });

  test.it("Trys wrong input values (EMAIL 2) and compares them to error messages", function(done) {
    goToNavLink("login");
    this.timeout(timeoutOne);
    nameAndAction('password', 'fill', 'pass');
    this.timeout(timeoutTwo);
    nameAndAction('email', 'fill', 'email@email');
    this.timeout(timeoutTwo);
    nameAndAction('login');
    this.timeout(timeoutOne);
    assertTitle('Invalid email address.', 'h1');
    done();
  });

  test.it("Trys correct input values and compares them to server-error messages", function(done) {
    goToNavLink("login");
    this.timeout(timeoutOne);
    nameAndAction('password', 'fill', 'pass');
    this.timeout(timeoutTwo);
    nameAndAction('email', 'fill', 'email@email.com');
    this.timeout(timeoutTwo);
    nameAndAction('login');
    this.timeout(timeoutOne);
    assertTitle('Could not reach the server', 'h1');
    done();
  });
});
