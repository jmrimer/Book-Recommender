export class Book {
  title: string;
  author: string;
  bookid: number;
  genreid: number;
  pictureFilePath: string;
  bookDescription: string;

  constructor(title: string, author: string, bookid: number, genreid: number, pictureFilePath: string, bookDescription: string) {
    this.title = title;
    this.author = author;
    this.bookid = bookid;
    this.genreid = genreid;
    this.pictureFilePath = pictureFilePath;
    this.bookDescription = bookDescription;
  }
}
