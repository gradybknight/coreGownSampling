import moment from 'moment';

export function getShiftTimeBoundries(timeValue) { // returns time bounds as number
    let sixHundred = moment({hour: 6, minute: 0, seconds: 0}); 
    let eighteenHundred = moment({hour: 18, minute:0, seconds:0});
    let selectedTime = moment(timeValue);
    let shiftTimeBoundries = {
            lowerBoundry:'',
            upperBoundry:''
    };
    if (selectedTime < sixHundred) {
        shiftTimeBoundries.lowerBoundry = eighteenHundred.subtract(1, 'days').unix()*1000;
        shiftTimeBoundries.upperBoundry = sixHundred.unix()*1000;
        shiftTimeBoundries.lowerBoundryReadable = moment(shiftTimeBoundries.lowerBoundry).format('DD-MMM-YYYY HH:mm:ss');
        shiftTimeBoundries.upperBoundryReadable = moment(shiftTimeBoundries.upperBoundry).format('DD-MMM-YYYY HH:mm:ss');
        return shiftTimeBoundries;
    } else if (selectedTime >= sixHundred && selectedTime < eighteenHundred ) {
        shiftTimeBoundries.lowerBoundry = sixHundred.unix()*1000;
        shiftTimeBoundries.upperBoundry = eighteenHundred.unix()*1000;
        shiftTimeBoundries.lowerBoundryReadable = moment(shiftTimeBoundries.lowerBoundry).format('DD-MMM-YYYY HH:mm:ss');
        shiftTimeBoundries.upperBoundryReadable = moment(shiftTimeBoundries.upperBoundry).format('DD-MMM-YYYY HH:mm:ss');
        return shiftTimeBoundries;
    } else {
        shiftTimeBoundries.lowerBoundry = eighteenHundred.unix()*1000;
        shiftTimeBoundries.upperBoundry = sixHundred.add(1, 'days').unix()*1000;
        shiftTimeBoundries.lowerBoundryReadable = moment(shiftTimeBoundries.lowerBoundry).format('DD-MMM-YYYY HH:mm:ss');
        shiftTimeBoundries.upperBoundryReadable = moment(shiftTimeBoundries.upperBoundry).format('DD-MMM-YYYY HH:mm:ss');
        return shiftTimeBoundries;
    }
}

export function getWeekTimeBoundries(timeValue) {
    let selectedDate = moment(timeValue);
    let sixHundred = moment({hour: 6, minute: 0, seconds: 0});
    let weekTimeBoundries = {
        lowerBoundry:'',
        upperBoundry:''
    };

    if (selectedDate.isBefore(sixHundred) && selectedDate.day() === 0) {
        console('before six');
        // this is for before 06:00 on mondays.  Need to set week to previous week
        let lowerPlaceholder = moment(selectedDate).subtract(7,'days');
        let lowerBoundry = moment().set({
            'year': lowerPlaceholder.get('year'),
            'months':lowerPlaceholder.get('months')+1,
            'date': lowerPlaceholder.get('date'),
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        let upperBoundry = moment().set({
            'year': selectedDate.get('year'),
            'date': selectedDate.get('date'),
            'months': selectedDate.get('months')+1,
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        weekTimeBoundries.lowerBoundry = lowerBoundry.unix()*1000;
        weekTimeBoundries.upperBoundry = upperBoundry.unix()*1000;
        return weekTimeBoundries;
    } else {
        // for anything after 0600 monday, set lower bound to 0600 monday of week
        //    and upper bound to 0600 of next monday
        let dayOfWeek = moment(selectedDate).day();
        let dayOfWeekSubtractor = {};
        let dayOfWeekAdder = {};
        if (dayOfWeek === 0) {
            dayOfWeekSubtractor=6;
            dayOfWeekAdder = 1;
        } else {
            dayOfWeekSubtractor = moment(selectedDate).day()-1;
            dayOfWeekAdder = 7-dayOfWeekSubtractor;
        }
        console.log(moment(selectedDate).toObject());
        let lowerPlaceholder = moment(selectedDate).subtract(dayOfWeekSubtractor, 'days');
        let upperPlaceholder = moment(selectedDate).add(dayOfWeekAdder, 'days');
        let lowerBoundry = moment().set({
            'year': lowerPlaceholder.get('year'),
            'months':lowerPlaceholder.get('months'),
            'date': lowerPlaceholder.get('date'),
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        let upperBoundry = moment().set({
            'year': upperPlaceholder.get('year'),
            'months':lowerPlaceholder.get('months')+1,
            'date': upperPlaceholder.get('date'),
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        weekTimeBoundries.lowerBoundry = lowerBoundry.unix()*1000;
        weekTimeBoundries.upperBoundry = upperBoundry.unix()*1000;
        weekTimeBoundries.lowerBoundryReadable = lowerBoundry.format('DD-MMM-YYYY HH:mm:ss');
        weekTimeBoundries.upperBoundryReadable = upperBoundry.format('DD-MMM-YYYY HH:mm:ss');
        console.log(weekTimeBoundries);
        return weekTimeBoundries;
    }
}