import { Injectable } from '@angular/core';
import {Vote} from "./Vote";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class VoteService {
private votesUrl = 'api/vote/SubmitVotes'
  constructor(private http?: HttpClient) { }

  submitVotes(votes: Vote[]): Observable<Vote[]> {
    return this.http.post<Vote[]>(this.votesUrl, votes);
  }
}
