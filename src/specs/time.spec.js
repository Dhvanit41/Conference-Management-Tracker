const expect = require('chai').expect;

const Time = require('../entities/time');

describe('Time', () => {
    describe('#toString()', () => {
        context('With timestring of hours and minutes less than 10', () => {
            let timestring;
            before(() => {
                const time = new Time('9:05AM');
                timestring = time.toString();
            });

            it('Should prepend 0 to hours and minutes if they are less than 10', () => {
                expect(timestring).to.be.equals('09:05AM');
            });
        });

        context('With timestring of hours and minutes greater than 10', () => {
            let timestring;
            before(() => {
                const time = new Time('11:55AM');
                timestring = time.toString();
            });

            it('Should not prepend 0 to hours and minutes if they are greater than 10', () => {
                expect(timestring).to.be.equals('11:55AM');
            });
        });
    });

    describe('#add()', () => {
        function _before(timestring, minutes) {
            const time = new Time(timestring);
            time.add(minutes);
            return time.toString();
        }

        context('When added minutes to time do not exceed 60', () => {
            let timestring = '11:55AM';
            before(() => timestring = _before(timestring, 1));

            it('Should return proper time', () => {
                expect(timestring).to.be.equals('11:56AM');
            });
        });

        context('When added minutes exceed 60 and hours are equal to 12 with AM time of day', () => {
            let timestring = '11:55AM';
            before(() => timestring = _before(timestring, 10));

            it('Should return proper time', () => {
                expect(timestring).to.be.equals('12:05PM');
            });
        });

        context('When added minutes exceed 60 and hours are equal than 12 with PM time of day', () => {
            let timestring = '11:55PM';
            before(() => timestring = _before(timestring, 10));

            it('Should return proper time', () => {
                expect(timestring).to.be.equals('00:05AM');
            });
        });
    });
});
