import React from 'react';
import { Button, Alert } from 'reactstrap';
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
        let hasValidGownSamples = false;
        if (numberOfDaysWithAnEntryThisWeek <= 1) {
            hasValidGownSamples = false;
        } else if (numberOfDaysWithAnEntryThisWeek >= 2){
            if (numberOfGownSamplesThisWeek >=2) {
                hasValidGownSamples = true;
            } else {
                hasValidGownSamples = false;
            }
        } 
        return (
            <div>
                <h3>{initials}</h3> 
                <p>
                    {initials} has entered the core {numberOfDaysWithAnEntryThisWeek} times this week <br/>
                    {initials} has {numberOfGownSamplesThisWeek} valid gown samples this week
                </p>
                    {hasValidGloveSampleForToday?<div>{initials} has a valid glove sample in +/- 12 hours from {currentTime}</div>:<div>{initials} does not have a valid glove sample in +/- 12 hours from {moment(currentTime).format('DDMMMYY HH:mm:ss')}</div>}
                {hasValidGloveSampleForToday?<Alert color='success'>Gloves are good</Alert>:<Alert color='danger'>Need glove samples </Alert>}
                {hasValidGownSamples?<Alert color='success'>Gown samples are good</Alert>:<Alert color='danger'>Need gown samples </Alert>}
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