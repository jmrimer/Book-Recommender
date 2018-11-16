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

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    if (!this.books) {
      this.bookService.getBooks().subscribe((books) => {
          this.books = books;
        }, (err) => {
          console.log(err);
        }
      );
    }
  }
}
