import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { VoteLibraryComponent} from './voteLibrary.component';
import { BookComponent } from "../book/book.component";
import { BookService } from "../book/book.service";
import { By } from "@angular/platform-browser";
import { Book } from "../book/book";
import { Observable } from "rxjs";

describe('VoteLibraryComponent', () => {
  let component: VoteLibraryComponent;
  let bookServiceStub: Partial<BookService>;
  let fixture: ComponentFixture<VoteLibraryComponent>;
  let book1: Book = new Book('title1', 'author1', 'cover1');
  let book2: Book = new Book('title2', 'author2', 'cover2');
  let book3: Book = new Book('title3', 'author3', 'cover3');
  let books = [book1, book2, book3];
  beforeEach(async(() => {

    bookServiceStub = {
      getBooks: () => {
        return Observable.of(books);
      }
    };

    TestBed.configureTestingModule({
      declarations: [VoteLibraryComponent, BookComponent],
      providers: [
        { provide: BookService, useValue: bookServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a book for each book', function () {
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.directive(BookComponent)).length).toBeGreaterThan(0);
  });


  it('should have a search field', function () {
    expect(fixture.debugElement.query(By.css('.search-library')).nativeElement.textContent).toContain('Search');
  });

  it('should have serach buttons', function () {
    expect(fixture.debugElement.query(By.css('.votelibrary-button')).nativeElement.textContent).toContain('Books');
  });

});
