import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import {By} from "@angular/platform-browser";

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.title = 'book title';
    component.author = 'book author';
    component.coverPath = '/assets/cover.png';
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
