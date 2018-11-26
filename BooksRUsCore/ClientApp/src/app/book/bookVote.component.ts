import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Book } from "./book";
import { Router } from '@angular/router';
import { Emotion } from "../emotion/emotion";
import { Vote } from "../vote/Vote";
import { EmotionService } from "../emotion/emotion.service";

@Component({
  selector: 'app-bookVote',
  templateUrl: './bookVote.component.html',
  styleUrls: ['./book.component.css']
})
export class BookVoteComponent implements OnInit {
  @Input() book: Book;
  //emotions: Emotion[];
  //@Output('book') bookEmitter = new EventEmitter<Book>();
  //@Output('vote') voteEmitter = new EventEmitter<Vote[]>();
  //selectedEmotions: Emotion[] = [];

  constructor(private emotionService: EmotionService) { }

  ngOnInit() {
    //if (!this.emotions) {
    //  this.emotionService.getEmotions().subscribe((emotions) => {
    //    this.emotions = emotions;
    //  }, (err) => {
    //    console.log(err);
    //  });
    //}
  }

  voteClick() {
    console.log("book:");
    console.log(this.book);
    //var el = $document.getElementById(this.book.bookid + "-voteBlock");
    //var el = angular.element(document.querySelector('#' + this.book.bookid + "-voteBlock"));
    //console.log(el);
    
  }

//  selectEmotion(emotion: Emotion) {
//    let index = this.selectedEmotions.indexOf(emotion);
//    if (index > -1) {
//      this.selectedEmotions.splice(index, 1);
//    } else {
//      this.selectedEmotions.push(emotion);
//    }
//  }

//  submitVotes() {
//    let votes: Vote[] = [];
//    this.selectedEmotions.map((emo) => {
//      votes.push(new Vote(this.book, emo));
//    });
//    this.voteEmitter.emit(votes);
//  }
//}
