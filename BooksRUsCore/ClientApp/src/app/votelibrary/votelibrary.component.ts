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
  allbooks: Book[];
  searchParams: string;
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
      this.allbooks = books;
    }, (err) => { console.log(err); }
    );
  }
  searchBooks() {
    this.books = [];
    for (var i = 0; i < this.allbooks.length; i++) {
      var book = this.allbooks[i];
      var author = book.author.toLowerCase();
      var title = book.title.toLowerCase();
      if ((title.includes(this.searchParams) || (author.includes(this.searchParams)))
      {
        this.books.push(book);       
      }  
    } 
  }

  resetBooks() {
    this.books = this.allbooks;
  }
  updateSearch(value: string) {
    this.searchParams = value.trim().toLowerCase();
  }
}
