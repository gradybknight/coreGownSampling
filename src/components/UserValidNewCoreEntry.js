import React from 'react';
import { Button } from 'reactstrap';
import * as transactionManipulations from '../api/transactionManipulations';
import moment from 'moment';


export default class UserValidNewCoreEntry extends React.Component {
  
  
    render() {
        const {transactions, initials, logInNewEntry, timeBoundry} = this.props;
        let currentTime = Date.now();
        let weekBoundries = {
            lowerBoundry:timeBoundry.lowerBoundry,
            upperBoundry:timeBoundry.upperBoundry
        }
        let entriesInformation = transactionManipulations.countOfEntriesByDay(initials,transactions,weekBoundries);
        let numberOfDaysWithAnEntryThisWeek = transactionManipulations.numberOfEntryDays(entriesInformation);
        let hasValidGloveSampleForToday = transactionManipulations.forTimePointAndUserIsThereGloveSample(initials,transactions,currentTime);
        let numberOfGownSamplesThisWeek = transactionManipulations.countOfGownSamplesInTimePeriodForUser(initials,transactions,weekBoundries);
        return (
            <div>
                <h3>{initials}</h3> 
                <p>{initials} has entered the core {numberOfDaysWithAnEntryThisWeek} times this week</p>
                <p>{initials} has {numberOfGownSamplesThisWeek} valid gown samples this week</p>
                {hasValidGloveSampleForToday?<p>{initials} has a valid glove sample in +/- 12 hours from {currentTime}</p>:<p>{initials} does not have a valid glove sample in +/- 12 hours from {moment(currentTime).format('DDMMMYY HH:mm:ss')}</p>}
                
                
                
                <Button 
                    color="primary"
                    onClick={logInNewEntry}
                >
                    Log {initials} in to core
                </Button>
            </div>
        );
  }
}