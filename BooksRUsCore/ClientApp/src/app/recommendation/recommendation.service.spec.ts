import {inject, TestBed} from '@angular/core/testing';

import {RecommendationService} from './recommendation.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('RecommendationService', () => {
  let service: RecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationService, HttpClient, HttpHandler]
    });
    service = TestBed.get(RecommendationService);
  });

  it('should be created', inject([RecommendationService], (service: RecommendationService) => {
    expect(service).toBeTruthy();
  }));
});
