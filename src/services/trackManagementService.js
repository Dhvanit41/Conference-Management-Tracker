const Conference = require('../entities/conference');

class TrackManagementService {
    constructor() {
        this.conferenceList = [];
        this.trackList = [];
    }

    // filter valid Conference List
    getValidConferenceList(conferences) {
        for (const talk of conferences) {
            let duration = talk.split(' ').pop();
            if (duration.toLowerCase() === 'lightning') {
                duration = 5;
            } else if (duration.toLowerCase().endsWith('min')) {
                duration = parseInt(duration.slice(0, -3));
            } else {
                throw new Error(`Talk: ${talk} contains an invalid duration.`);
            }
            this.conferenceList.push(new Conference(talk, duration));
        }
        this.conferenceList.sort((c1, c2) => c1.duration < c2.duration);
    }
}

module.exports = TrackManagementService;