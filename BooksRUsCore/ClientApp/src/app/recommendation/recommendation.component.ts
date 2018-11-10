import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../book";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  @Input() type: string;
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
