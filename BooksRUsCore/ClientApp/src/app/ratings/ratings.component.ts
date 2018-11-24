import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "./Rating";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() ratings: Rating[];

  constructor() { }

  ngOnInit() {
  }

}
