import {Component, OnInit} from "@angular/core";
import {Book} from "../book/book";
import {BookService} from "../book/book.service";
import {Emotion} from "../emotion/emotion";
import {EmotionService} from "../emotion/emotion.service";
import {Vote} from "./Vote";
import {VoteService} from "./vote.service";

@Component({
  selector: 'app-vote-container',
  templateUrl: './vote-container.component.html',
  styleUrls: ['./vote-container.component.css']
})
export class VoteContainerComponent implements OnInit {
  books: Book[];
  book: Book;
  emotions: Emotion[];

  constructor(
    private bookService: BookService,
    private emotionService: EmotionService,
    private voteService: VoteService
  ) {
  }

  ngOnInit() {
    this.getBooks();
    this.getEmotions();
  }

  getBooks(): void {
    if (!this.books) {
      this.bookService.getBooks().subscribe((books) => {
          this.books = books;
          this.setBook();
        }, (err) => {
          console.log(err);
        }
      );
    }
  }

  getEmotions(): void {
    if (!this.emotions) {
      this.emotionService.getEmotions().subscribe((emotions) => {
        this.emotions = emotions;
      }, (err) => {
        console.log(err);
      });
    }
  }

  nextBook(): void {
    const index =
      this.books.indexOf(this.book) + 1 < this.books.length
        ? this.books.indexOf(this.book) + 1
        : 0
    ;
    this.book = this.books[index];
  }

  setBook() {
    this.book = this.books ? this.books[0] : new Book('loading', 'loading', 'loading`');
  }

  submitVotes(votes: Vote[]) {
    this.voteService.submitVotes(votes).subscribe();
  }
}
