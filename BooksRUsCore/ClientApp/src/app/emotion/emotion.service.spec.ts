import {TestBed} from "@angular/core/testing";
import {EmotionService} from "./emotion.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('EmotionService', () => {
  let service: EmotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmotionService, HttpClient, HttpHandler]
    });
    service = TestBed.get(EmotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
