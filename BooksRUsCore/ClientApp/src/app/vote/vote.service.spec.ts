import { TestBed, inject } from '@angular/core/testing';

import { VoteService } from './vote.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('VoteService', () => {
  let service: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteService, HttpClient, HttpHandler]
    });
    service = TestBed.get(VoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
