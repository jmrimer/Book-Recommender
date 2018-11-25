import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {RatingsContainerComponent} from "./ratings-container.component";
import {Emotion, EmotionFactoryStub} from "../../emotion/emotion";
import {RatingsService} from "../ratings.service";
import {Observable, ReplaySubject} from "rxjs";
import {Rating, RatingFactoryStub} from "../Rating";
import {Book} from "../../book/book";
import {ActivatedRoute, ChildActivationEnd, convertToParamMap, ParamMap, Params} from "@angular/router";
import {RatingsComponent} from "../ratings.component";
import {BookComponent} from "../../book/book.component";

describe('RatingsContainerComponent', () => {
  let component: RatingsContainerComponent;
  let fixture: ComponentFixture<RatingsContainerComponent>;
  let child: RatingsComponent;
  let ratingsServiceStub: Partial<RatingsService>;
  const ratings = new RatingFactoryStub().build();
  let activatedRoute: ActivatedRouteStub;
  const emotions = new EmotionFactoryStub().buildAll();

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({id: 1});

    ratingsServiceStub = {
      getRatings: emotion => {
        return Observable.of(ratings);
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
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsContainerComponent);
    component = fixture.componentInstance;
    child = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a list of books based on emotion input', () => {
    component.ngOnInit();
    expect(component.ratings).toEqual(ratings);
  });

  it('should pass the ratings to its child component', () => {
    component.ratings = ratings;
    fixture.detectChanges();
    expect(child.ratings).toBe(ratings);
  });

  it('should display selection options for each emotion', () => {
    // setup: do a testing fake/force that make the environemnet controlled RE: emotions
    component.emotions = emotions;
    // re-render virtual DOM
    fixture.detectChanges();
    // test
    expect(fixture.debugElement.queryAll(By.css('input')).length).toBe(3);
    expect(fixture.debugElement.queryAll(By.css('input'))[0].nativeElement.textContent).toBe('emo1');
    expect(fixture.debugElement.queryAll(By.css('input'))[1].nativeElement.textContent).toBe('emo2');
    expect(fixture.debugElement.queryAll(By.css('input'))[2].nativeElement.textContent).toBe('emo3');
  });

  it('should get all emotions on initialization', () => {
    component.ngOnInit(); // the this.getAllEmotions call happens here
    expect(component.emotions).toBe(emotions); // do that by making a emotionServiceStub (a la voting container spec)
  }    );
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
