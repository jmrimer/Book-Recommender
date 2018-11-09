import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {By} from "@angular/platform-browser";
import {RecommendationComponent} from "../recommendation/recommendation.component";
import {BookComponent} from "../book/book.component";
import {EmotionService} from "../emotion.service";
import {Observable} from "rxjs";
import {Emotion} from "../emotion";

describe('HomeComponent', () => {
  let emotionServiceStub: Partial<EmotionService>;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  emotionServiceStub = {
    getEmotions: () => {
      return Observable.of([
        new Emotion(1, 'emo1'),
        new Emotion(2, 'emo2'),
        new Emotion(3, 'emo3'),
      ]);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, RecommendationComponent, BookComponent],
      providers: [
        {provide: EmotionService, useValue: emotionServiceStub}
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a page title', function () {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toBe('Recommendations');
  });

  it('should display a recommendation for each emotion', function () {
    expect(fixture.debugElement.queryAll(By.directive(RecommendationComponent)).length).toBe(3);
  });

  it('should retrieve emotions from its service on initialization', function () {
    // spyOn(emotionService, 'getEmotions').and.returnValue(Observable.of([{emotionid: 1, emotion: 'emo1'}]));
    component.ngOnInit();
    // expect(emotionService.getEmotions).toHaveBeenCalled();
    expect(component.emotions).toEqual([
      new Emotion(1, 'emo1'),
      new Emotion(2, 'emo2'),
      new Emotion(3, 'emo3'),
    ]);
  });
});
