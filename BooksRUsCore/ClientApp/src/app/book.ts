export class Book {
  title: string;
  author: string;
  bookid: number;
  genreid: number;
  pictureFilePath: string;


  constructor(title: string, author: string, pictureFilePath: string) {
    this.title = title;
    this.author = author;
    this.pictureFilePath = pictureFilePath;
  }
}
