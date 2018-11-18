import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VoteComponent} from './vote.component';
import {BookComponent} from "../book/book.component";
import {By} from "@angular/platform-browser";
import {Book} from "../book/book";
import {Emotion} from "../emotion/emotion";

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;
  let book: Book;
  let emotions: Emotion[];

  beforeEach(async(() => {
    book = new Book('t1', 'a1', 'p1');
    emotions = [
      new Emotion(1, 'e1'),
      new Emotion(2, 'e2'),
    ];

    TestBed.configureTestingModule({
      declarations: [VoteComponent, BookComponent]
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
    component.book = book;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(BookComponent))).toBeTruthy();
  });

  it('should have a next book button', function () {
    expect(fixture.debugElement.query(By.css('button')).nativeElement.textContent).toBe('Next');
  });

  it('should trigger the inject function on button click', function () {
    let clickSpy = jasmine.createSpy();
    component.nextBook = clickSpy;
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should display a checkbox for each emotion', function () {
    component.emotions = emotions;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.emotion-selection')).length).toBe(2);
  });

  it('should add an emotion to emotions when selected', function () {
    expect(component.selectedEmotions.length).toBe(0);
    component.emotions = emotions;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.emotion-selection')).nativeElement.click();
    expect(component.selectedEmotions.length).toBe(1);
  });

  it('should remove an emotion from emotions when unselected', function () {
    component.emotions = emotions;
    component.selectedEmotions = [emotions[0]];
    fixture.detectChanges();
    expect(component.selectedEmotions.length).toBe(1);
    fixture.debugElement.queryAll(By.css(`.emotion-selection`))[0].nativeElement.click();
    expect(component.selectedEmotions.length).toBe(0);
  });

  it('should handle select adds or removes', function () {
    let emo1 = new Emotion(1, '1');
    let emo2 = new Emotion(2, '2');
    let emos = [emo1, emo2];
    component.selectedEmotions = emos;
    expect(component.selectedEmotions).toEqual(emos);
    component.selectEmotion(emo1);
    expect(component.selectedEmotions.length).toEqual(1);
    component.selectEmotion(emo1);
    expect(component.selectedEmotions).toEqual(emos);
    expect(component.selectedEmotions.length).toEqual(2);
  });

  // it('should trigger its inject submit function on submit button click', function () {
  //   let clickSpy = jasmine.createSpy();
  //   component.nextBook = clickSpy;
  //   fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
  //   expect(clickSpy).toHaveBeenCalled();
  // });
});
