import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteComponent } from './vote.component';
import {BookComponent} from "../book/book.component";
import {By} from "@angular/platform-browser";
import {Book} from "../book/book";

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteComponent, BookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a book', function () {
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeFalsy();
    component.book = new Book('title', 'author', 'cover');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeTruthy();
  });

  it('should have a next book button', function () {
    expect(fixture.debugElement.query(By.css('button')).nativeElement.textContent).toBe('Next book');
  });
});
