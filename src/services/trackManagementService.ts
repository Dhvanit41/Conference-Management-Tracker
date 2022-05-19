/* eslint-disable no-restricted-syntax */
import Conference from '../entities/conference';
import Track from '../entities/track';

export default class TrackManagementService {
  // fields
  private conferenceList: Conference[];

  private trackList: string[][];

  constructor() {
    this.conferenceList = [];
    this.trackList = [];
  }

  // filter valid Conference List in order by desc to asc
  public getValidConferenceList(conferences: string[]): void {
    conferences.forEach((talk) => {
      const duration = talk.trim().split(' ').pop();
      let time: number;
      if (duration) {
        if (duration.toLowerCase() === 'lightning') {
          time = 5;
        } else if (duration.toLowerCase().endsWith('min')) {
          time = parseInt(duration.slice(0, -3), 10);
        } else {
          throw new Error(`Talk: ${talk} contains an invalid duration.`);
        }
        this.conferenceList.push(new Conference(talk, time));
      }
    });
    // for (const talk of conferences) {

    // }
    this.conferenceList.sort((c1, c2) => (c1.duration < c2.duration ? 1 : -1));
  }

  // Computes the final track array
  public computeTracks(): void {
    while (this.conferenceList.length > 0) {
      const track = new Track();
      this.conferenceList.forEach((conference) => {
        track.trackConference(conference);
      });
      this.trackList.push(track.prepareTrack());
      this.conferenceList = this.conferenceList.filter((conference) => !conference.isTracked);
    }
  }

  public displayTracks(): void {
    this.trackList.forEach((talkArray, index) => {
      console.log(index);
      console.log(`Track ${index + 1}:`);
      console.log(`${talkArray.join('\n')}\n`);
    });
  }
}
