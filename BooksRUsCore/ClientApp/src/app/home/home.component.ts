import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Emotion} from "../emotion";
import {EmotionService} from "../emotion.service";
import {Book} from "../book";
import {Recommendation} from "../recommendation/recommendation";
import {RecommendationService} from "../recommendation/recommendation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recommendations: Recommendation[];

  constructor(private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.getRecommendations();
  }

  getRecommendations(): void {
    this.recommendationService.getRecommendations().subscribe(
      recommendations => this.recommendations = recommendations
    );
  }
}
