import { by, browser, element } from 'protractor';
import { LoginPage } from './pages/login.e2e-spec';
import { TemplatesPage } from './pages/templates.e2e-spec';

describe('Fiwoo Frontend E2E Test Suite', () => {
  browser.ignoreSynchronization = true;

  const loginPage = new LoginPage();
  describe('Login page should work fine', () => {
    var loginURL;

    beforeAll((done) => {
      loginPage.navigateToPage();
      browser.driver.sleep(1000);
      browser.getCurrentUrl().then(function(url){
        loginURL = url;
        done();
      });
    });

    it('Should have right title', (done) => {
      loginPage.getPageTitle()
        .then((title: string) => {
          expect(title).toEqual('Fiwoo');
          done();
        });
    });

    it('Should fill form', (done) => {
      var usernameInput = loginPage.getUsernameInput();
      var passwordInput = loginPage.getPasswordInput();

      loginPage.fillField(usernameInput, 'test@test.com', () => {
        browser.driver.sleep(1000);
        loginPage.fillField(passwordInput, '12345678',() => {
          browser.driver.sleep(1000);
          done();
        });
      });
    });

    it('Should send form', (done) => {
      loginPage.getSignInButton().click().then(function() {
        browser.driver.sleep(5000);

        browser.getCurrentUrl().then(function(url){
          expect(url).not.toEqual(loginURL);
        });

        return done();
      });
    });
  });

  const templatesPage = new TemplatesPage();
  describe('Templates page should work fine', () => {
    beforeAll((done) => {
      templatesPage.navigateToPage();
      browser.driver.sleep(1000);
      browser.getCurrentUrl().then(function(url){
        done();
      });
    });

    it('Should have right title', (done) => {
      templatesPage.getPageTitle()
        .then((title: string) => {
          expect(title).toEqual('Fiwoo');
          done();
        });
    });

    it('Should open add form', (done) => {
      expect(templatesPage.getAddModal().isDisplayed()).toBe(false);
      templatesPage.getAddButton().click().then(function() {
        browser.driver.sleep(1000);
        expect(templatesPage.getAddModal().isDisplayed()).toBe(true);
        done();
      });
    });

    it('Should fill form', (done) => {
      var templateNameInput = templatesPage.getTemplateNameInput();
      var entityTypeInput = templatesPage.getEntityTypeInput();
      var protocolSelectRadio = templatesPage.getProtocolSelectRadio();

      templatesPage.fillField(templateNameInput, 'Test template name', () => {
        browser.driver.sleep(1000);
        templatesPage.fillField(entityTypeInput, 'Test entity type', () => {
          browser.driver.sleep(1000);
          templatesPage.pickRadio(protocolSelectRadio, 0, () => {
            browser.driver.sleep(1000);
            done();
          });
        });
      });
    });

    it('Should add property', (done) => {
      var choosePropertySelect = templatesPage.getChoosePropertySelect();
      var objectIdInput = templatesPage.getObjectIdInput();
      var propertyNameInput = templatesPage.getPropertyNameInput();
      var propertyTypeInput = templatesPage.getPropertyTypeInput();

      templatesPage.pickSelect(choosePropertySelect, 0, () => {
        browser.driver.sleep(1000);
        templatesPage.fillField(objectIdInput, String(Math.floor(Math.random() * 899) + 101), () => {
          browser.driver.sleep(1000);
          templatesPage.fillField(propertyNameInput, 'Test property name', () => {
            browser.driver.sleep(1000);
            templatesPage.fillField(propertyTypeInput, 'string', () => {
              browser.driver.sleep(1000);
              templatesPage.getAddPropertyButton().click().then(function(){
                element.all(by.css('.property_item')).count().then(function(count){
                  expect(count).toBeGreaterThan(0);
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('Should save form', (done) => {
      expect(templatesPage.getAddModal().isDisplayed()).toBe(true);
      templatesPage.getSaveButton().click().then(function() {
        browser.driver.sleep(2000);
        expect(templatesPage.getAddModal().isDisplayed()).toBe(false);
        done();
      });
    });
  });
});
