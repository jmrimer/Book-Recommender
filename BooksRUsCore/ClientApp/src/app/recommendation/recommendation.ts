import {Emotion} from "../emotion/emotion";
import {Book} from "../book/book";

export class Recommendation {
  private _emotion: Emotion;
  private _book: Book;

  constructor(emotion: Emotion, book: Book) {
    this._emotion = emotion;
    this._book = book;
  }

  get emotion(): Emotion {
    return this._emotion;
  }

  get book(): Book {
    return this._book;
  }
}
