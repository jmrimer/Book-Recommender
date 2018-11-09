import {TestBed, inject} from '@angular/core/testing';

import {EmotionService} from './emotion.service';
import {Emotion} from "./emotion";
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

  it('should return 3 emotions',
    (done: DoneFn) => {
      service.getEmotions().subscribe(emotions => {
        expect(emotions).toEqual([
          new Emotion(1, 'emotion1'),
          new Emotion(2, 'emotion2'),
          new Emotion(3, 'emotion3'),
        ]);
        done();
      });
    }
  );
});
