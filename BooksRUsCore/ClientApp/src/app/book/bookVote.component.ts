import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Book } from "./book";
import { EmotionService } from "../emotion/emotion.service";

@Component({
  selector: 'app-bookVote',
  templateUrl: './bookVote.component.html',
  styleUrls: ['./book.component.css']
})
export class BookVoteComponent implements OnInit {
  @Input() book: Book;

  constructor(private emotionService: EmotionService) { }

  ngOnInit() {
  }
}
