import { AppPage } from './app.po';
import {$, $$, browser, by, element, protractor} from "protractor";

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display 6 emotionSelection ratings with header', () => {
    page.navigateTo();

    browser.wait(function() {
      return element(by.css('.recommendation')).isPresent();
    }, 5000);

    expect(element(by.css('h1')).getText()).toBe('Recommendations');

    let recommendationHeaders = element.all(by.css('.recommendation-header'));
    expect(recommendationHeaders.count()).toBe(6);
    expect(recommendationHeaders.getText()).toContain('Fear');
    expect(recommendationHeaders.getText()).toContain('Happiness');
    expect(recommendationHeaders.getText()).toContain('Disgust');
    expect(recommendationHeaders.getText()).toContain('Sadness');
    expect(recommendationHeaders.getText()).toContain('Anger');
    expect(recommendationHeaders.getText()).toContain('Surprise');
  });
});
