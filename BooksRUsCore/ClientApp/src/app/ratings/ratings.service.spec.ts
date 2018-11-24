import { TestBed, inject } from '@angular/core/testing';

import { RatingsService } from './ratings.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingsService, HttpClient, HttpHandler]
    });
    service = TestBed.get(RatingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  });
});
