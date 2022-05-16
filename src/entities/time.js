class Time {
    constructor(timeString) {
        // To construct time object via the timestrings like '9:00AM'
        this.timeOfDay = timeString.toLowerCase().endsWith('am') ? 'AM' : 'PM';
        timeString = timeString.slice(0, -2);
        this.hours = parseInt(timeString.split(':')[0]);
        this.minutes = parseInt(timeString.split(':')[1]);
    }

    // To add minutes to an existing time object
    add(minutes) {
        this.minutes += minutes;
        if (this.minutes >= 60) {
            this.hours += parseInt(this.minutes / 60);
            this.minutes = this.minutes % 60;
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
}

module.exports = Time;
