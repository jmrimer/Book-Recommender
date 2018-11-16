import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../book/book";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  @Input() book: Book;
  constructor() { }

  ngOnInit() {
  }

}
