import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {VoteContainerComponent} from "./vote-container.component";
import {VoteComponent} from "./vote.component";
import {By} from "@angular/platform-browser";
import {BookComponent} from "../book/book.component";
import {Book} from "../book/book";
import {Observable} from "rxjs";
import {BookService} from "../book/book.service";

describe('VoteContainerComponent', () => {
  let books: Book[];
  let bookServiceStub: Partial<BookService>;
  let component: VoteContainerComponent;
  let fixture: ComponentFixture<VoteContainerComponent>;

  beforeEach(async(() => {
    books = [
      new Book('t1', 'a1', 'p1'),
      new Book('t2', 'a2', 'p2'),
      new Book('t3', 'a3', 'p3'),
    ];

    bookServiceStub = {
      test: () => {
        console.log('testing');},
      getBooks: () => {
        return Observable.of(books);
      }
    };
    console.log(bookServiceStub);
    TestBed.configureTestingModule({
      declarations: [VoteContainerComponent, VoteComponent, BookComponent],
      providers: [
        {provide: BookService, userValue: bookServiceStub}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(VoteContainerComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(function () {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a vote page', function () {
    expect(fixture.debugElement.query(By.directive(VoteComponent))).toBeFalsy();
    component.books = [new Book('1','2','3')];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(VoteComponent))).toBeTruthy();
  });

  it('should get a list of books on initialization', function () {
    fixture.detectChanges();
    expect(component.books).toEqual(books);
  });
});
