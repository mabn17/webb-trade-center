/**
 * Test for Register page.
 */

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

test.describe("Register-Page", function() {
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

  test.it("Checks Sign-Up Navigation and if it renders propperly.", function(done) {
    goToNavLink("register");
    matchUrl('register');    

    done();
  });

  test.it("Trys wrong input values (PASSWORD 1) and compares them to error messages", function(done) {
    goToNavLink("register");

    nameAndAction('register');
    assertTitle('Password has to be atleast 4 characters long.', 'h1');

    done();
  });
  

  test.it("Trys wrong input values (PASSWORD 2) and compares them to error messages", function(done) {
    goToNavLink("register");

    nameAndAction('password', 'fill', 'pass');
    nameAndAction('passwordTwo', 'fill', 'passa');
    nameAndAction('register');
    assertTitle('Passwords does not match.', 'h1');

    done();
  });

  test.it("Trys wrong input values (EMAIL 1) and compares them to error messages", function(done) {
    goToNavLink("register");

    nameAndAction('password', 'fill', 'pass');
    nameAndAction('passwordTwo', 'fill', 'pass');
    nameAndAction('email', 'fill', 'email');
    
    nameAndAction('register');
    assertTitle('Invalid email address.', 'h1');

    done();
  });

  test.it("Trys wrong input values (EMAIL 2) and compares them to error messages", function(done) {
    goToNavLink("register");

    nameAndAction('password', 'fill', 'pass');
    nameAndAction('passwordTwo', 'fill', 'pass');
    nameAndAction('email', 'fill', 'email@email');

    nameAndAction('register');
    assertTitle('Invalid email address.', 'h1');
    done();
  });

  test.it("Trys correct input values and compares them to server-error messages", function(done) {
    goToNavLink("register");

    nameAndAction('password', 'fill', 'pass');
    nameAndAction('passwordTwo', 'fill', 'pass');
    nameAndAction('email', 'fill', 'email@email.com');

    nameAndAction('register');
    assertTitle('Could not reach the server', 'h1');
    done();
  });
});
