import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {By} from "@angular/platform-browser";
import {RecommendationComponent} from "../recommendation/recommendation.component";
import {BookComponent} from "../book/book.component";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, RecommendationComponent, BookComponent ]
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

  it('should display a recommendation component', function () {
    expect(fixture.debugElement.query(By.directive(RecommendationComponent))).toBeTruthy();
  });
});
