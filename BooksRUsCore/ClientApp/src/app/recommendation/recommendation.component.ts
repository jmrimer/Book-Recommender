import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../book";
import {Recommendation} from "./recommendation";
import {Emotion} from "../emotion";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  @Input() recommendation: Recommendation;

  constructor() { }

  ngOnInit() {
  }

}
