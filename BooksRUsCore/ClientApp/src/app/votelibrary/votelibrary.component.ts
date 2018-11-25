import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from "../book/book.service";
import { Book } from "../book/Book";
//import { BookVote } from "../book/BookVote";
import { Vote } from "../vote/Vote";
import { Emotion } from "../emotion/emotion";

@Component({
  selector: 'app-votelibrary',
  templateUrl: './votelibrary.component.html',
  styleUrls: ['./votelibrary.component.css']
})
export class VoteLibraryComponent implements OnInit {
  books: Book[];
  //@Input() book: Book;
  //@Input() emotions: Emotion[];
  //@Output('book') bookEmitter = new EventEmitter<Book>();
  //@Output('vote') voteEmitter = new EventEmitter<Vote[]>();

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    //this.getRecommendations();
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    }, (err) => { console.log(err); }
    );
  }
}
