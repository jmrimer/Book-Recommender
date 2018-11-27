import {Component, OnInit} from "@angular/core";
import {Book} from "../book/book";
import {BookService} from "../book/book.service";
import {Emotion} from "../emotion/emotion";
import {EmotionService} from "../emotion/emotion.service";
import {Vote} from "./Vote";
import { VoteService } from "./vote.service";
import { RouterModule, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-vote-container',
  templateUrl: './vote-container.component.html',
  styleUrls: ['./vote-container.component.css']
})
export class VoteContainerComponent implements OnInit {
  books: Book[];
  book: Book;
  emotions: Emotion[];
  id: number;

  constructor(
    private bookService: BookService,
    private emotionService: EmotionService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getBooks();
    this.getEmotions();
    this.setId();
  }

  setId(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    console.log(this.id);
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
    if ((this.books) && (this.id))
    {
      this.book = this.books.find(book => book.bookid === this.id);
    }
    else {
      this.book = this.books[0];
    }
  }

  gotoLibrary() {
    console.log("hi");
  }

  submitVotes(votes: Vote[]) {
    this.voteService.submitVotes(votes).subscribe(votes => {
      console.log(votes);
    });
  }
}
