import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import {By} from "@angular/platform-browser";
import {Book} from "../book";

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: Book;

  beforeEach(() => {
    book = new Book('book title', 'book author', './assets/cover.png');

    TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = book;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', function () {
    expect(fixture.debugElement.query(By.css('.title')).nativeElement.textContent).toBe('book title');
  });

  it('should display the author', function () {
    expect(fixture.debugElement.query(By.css('.author')).nativeElement.textContent).toBe('book author');
  });

  it('should display the cover', function () {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.cover')).toBeTruthy();
    expect(compiled.querySelector('img').src).toContain('/assets/cover.png');
  });
});
