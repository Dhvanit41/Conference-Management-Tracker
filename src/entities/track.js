const Time = require('./time');
const config = require('../config');

class Track {
    constructor() {
        this.morningTime = new Time(config.MORNING_TIME);
        this.lunchTime = new Time(config.LUNCH_TIME);
        this.afternoonTime = new Time(config.AFTERNOON_TIME);
        this.networkingTime = new Time(config.NETWORKING_TIME);
        this.networkingDeadline = new Time(config.NETWORKING_DEADLINE);

        this.morningDuration = config.MORNING_DURATION;
        this.afternoonDuration = config.AFTERNOON_DURATION;
        this.afternoonMinDuration = config.AFTERNOON_MIN_DURATION;
        this.afternoonMaxDuration = config.AFTERNOON_DURATION;

        this.morningSlot = [];
        this.afternoonSlot = [];
    }

    trackConference(conference) {
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
    prepareTrack() {
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

module.exports = Track;
