const expect = require('chai').expect;

const config = require('../config');
const Time = require('../entities/time');
const Track = require('../entities/track');
const Conference = require('../entities/conference');

describe('Track', () => {
    describe('#trackConference()', () => {
        context('With conference duration less than the left morning duration', () => {
            let conference = new Conference('Ruby on Rails 30min', 30);
            let track;
            before(() => {
                track = new Track();
                track.trackConference(conference);
            });

            it('Should update morning duration and set conference as tracked', () => {
                expect(conference.isTracked).to.be.true;
                expect(track.morningDuration).to.be.equal(config.MORNING_DURATION - conference.duration);
            });

            it('Should add track to morningSlot and update morning time', () => {
                let morningTime = new Time(config.MORNING_TIME);
                expect(track.morningTime.toString()).to.be.equals(morningTime.add(conference.duration).toString());
                expect(track.morningSlot.length).to.be.equal(1);
            });
        });

        context('With conference duration greater than the left morning duration and less then the afternoon duration', () => {
            let conference = new Conference('Ruby on Rails 60min', 60);
            let track;
            before(() => {
                track = new Track();
                track.morningDuration = 30;
                track.trackConference(conference);
            });

            it('Should update afternoon duration and set conference as tracked', () => {
                expect(conference.isTracked).to.be.true;
                expect(track.afternoonDuration).to.be.equal(config.AFTERNOON_DURATION - conference.duration);
            });

            it('Should add track to afternoonSlot and update afternoon time', () => {
                let afternoonTime = new Time(config.AFTERNOON_TIME);
                expect(track.afternoonTime.toString()).to.be.equals(afternoonTime.add(conference.duration).toString());
                expect(track.afternoonSlot.length).to.be.equal(1);
            });
        });

        context('With conference duration greater than the left morning duration and afternoon duration as well', () => {
            let conference = new Conference('Ruby on Rails 60min', 60);
            let track;
            before(() => {
                track = new Track();
                track.morningDuration = 0;
                track.afternoonDuration = 30;
                track.trackConference(conference);
            });

            it('Should not update morning and afternoon duration', () => {
                expect(track.morningDuration).to.be.equal(0);
                expect(track.afternoonDuration).to.be.equal(30);
            });

            it('Should not set conference as tracked', () => {
                expect(conference.isTracked).to.be.false;
            });
        });
    });

    describe('#prepareTrack()', () => {
        let track;
        let result;
        function _before(duration) {
            track = new Track();
            track.afternoonDuration = duration;
            result = track.prepareTrack();
        };

        context('With afternoon duration greater than the min and max afternoon duration', () => {
            before(() => _before(100));

            it('Should add lunch in morning slot and networking with networking time in afternoon slot', () => {
                expect(track.morningSlot[0]).includes('Lunch');
                expect(track.afternoonSlot[0]).includes(track.networkingTime.toString());
                expect(result.length).to.be.equal(2);
            });
        });
    });
});
