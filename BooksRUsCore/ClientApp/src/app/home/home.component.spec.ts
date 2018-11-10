import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {By} from "@angular/platform-browser";
import {RecommendationComponent} from "../recommendation/recommendation.component";
import {BookComponent} from "../book/book.component";
import {EmotionService} from "../emotion.service";
import {Observable} from "rxjs";

describe('HomeComponent', () => {
  let emotionService: EmotionService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    emotionService = new EmotionService();
    TestBed.configureTestingModule({
      declarations: [HomeComponent, RecommendationComponent, BookComponent],
      providers: [{provide: EmotionService, useValue: emotionService}]

    })
      .compileComponents();
  }));

  beforeEach(() => {
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
    spyOn(emotionService, 'getEmotions').and.returnValue(Observable.of([{emotionid: 1, emotion: 'emo1'}]));
    component.ngOnInit();
    expect(emotionService.getEmotions).toHaveBeenCalled();
    expect(component.emotions).toEqual([{emotionid: 1, emotion: 'emo1'}]);
  });
});
