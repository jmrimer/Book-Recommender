import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecommendationComponent} from './recommendation.component';
import {By} from "@angular/platform-browser";
import {BookComponent} from "../book/book.component";
import {Recommendation} from "./recommendation";
import {Emotion} from "../emotion/emotion";
import {Book} from "../book/book";

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;
  let recommendation: Recommendation;

  beforeEach(() => {
    recommendation = new Recommendation(
      new Emotion(1, 'emo'),
      new Book('title', 'author', 'cover')
    );

    TestBed.configureTestingModule({
      declarations: [RecommendationComponent, BookComponent],
    });
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    component.recommendation = recommendation;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a recommendation header', function () {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('emo');
  });

  it('should display a book', function () {
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeTruthy();
  });
});
