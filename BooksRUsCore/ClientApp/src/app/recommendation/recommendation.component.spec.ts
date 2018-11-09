import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationComponent } from './recommendation.component';
import {By} from "@angular/platform-browser";
import {BookComponent} from "../book/book.component";

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationComponent, BookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    component.type = 'Happiness';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a recommendation header', function () {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toBe('Happiness Recommendation');
  });

  it('should display a book', function () {
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeTruthy();
  });
});
