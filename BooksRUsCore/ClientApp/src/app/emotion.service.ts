import {Injectable} from '@angular/core';
import {Emotion} from "./emotion";
import {Observable} from "rxjs";
import {of} from "rxjs/observable/of";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class EmotionService {
  private emotionsUrl = 'api/emotion/GetAllEmotions';
  constructor(private http?: HttpClient) {
  }

  getEmotions(): Observable<Emotion[]> {
    return this.http.get<Emotion[]>(this.emotionsUrl);
  }
}
