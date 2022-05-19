import Time from './time';
import {
  MORNING_TIME,
  LUNCH_TIME,
  AFTERNOON_TIME,
  NETWORKING_TIME,
  NETWORKING_DEADLINE,
  MORNING_DURATION,
  AFTERNOON_DURATION,
  AFTERNOON_MIN_DURATION,
} from '../config';
import Conference from './conference';

export default class Track {
  // fields
  public morningTime: Time;

  public lunchTime: Time;

  public afternoonTime: Time;

  public networkingTime: Time;

  public networkingDeadline: Time;

  public morningDuration: number;

  public afternoonDuration: number;

  public afternoonMinDuration: number;

  public afternoonMaxDuration: number;

  public morningSlot: string[];

  public afternoonSlot: string[];

  constructor() {
    this.morningTime = new Time(MORNING_TIME);
    this.lunchTime = new Time(LUNCH_TIME);
    this.afternoonTime = new Time(AFTERNOON_TIME);
    this.networkingTime = new Time(NETWORKING_TIME);
    this.networkingDeadline = new Time(NETWORKING_DEADLINE);

    this.morningDuration = MORNING_DURATION;
    this.afternoonDuration = AFTERNOON_DURATION;
    this.afternoonMinDuration = AFTERNOON_MIN_DURATION;
    this.afternoonMaxDuration = AFTERNOON_DURATION;

    this.morningSlot = [];
    this.afternoonSlot = [];
  }

  public trackConference(conference: Conference): void {
    // Checks if the conference can fit in the morning duration
    if (conference.duration <= this.morningDuration) {
      this.morningDuration -= conference.duration;
      this.morningSlot.push(`${this.morningTime} ${conference.topic}`);
      this.morningTime.add(conference.duration);
      conference.isTracked = true;
    }
    // Checks if the conference can fit in the afternoon duration
    else if (conference.duration <= this.afternoonDuration) {
      this.afternoonDuration -= conference.duration;
      this.afternoonSlot.push(`${this.afternoonTime} ${conference.topic}`);
      this.afternoonTime.add(conference.duration);
      conference.isTracked = true;
    }
  }

  /** Prepares the final track array output by combining the conferences
   * of morning and afternoon alongwith lunch and networking events
   */
  public prepareTrack(): string[] {
    this.morningSlot.push(`${this.lunchTime} Lunch`);
    if (this.afternoonDuration === 0) {
      this.afternoonSlot.push(`${this.networkingDeadline} Networking Event`);
    } else if (this.afternoonDuration < this.afternoonMaxDuration - this.afternoonMinDuration) {
      this.afternoonSlot.push(`${this.afternoonTime} Networking Event`);
    } else {
      this.afternoonSlot.push(`${this.networkingTime} Networking Event`);
    }
    return this.morningSlot.concat(this.afternoonSlot);
  }
}
