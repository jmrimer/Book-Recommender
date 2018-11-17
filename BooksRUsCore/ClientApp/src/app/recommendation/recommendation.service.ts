import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recommendation} from "./recommendation";

@Injectable()
export class RecommendationService {
  private recommendationsUrl = 'api/recommendation/GetAllRecommendations';

  constructor(private http?: HttpClient) { }

  getRecommendations(): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(this.recommendationsUrl);
  }
}
