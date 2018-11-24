import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Rating} from "./Rating";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RatingsService {
  private ratingsUrl = 'api/ratings/';

  constructor(private http?: HttpClient) {
  }

  getRatings(emotionId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.ratingsUrl + emotionId)
  }
}
