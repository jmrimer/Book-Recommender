import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));
});
