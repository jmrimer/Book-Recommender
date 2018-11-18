import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../book/book";
import {Emotion} from "../emotion/emotion";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  @Input() book: Book;
  @Input() emotions: Emotion[];
  @Output('book') bookEmitter = new EventEmitter<Book>();
  selectedEmotions: Emotion[] = [];
  // @Output('emotions') emotionScoresEmitter = new EventEmitter<EmotionScore[]>();

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
  // submitEmotions(emotionScores: EmotionScore[]) {
  //   this.emotionScoresEmitter.emit(emotionScores);
  // }
}
