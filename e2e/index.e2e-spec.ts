import { by, browser, element } from 'protractor';
import { TemplatesPage } from './pages/templates.e2e-spec';

describe('Fiwoo Frontend E2E Test Suite', () => {
  browser.ignoreSynchronization = true;

  const templatesPage = new TemplatesPage();
  describe('Templates page should work fine', () => {
    beforeAll(() => {
      templatesPage.getPage();
    });

    it('Should have right title', () => {
      templatesPage.getPageTitle()
        .then((title: string) => {
          expect(title).toEqual('Fiwoo');
        });
    });

    it('Should open add form', () => {
      expect(templatesPage.getAddModal().isDisplayed()).toBe(false);
      templatesPage.getAddButton().click().then(function() {
        expect(templatesPage.getAddModal().isDisplayed()).toBe(true);
      });
    });

    it('Should fill form', () => {
      var templateNameInput = templatesPage.getTemplateNameInput();
      var entityTypeInput = templatesPage.getEntityTypeInput();
      var protocolSelectRadio = templatesPage.getProtocolSelectRadio();

      templatesPage.fillField(templateNameInput, 'Test template name');
      templatesPage.fillField(entityTypeInput, 'Test entity type');
      templatesPage.pickRadio(protocolSelectRadio, 0);
    });

    it('Should add property', () => {
      var choosePropertySelect = templatesPage.getChoosePropertySelect();
      var objectIdInput = templatesPage.getObjectIdInput();
      var propertyNameInput = templatesPage.getPropertyNameInput();
      var propertyTypeInput = templatesPage.getPropertyTypeInput();

      templatesPage.pickSelect(choosePropertySelect, 0);
      templatesPage.fillField(objectIdInput, String(Math.floor(Math.random() * 899) + 101));
      templatesPage.fillField(propertyNameInput, 'Test property name');
      templatesPage.fillField(propertyTypeInput, 'string');

      templatesPage.getAddPropertyButton().click().then(function(){
        element.all(by.css('.property_item')).count().then(function(count){
          expect(count).toBeGreaterThan(0);
        });
      });
    });

    it('Should save form', () => {
      expect(templatesPage.getAddModal().isDisplayed()).toBe(true);
      templatesPage.getSaveButton().click().then(function() {
        browser.driver.sleep(1000);
        expect(templatesPage.getAddModal().isDisplayed()).toBe(false);
      });
    });
  })
})
