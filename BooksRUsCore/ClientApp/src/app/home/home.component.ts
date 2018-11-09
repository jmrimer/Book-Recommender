import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() emotions: Emotion[] = [
    {emotionId: 1, emotion: 'happiness'},
    {emotionId: 2, emotion: 'fear'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

interface Emotion {
  emotionId: number;
  emotion: string;
}
