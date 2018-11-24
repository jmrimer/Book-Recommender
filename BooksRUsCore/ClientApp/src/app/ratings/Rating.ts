import {Book} from "../book/book";

export class Rating {
  constructor(private _rank: number, private _book: Book) {

  }

  get rank(): number {
    return this._rank;
  }

  get book(): Book {
    return this._book;
  }
}

export class RatingFactoryStub {
  build(): Rating[] {
    return [
      new Rating(1, new Book('t1', 'a1', 'pic1')),
      new Rating(2, new Book('t2', 'a2', 'pic2')),
      new Rating(3, new Book('t3', 'a3', 'pic3')),
    ]
  }
}
