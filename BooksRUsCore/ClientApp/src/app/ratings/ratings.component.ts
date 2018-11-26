import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "./Rating";
import {Emotion} from "../emotion/emotion";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() ratings: Rating[];
  @Input() emotion: Emotion;

  constructor() {
  }

  ngOnInit() {
  }

}
