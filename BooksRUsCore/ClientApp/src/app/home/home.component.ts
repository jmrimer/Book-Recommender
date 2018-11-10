import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Emotion} from "../emotion";
import {EmotionService} from "../emotion.service";
import {Book} from "../book";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() emotions: Emotion[];
  book: Book = new Book('title', 'author', '../assets/hitchhiker.png');

  constructor(private emotionService: EmotionService) {
  }

  ngOnInit() {
    this.getEmotions();
  }

  getEmotions(): void {
    this.emotionService.getEmotions().subscribe(emotions => this.emotions = emotions);
  }
}
