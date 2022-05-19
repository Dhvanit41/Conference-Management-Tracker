export default class Time {
  // fields
  private timeOfDay: string;

  private hours: number;

  private minutes: number;

  constructor(timeString: string) {
    // To construct time object via the timestrings like '9:00AM'
    this.timeOfDay = timeString.toLowerCase().endsWith('am') ? 'AM' : 'PM';
    const localTimeString = timeString.slice(0, -2);
    this.hours = parseInt(localTimeString.split(':')[0], 10);
    this.minutes = parseInt(localTimeString.split(':')[1], 10);
  }

  // To add minutes to an existing time object
  public add(minutes: number): Time {
    this.minutes += minutes;
    if (this.minutes >= 60) {
      this.hours += Math.floor(this.minutes / 60);
      this.minutes %= 60;
      if (this.hours > 12 && this.timeOfDay === 'AM') {
        this.hours -= 12;
        this.timeOfDay = 'PM';
      } else if (this.hours > 12 && this.timeOfDay === 'PM') {
        this.hours -= 12;
        this.timeOfDay = 'AM';
      } else if (this.hours === 12 && this.timeOfDay === 'AM') {
        this.hours = 12;
        this.timeOfDay = 'PM';
      } else if (this.hours === 12 && this.timeOfDay === 'PM') {
        this.hours = 0;
        this.timeOfDay = 'AM';
      }
    }
    return this;
  }

  // Formats a Time object to string like '11:00AM'
  public toString(): string {
    return `${this.hours > 9 ? this.hours : `0${this.hours}`}:${this.minutes <= 9 ? `0${this.minutes}` : this.minutes}${
      this.timeOfDay
    }`;
  }
}
