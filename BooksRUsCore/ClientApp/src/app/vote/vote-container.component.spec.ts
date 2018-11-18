import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {VoteContainerComponent} from "./vote-container.component";
import {VoteComponent} from "./vote.component";
import {By} from "@angular/platform-browser";
import {BookComponent} from "../book/book.component";
import {Book} from "../book/book";
import {BookService} from "../book/book.service";
import {Observable} from "rxjs";
import {Emotion} from "../emotion/emotion";
import {EmotionService} from "../emotion/emotion.service";

describe('VoteContainerComponent', () => {
  let books: Book[];
  let bookServiceStub: Partial<BookService>;
  let emotions: Emotion[];
  let emotionServiceStub: Partial<EmotionService>;
  let component: VoteContainerComponent;
  let fixture: ComponentFixture<VoteContainerComponent>;

  beforeEach(async(() => {
    books = [
      new Book('t1', 'a1', 'p1'),
      new Book('t2', 'a2', 'p2'),
      new Book('t3', 'a3', 'p3'),
    ];

    bookServiceStub = {
      getBooks: () => {
        return Observable.of(books);
      }
    };

    emotions = [
      new Emotion(1, 'emo1'),
      new Emotion(2, 'emo2')
    ];

    emotionServiceStub = {
      getEmotions: () => {
        return Observable.of(emotions);
      }
    };

    TestBed.configureTestingModule({
      declarations: [VoteContainerComponent, VoteComponent, BookComponent],
      providers: [
        {provide: BookService, useValue: bookServiceStub},
        {provide: EmotionService, useValue: emotionServiceStub},
      ]
    });
    fixture = TestBed.createComponent(VoteContainerComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a vote page', function () {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(VoteComponent))).toBeTruthy();
  });

  it('should get a list of books on initialization', function () {
    fixture.detectChanges();
    expect(component.books).toEqual(books);
  });

  it('should move to the next book', function () {
    component.ngOnInit();
    expect(component.book).toEqual(books[0]);
    component.nextBook();
    expect(component.book).toEqual(books[1]);
  });

  it('should restart books at end', function () {
    component.ngOnInit();
    expect(component.book).toEqual(books[0]);
    component.nextBook();
    component.nextBook();
    component.nextBook();
    expect(component.book).toEqual(books[0]);
  });

  it('should get all the emotions on initialization', function () {
    fixture.detectChanges();
    expect(component.emotions).toEqual(emotions);
  });
});
