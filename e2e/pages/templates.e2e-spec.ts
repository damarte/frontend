import { element, browser, by } from 'protractor';

export class TemplatesPage {
  navigateToPage() {
    return browser.get('/#/pages/templates');
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getAddButton() {
    return element(by.css('.btn-add'));
  }

  getAddModal() {
    return element(by.css('.add-template'));
  }

  getSaveButton() {
    return element(by.css('.btn-save'));
  }

  getTemplateNameInput() {
    return element(by.name('template_name'));
  }

  getEntityTypeInput() {
    return element(by.name('entity_type'));
  }

  getProtocolSelectRadio() {
    return element(by.css('.protocol_select'));
  }

  getChoosePropertySelect() {
    return element(by.name('choose_property'));
  }

  getObjectIdInput() {
    return element(by.name('object_id'));
  }

  getPropertyNameInput() {
    return element(by.name('property_name'));
  }

  getPropertyTypeInput() {
    return element(by.name('property_type'));
  }

  getAddPropertyButton() {
    return element(by.name('btn-add-property'));
  }

  fillField(field, value, done:() => void) {
    field.clear();
    field.sendKeys(value);
    field.getAttribute('value').then(function(text) {
      expect(text).toEqual(value);
      done();
    });
  }

  pickRadio(field, index, done:() => void) {
    var option = field.all(by.css('.radio_option')).get(index);
    option.click();
    done();
  }

  pickSelect(field, index, done:() => void) {
    field.click().then(function(text) {
      var option = element.all(by.css('.select_option')).get(index);
      option.click();
      done();
    })
  }
}
