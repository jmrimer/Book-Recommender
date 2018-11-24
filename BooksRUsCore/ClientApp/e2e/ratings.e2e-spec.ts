import {RatingsPage} from "./ratings.po";
import {browser, by, element} from "protractor";

describe('Ratings', function () {
  let page: RatingsPage;

  beforeEach(() => {
    page = new RatingsPage();
  });

  it('should display the emotion title and rated books for the emotion', () => {
    page.navigateTo();

    browser.wait(() => {
      return element(by.css('.emotion-header')).isPresent();
    }, 5000);

    expect(element(by.css('.emotion-header')).getText()).toBe('Top-rated books that invoke anger');
    expect(element.all(by.css('.book')).count()).toBeGreaterThan(0);
    expect(element(by.css('.ranking')).getText()).toBe('1');
  });
});
