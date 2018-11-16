import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {By} from "@angular/platform-browser";
import {RecommendationComponent} from "../recommendation/recommendation.component";
import {BookComponent} from "../book/book.component";
import {Observable} from "rxjs";
import {Emotion} from "../emotion/emotion";
import {Recommendation} from "../recommendation/recommendation";
import {RecommendationService} from "../recommendation/recommendation.service";
import {Book} from "../book/book";

describe('HomeComponent', () => {
  let recommendationServiceStub: Partial<RecommendationService>;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let emotion1: Emotion = new Emotion(1, 'emo1');
  let emotion2: Emotion = new Emotion(2, 'emo2');
  let emotion3: Emotion = new Emotion(3, 'emo3');
  let book1: Book = new Book('title1', 'author1', 'cover1');
  let book2: Book = new Book('title2', 'author2', 'cover2');
  let book3: Book = new Book('title3', 'author3', 'cover3');
  let recommendations: Recommendation[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, RecommendationComponent, BookComponent],
      providers: [
        {provide: RecommendationService, useValue: recommendationServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    recommendations = [
      new Recommendation(emotion1, book1),
      new Recommendation(emotion2, book2),
      new Recommendation(emotion3, book3),
    ];

    recommendationServiceStub = {
      getRecommendations: () => {
        return Observable.of(recommendations);
      }
    };

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.recommendations = [new Recommendation(emotion1, book1)];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a page title', function () {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toBe('Recommendations');
  });

  it('should display a recommendation for each recommendation', function () {
    component.recommendations = recommendations;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.directive(RecommendationComponent)).length).toBe(3);
  });

  it('should retrieve emotion rankings from its service on initialization', function () {
    component.ngOnInit();
    expect(component.recommendations).toEqual(recommendations);
  });
});

