import {Component, Input, OnInit} from "@angular/core";
import {Emotion} from "../../emotion/emotion";
import {RatingsService} from "../ratings.service";
import {Rating} from "../Rating";
import {ActivatedRoute} from "@angular/router";
import {EmotionService} from "../../emotion/emotion.service";

@Component({
  selector: 'app-ratings-container',
  templateUrl: './ratings-container.component.html',
  styleUrls: ['./ratings-container.component.css']
})
export class RatingsContainerComponent implements OnInit {
  @Input() emotion: Emotion;
  ratings: Rating[];
  emotions: Emotion[];
  emotionSelections: EmotionSelection[];

  constructor(
    private route: ActivatedRoute,
    private ratingsService: RatingsService,
    private emotionService: EmotionService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap =>
      this.getRatings(pmap.get('id'))
    );
    this.getEmotions();
  }

  selectionsInit(emotions: Emotion[]) {
    this.emotionSelections = emotions.map((emotion) => {
      return new EmotionSelection(emotion, false);
    });
  }

  getRatings(emotionId: string) {
    this.ratingsService.getRatings(emotionId).subscribe(ratings => {
      this.ratings = ratings;
    }, (err) => {
      console.log(err);
    });
  }

  handleSelect(emotionSelection: EmotionSelection) {
    this.getRatings(String(emotionSelection.emotion.emotionid));
    this.emotionSelections.forEach((emoSelection) => {
      if (emoSelection.emotion != emotionSelection.emotion) {
        emoSelection.checked = false;
      }
    })
  }

  getEmotions(): void {
    if (!this.emotions) {
      this.emotionService.getEmotions().subscribe((emotions) => {
        this.emotions = emotions;
        this.selectionsInit(emotions);
      }, (err) => {
        console.log(err);
      });
    }
  }


}

export class EmotionSelection {
  constructor(private _emotion: Emotion, private _checked: boolean) {

  }

  get emotion(): Emotion {
    return this._emotion;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }
}
