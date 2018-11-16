import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "./book";

@Injectable()
export class BookService {
  private booksUrl = 'api/book/GetAllBooks';

  constructor(private http?: HttpClient) { }

  test(): void {};
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }
}
