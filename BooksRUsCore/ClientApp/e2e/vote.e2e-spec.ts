import {VotePage} from "./vote.po";
import {browser, by, element} from "protractor";

describe('Vote', () => {
  let page: VotePage;

  beforeEach(function () {
    page = new VotePage();
  });

  it('should display a book and scroll to next', function () {
    page.navigateTo();

    browser.wait(function() {
      return element(by.css('title')).isPresent();
    }, 5000);

    const title1 = element(by.css('title')).getText();
    element(by.css('.next-book')).click();
    const title2 = element(by.css('title')).getText();
    expect(title1).not.toBe(title2);
  });
});
