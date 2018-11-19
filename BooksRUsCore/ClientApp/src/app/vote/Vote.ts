import {Book} from "../book/book";
import {Emotion} from "../emotion/emotion";

export class Vote {
  constructor(private book: Book, private emotion: Emotion) {
    this.book = book;
    this.emotion = emotion;
  }
}
