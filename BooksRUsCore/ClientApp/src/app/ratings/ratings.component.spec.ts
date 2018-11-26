import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingsComponent} from './ratings.component';
import {RatingFactoryStub} from "./Rating";
import {By} from "@angular/platform-browser";
import {BookComponent} from "../book/book.component";

describe('RatingsComponent', () => {
  let component: RatingsComponent;
  let fixture: ComponentFixture<RatingsComponent>;
  const ratings = new RatingFactoryStub().build();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsComponent, BookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a rating for all ratings', () => {
    component.ratings = ratings;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.rating')).length).toBe(3);
  });

  it('should a rank and book for a rating', () => {
    component.ratings = ratings;
    fixture.detectChanges();
    let rating = fixture.debugElement.query(By.css('.rating'));
    expect(rating.query(By.css('.rank')).nativeElement.textContent).toBe('#1');
    expect(rating.query(By.directive(BookComponent))).toBeTruthy();
  });
});
