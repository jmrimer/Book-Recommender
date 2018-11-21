import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../book/book";
import {Emotion} from "../emotion/emotion";
import {Vote} from "./Vote";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  @Input() book: Book;
  @Input() emotions: Emotion[];
  @Output('book') bookEmitter = new EventEmitter<Book>();
  @Output('vote') voteEmitter = new EventEmitter<Vote[]>();
  selectedEmotions: Emotion[] = [];

  constructor() { }

  ngOnInit() {
  }

  nextBook(book: Book) {
    this.bookEmitter.emit(book);
  }

  selectEmotion(emotion: Emotion) {
    let index = this.selectedEmotions.indexOf(emotion);
    if (index > -1) {
      this.selectedEmotions.splice(index, 1);
    } else {
      this.selectedEmotions.push(emotion);
    }
  }

  submitVotes() {
    let votes: Vote[] = [];
    this.selectedEmotions.map((emo) => {
      votes.push(new Vote(this.book, emo));
    });
    this.voteEmitter.emit(votes);
  }
}
