import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteComponent } from './vote.component';
import {BookComponent} from "../book/book.component";
import {By} from "@angular/platform-browser";
import {Book} from "../book/book";

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  let books: Book[];

  beforeEach(async(() => {
    books = [
      new Book('t1', 'a1', 'p1'),
      new Book('t2', 'a2', 'p2'),
      new Book('t3', 'a3', 'p3'),
    ];

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

  it('should display a book if available', function () {
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeFalsy();
    component.books = books;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeTruthy();
  });

  it('should have a next book button', function () {
    expect(fixture.debugElement.query(By.css('button')).nativeElement.textContent).toBe('Next book');
  });

  it('should call the next book click function on button click', function () {
    component.books = books;
    component.setBook();
    const index = component.books.indexOf(component.book);
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(component.books.indexOf(component.book)).not.toEqual(index);
  });

  it('should move to the next book', function () {
    component.books = books;
    component.ngOnInit();
    expect(component.book).toEqual(books[0]);
    component.nextBook();
    expect(component.book).toEqual(books[1]);
  });

  it('should restart books at end', function () {
    component.books = books;
    component.ngOnInit();
    expect(component.book).toEqual(books[0]);
    component.nextBook();
    component.nextBook();
    component.nextBook();
    expect(component.book).toEqual(books[0]);
  });

});
