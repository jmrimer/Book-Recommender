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
import {Vote} from "./Vote";
import {VoteService} from "./vote.service";

describe('VoteContainerComponent', () => {
  let book1, book2, book3: Book;
  let books: Book[];
  let bookServiceStub: Partial<BookService>;
  let emotions: Emotion[];
  let emotion1, emotion2: Emotion;
  let emotionServiceStub: Partial<EmotionService>;
  let voteServiceStub: Partial<VoteService>;
  let component: VoteContainerComponent;
  let fixture: ComponentFixture<VoteContainerComponent>;
  let submitVotesSpy: any;

  beforeEach(async(() => {
    let book1 = new Book('t1', 'a1', 'p1');
    let book2 = new Book('t2', 'a2', 'p2');
    let book3 = new Book('t3', 'a3', 'p3');
    books = [book1, book2, book3];

    bookServiceStub = {
      getBooks: () => {
        return Observable.of(books);
      }
    };

    emotion1 = new Emotion(1, 'emo1');
    emotion2 = new Emotion(2, 'emo2');
    emotions = [emotion1, emotion2];

    emotionServiceStub = {
      getEmotions: () => {
        return Observable.of(emotions);
      }
    };

    voteServiceStub = {
      submitVotes: () => {
      }
    };
    submitVotesSpy = jasmine.createSpy();
    voteServiceStub.submitVotes = submitVotesSpy;


    TestBed.configureTestingModule({
      declarations: [VoteContainerComponent, VoteComponent, BookComponent],
      providers: [
        {provide: BookService, useValue: bookServiceStub},
        {provide: EmotionService, useValue: emotionServiceStub},
        {provide: VoteService, useValue: voteServiceStub}
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

  it('should restart the next books at end of the book list', function () {
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

  it('should send votes to the votes service', function () {
    const votes = [new Vote(book1, emotion1), new Vote(book1, emotion2)];
    component.submitVotes(votes);
    expect(voteServiceStub.submitVotes).toHaveBeenCalledWith(votes);
  });
});
