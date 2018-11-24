import { browser, by, element } from 'protractor';

export class RatingsPage {
  navigateTo() {
    return browser.get('/ratings/1');
  }
}

