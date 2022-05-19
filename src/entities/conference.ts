export default class Conference {
  // field
  public topic: string;

  public duration: number;

  public isTracked: boolean;

  constructor(topic: string, duration: number) {
    this.topic = topic;
    this.duration = duration;
    this.isTracked = false;
  }
}
