import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../book/book";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  @Input() books: Book[];
  book: Book;

  constructor() { }

  ngOnInit() {
    this.setBook();
  }

  setBook(){
    this.book = this.books ? this.books[0] : new Book('loading', 'loading', 'loading');
  }

  nextBook(): void {
    const index =
      this.books.indexOf(this.book) + 1 < this.books.length
        ? this.books.indexOf(this.book) + 1
        : 0
    ;
    this.book = this.books[index];
  }
}
