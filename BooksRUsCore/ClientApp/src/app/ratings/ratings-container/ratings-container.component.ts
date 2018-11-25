import {Component, Input, OnInit} from "@angular/core";
import {Emotion} from "../../emotion/emotion";
import {RatingsService} from "../ratings.service";
import {Rating} from "../Rating";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ratings-container',
  templateUrl: './ratings-container.component.html',
  styleUrls: ['./ratings-container.component.css']
})
export class RatingsContainerComponent implements OnInit {
  @Input() emotion: Emotion;
  ratings: Rating[];

  constructor(
    private route: ActivatedRoute,
    private ratingsService: RatingsService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap =>
      this.getRatings(pmap.get('id'))
    );
  }

  getRatings(emotionId: string) {
    this.ratingsService.getRatings(emotionId).subscribe(ratings => {
      this.ratings = ratings;
    }, (err) => {
      console.log(err);
    });
  }
}