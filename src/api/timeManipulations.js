import moment from 'moment';

export function getShiftTimeBoundries(timeValue) { // returns time bounds as number
    let sixHundred = moment({hour: 6, minute: 0, seconds: 0}); 
    let eighteenHundred = moment({hour:18, minute:0, seconds:0});
    let selectedTime = moment(timeValue);
    let shiftTimeBoundries = {
            lowerBoundry:'',
            upperBoundry:''
    };
    if (selectedTime < sixHundred) {
        shiftTimeBoundries.lowerBoundry = eighteenHundred.subtract(1, 'days').unix()*1000;
        shiftTimeBoundries.upperBoundry = sixHundred.unix()*1000;
        return shiftTimeBoundries;
    } else if (selectedTime >= sixHundred && selectedTime < eighteenHundred ) {
        shiftTimeBoundries.lowerBoundry = sixHundred.unix()*1000;
        shiftTimeBoundries.upperBoundry = eighteenHundred.unix()*1000;
        return shiftTimeBoundries;
    } else {
        shiftTimeBoundries.lowerBoundry = eighteenHundred.unix()*1000;
        shiftTimeBoundries.upperBoundry = sixHundred.add(1, 'days').unix()*1000;
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
        // this is for before 06:00 on mondays.  Need to set week to previous week
        let lowerPlaceholder = moment(selectedDate).subtract(7,'days');
        let lowerBoundry = moment().set({
            'year': lowerPlaceholder.get('year'),
            'date': lowerPlaceholder.get('date'),
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        let upperBoundry = moment().set({
            'year': selectedDate.get('year'),
            'date': selectedDate.get('date'),
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
        let dayOfWeekSubtractor = moment(selectedDate).day()-1;
        let dayOfWeekAdder = 7-dayOfWeekSubtractor;
        let lowerPlaceholder = moment(selectedDate).subtract(dayOfWeekSubtractor, 'days');
        let upperPlaceholder = moment(selectedDate).add(dayOfWeekAdder, 'days');
        let lowerBoundry = moment().set({
            'year': lowerPlaceholder.get('year'),
            'date': lowerPlaceholder.get('date'),
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        let upperBoundry = moment().set({
            'year': upperPlaceholder.get('year'),
            'date': upperPlaceholder.get('date'),
            'hour':6,
            'minute':0,
            'second':0,
            'millisecond':0
        });
        weekTimeBoundries.lowerBoundry = lowerBoundry.unix()*1000;
        weekTimeBoundries.upperBoundry = upperBoundry.unix()*1000;
        return weekTimeBoundries;
    }
}