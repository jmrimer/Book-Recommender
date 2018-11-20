import {Injectable} from '@angular/core';
import {Vote} from "./Vote";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class VoteService {
  private votesUrl = 'api/vote';

  constructor(private http?: HttpClient) {
  }

  submitVotes(votes: Vote[]): Observable<Vote[]> {
    return this.http.post<Vote[]>(this.votesUrl, votes, httpOptions);
  }
}
