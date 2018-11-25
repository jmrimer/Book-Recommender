import {Component, Input, OnInit} from '@angular/core';
import {Book} from "./book";

@Component({
  selector: 'app-bookVote',
  templateUrl: './bookVote.component.html',
  styleUrls: ['./book.component.css']
})
export class BookVoteComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
