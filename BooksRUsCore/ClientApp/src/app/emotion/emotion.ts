export class Emotion {
  emotionid: number;
  emotion: string;


  constructor(id: number, name: string) {
    this.emotionid = id;
    this.emotion = name;
  }
}

export class EmotionFactoryStub {
  public buildAll(): Emotion[] {
    return [
      new Emotion(1, 'emo1'),
      new Emotion(2, 'emo2'),
      new Emotion(3, 'emo3'),
    ]
  }
}
