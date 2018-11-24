import moment from 'moment';

// Business rules
// A) Glove sample every day:
//    1. countOfGloveSamplesInTimePeriodForUser(pass in shiftBoundry as timePeriod)
// B) Gown samples 
//    1. if >= two days of entries then 2 gown samples
//        a. countOfEntriesByDay(pass in weekBoundry)
//        b. .numberOfEntryDays(array from 1a) --> number of entries
//        c. countOfGloveSamplesInTimePeriodForUser(pass in weekBoundry) --> number of gown samples taken

export function allTransactionsForUserInTimePeriod(initials, transactions, timePeriod) {  //returns array of transactions
    let matchingTransactions = transactions.filter(transaction => transaction.initials === initials)
                                            .filter(transaction => (transaction.entrytimestamp >= timePeriod.lowerBoundry && transaction.entrytimestamp < timePeriod.upperBoundry));
    return matchingTransactions;
};

export function userIsCurrentlyLoggedAsInCore(initials, transactions) { //returns boolean
    let matchingTransactions = transactions.filter(transaction => transaction.initials === initials)
                                            .filter(transaction => transaction.exittimestamp === null);
    if (matchingTransactions.length > 0) {
        return true;
    } else {
        return false;
    }
}

export function usersInCore(transactions) { //returns array of initials
    let usersInCore = transactions.filter(transaction => transaction.exittimestamp === null)
                                    .map(transaction => transaction.initials);
    return usersInCore;

}

export function countOfGownSamplesInTimePeriodForUser(initials, transactions, timePeriod) { //returns count as integer
    let gownCount = 0;
    allTransactionsForUserInTimePeriod(initials, transactions, timePeriod).forEach(transaction =>{
        gownCount=gownCount + transaction.gown;
    });
    return gownCount;
}

export function countOfGloveSamplesInTimePeriodForUser(initials, transactions, timePeriod) { //returns count as integer
    var gloveCount = 0;
    allTransactionsForUserInTimePeriod(initials, transactions, timePeriod).forEach(transaction =>{
        gloveCount = gloveCount + transaction.glove;
    });
    return gloveCount;
}

export function truncateTimeFromMomentObjectAndReturnMoment(momentTimeObject) { // moment.js object
    let placeholder = momentTimeObject.toObject();
    let returnedMomentTimeObject = moment().set({
        'year': placeholder.year,
        'months': placeholder.month,
        'date': placeholder.date,
        'hour':0,
        'minute':0,
        'second':0,
        'millisecond':0
    });
    return returnedMomentTimeObject;
}

export function countOfEntriesByDay(initials, transactions, timePeriod) { // array of {date as epochTime, entryCount}
    let usersTransactions = allTransactionsForUserInTimePeriod(initials,transactions, timePeriod);
    let minDay = truncateTimeFromMomentObjectAndReturnMoment(moment(timePeriod.lowerBoundry));
    let maxDay = truncateTimeFromMomentObjectAndReturnMoment(moment(timePeriod.upperBoundry));
    let numberOfDaysInTimePeriod = maxDay.diff(minDay,"days");
    let returnedArray = []
    console.log(numberOfDaysInTimePeriod);
    for (let i = 0; i <= numberOfDaysInTimePeriod; i++) {

        // ******************************************************** //
        // moment objects are muteable.  need to fix as .add is f'd //
        // ******************************************************** //

        let testedDate = minDay.add(i,'days');
        console.log(testedDate);
        let counter = 0;
        let dateSummaryObject = {dateAsEpoch:'',entries:0}
        usersTransactions.forEach(transaction => {
            let truncatedTransactionDate = truncateTimeFromMomentObjectAndReturnMoment(moment(transaction.entrytimestamp));
            if (testedDate.isSame(truncatedTransactionDate)) {
                counter++;
            } 
        });
        dateSummaryObject.dateAsEpoch = testedDate.unix()*1000;
        dateSummaryObject.entries = counter;
        returnedArray.push(dateSummaryObject);
    }
    return returnedArray;
}

export function numberOfEntryDays(arrayFromCountOfEntriesByDay) { // returns count of number of days entering core
    let entryDayCounter = 0;
    arrayFromCountOfEntriesByDay.forEach(entry => {
        if (entry.entries > 0) {
            entryDayCounter++;
        }
    });
    return entryDayCounter;
}
