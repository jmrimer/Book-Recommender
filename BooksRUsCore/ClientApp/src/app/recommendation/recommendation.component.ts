import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
