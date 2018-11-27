import {browser} from 'protractor';

export class VoteLibraryPage {
  navigateTo() {
    return browser.get('/votelibrary');
  }
}
