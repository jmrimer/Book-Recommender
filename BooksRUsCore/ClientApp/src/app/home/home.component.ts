import { Component, OnInit } from '@angular/core';
import { Recommendation } from "../recommendation/recommendation";
import { RecommendationService } from "../recommendation/recommendation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Emotion } from "../emotion/emotion";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recommendations: Recommendation[];

  constructor(
    private router: Router,
    private recommendationService: RecommendationService) {
  }

  ngOnInit() {
    this.getRecommendations();
  }

  getRecommendations(): void {
    this.recommendationService.getRecommendations().subscribe((recommendations) => {
        this.recommendations = this.shuffle(recommendations);
      },
      (err) => { console.log(err); }
    );
  }


  shuffle(array): Recommendation[] {
    var currentIndex = array.length, tempValue, randomIndex;

    while (0 != currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = tempValue;
    }

    return array;
  }

  gotoRating(emotion: Emotion) {
    let url = `/ratings/${emotion.emotionid}`;
    this.router.navigateByUrl(url);
  }
}
