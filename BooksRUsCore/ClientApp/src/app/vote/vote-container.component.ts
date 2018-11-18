import {Component, OnInit} from "@angular/core";
import {Book} from "../book/book";
import {BookService} from "../book/book.service";

@Component({
  selector: 'app-vote-container',
  templateUrl: './vote-container.component.html',
  styleUrls: ['./vote-container.component.css']
})
export class VoteContainerComponent implements OnInit {
  books: Book[];
  book: Book;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getBooks();
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
}
