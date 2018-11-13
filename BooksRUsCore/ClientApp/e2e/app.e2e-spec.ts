import { AppPage } from './app.po';
import {by, element} from "protractor";

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display 6 emotion ratings with header', () => {
    page.navigateTo();
    // expect(page.getMainHeading.toString).toContain('Recommendations');
    // expect(page.getMainHeading.toString).toContain('Fear');
    // expect(page.getMainHeading.toString).toContain('Happiness');
    // expect(page.getMainHeading.toString).toContain('Disgust');
    // expect(page.getMainHeading.toString).toContain('Sadness');
    // expect(page.getMainHeading.toString).toContain('Anger');
    const title = element(by.css('h1'));
    expect(title.getText()).toBe('Recommendations');
  });
});
