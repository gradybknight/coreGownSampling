import moment from 'moment';


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
        gownCount =+ transaction.gown;
    });
    return gownCount;
}

export function countOfGloveSamplesInTimePeriodForUser(initials, transactions, timePeriod) { //returns count as integer
    let gloveCount = 0;
    allTransactionsForUserInTimePeriod(initials, transactions, timePeriod).forEach(transaction =>{
        gloveCount =+ transaction.glove;
    });
    return gloveCount;
}

export function countOfEntriesByDay(initials, transactions, timePeriod) { // array of {date, entryCount}
    let usersTransactions = allTransactionsForUserInTimePeriod(initials,transactions, timePeriod);
    let minDay = moment(timePeriod.lowerBoundry);
    let maxDay = moment(timePeriod.upperBoundry);
    let numberOfDaysInTimePeriod = maxDay.diff(minDay,"days");
}