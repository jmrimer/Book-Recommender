export class Book {
  title: string;
  author: string;
  pictureFilePath: string;
    bookid: number;

  constructor(title: string, author: string, pictureFilePath: string) {
    this.title = title;
    this.author = author;
    this.pictureFilePath = pictureFilePath;
  }
}
