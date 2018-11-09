import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Emotion} from "../emotion";
import {EmotionService} from "../emotion.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() emotions: Emotion[];

  constructor(private emotionService: EmotionService) {
  }

  ngOnInit() {
    this.getEmotions();
  }

  getEmotions(): void {
    this.emotionService.getEmotions().subscribe(emotions => this.emotions = emotions);
  }
}
