import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {EmotionSelection, RatingsContainerComponent} from "./ratings-container.component";
import {Emotion, EmotionFactoryStub} from "../../emotion/emotion";
import {RatingsService} from "../ratings.service";
import {Observable, ReplaySubject} from "rxjs";
import {Rating, RatingFactoryStub} from "../Rating";
import {Book} from "../../book/book";
import {ActivatedRoute, ChildActivationEnd, convertToParamMap, ParamMap, Params} from "@angular/router";
import {RatingsComponent} from "../ratings.component";
import {BookComponent} from "../../book/book.component";
import {By} from "@angular/platform-browser";
import {EmotionService} from "../../emotion/emotion.service";

describe('RatingsContainerComponent', () => {
  const emotions = new EmotionFactoryStub().buildAll();
  const ratings = new RatingFactoryStub().build();
  const emotionSelections = [
    new EmotionSelection(emotions[0], false),
    new EmotionSelection(emotions[1], false),
    new EmotionSelection(emotions[2], false),
  ];
  let component: RatingsContainerComponent;
  let fixture: ComponentFixture<RatingsContainerComponent>;
  let child: RatingsComponent;
  let ratingsServiceStub: Partial<RatingsService>;
  let activatedRoute: ActivatedRouteStub;
  let emotionServiceStub: Partial<EmotionService>;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({id: 1});

    ratingsServiceStub = {
      getRatings: emotion => {
        return Observable.of(ratings);
      }
    };

    emotionServiceStub = {
      getEmotions: () => {
        return Observable.of(emotions);
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        RatingsContainerComponent,
        RatingsComponent,
        BookComponent
      ],
      providers: [
        {provide: RatingsService, useValue: ratingsServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: EmotionService, useValue: emotionServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsContainerComponent);
    component = fixture.componentInstance;
    child = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a list of books based on emotionSelection input', () => {
    expect(component.ratings).toBeFalsy();
    component.ngOnInit();
    expect(component.ratings).toEqual(ratings);
  });

  it('should pass the ratings to its child component', () => {
    component.ratings = ratings;
    fixture.detectChanges();
    expect(child.ratings).toBe(ratings);
  });

  it('should display selection options for each emotionSelection', () => {
    component.emotions = emotions;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('input')).length).toBe(3);
  });

  it('should get all emotions on initialization', () => {
    component.ngOnInit();
    expect(component.emotions).toBe(emotions);
  });

  it('should set the emotionSelection selections all to false on initialization', () => {
    component.ngOnInit();
    expect(component.emotionSelections).toEqual(emotionSelections);
  });
  it('should filter the books on emotionSelection selection', () => {
    expect(component.ratings).toBeFalsy();
    component.emotions = emotions;
    fixture.detectChanges();
    let emotion = fixture.debugElement.query(By.css('input'));
    emotion.nativeElement.click();
    expect(component.ratings).toBe(ratings);
  });

  it('should only allow a single selection', () => {
    component.emotionSelections = emotionSelections;
    fixture.detectChanges();
    let emotionInputs = fixture.debugElement.queryAll(By.css('input'));
    emotionInputs[0].nativeElement.click();
    expect(emotionInputs[0].nativeElement.checked).toBeTruthy();
    expect(emotionInputs[1].nativeElement.checked).toBeFalsy();
    expect(emotionInputs[2].nativeElement.checked).toBeFalsy();
    emotionInputs[1].nativeElement.click();
    expect(emotionInputs[0].nativeElement.checked).toBeFalsy();
    expect(emotionInputs[1].nativeElement.checked).toBeTruthy();
    expect(emotionInputs[2].nativeElement.checked).toBeFalsy();

  });
});

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  };
}
