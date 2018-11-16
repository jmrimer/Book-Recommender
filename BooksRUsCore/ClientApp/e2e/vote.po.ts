import {browser} from 'protractor';

export class VotePage {
  navigateTo() {
    return browser.get('/vote');
  }
}
