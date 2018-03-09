import { element, browser, by } from 'protractor';

export class LoginPage {
  navigateToPage() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getSignInButton() {
    return element(by.css('.btn-login'));
  }

  getUsernameInput() {
    return element(by.name('username'));
  }

  getPasswordInput() {
    return element(by.name('password'));
  }

  fillField(field, value, done:() => void) {
    field.clear();
    field.sendKeys(value);
    field.getAttribute('value').then(function(text) {
      expect(text).toEqual(value);
      done();
    });
  }
}
