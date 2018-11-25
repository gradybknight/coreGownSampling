import React from 'react';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import * as transactionManipulations from '../../api/transactionManipulations';
import moment from 'moment';



export default class UserExitCoreSummaryCard extends React.Component {
  
  
    render() {
        const {transactions, initials, exitTheCore, timeBoundry, selectedGown, selectedGloves, clickedGown, clickedGloves} = this.props;
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
        let buttonColor = 'danger';
        console.log(`${initials} glove: ${hasValidGloveSampleForToday} gown: ${hasValidGownSamples}`)
        if (hasValidGloveSampleForToday && hasValidGownSamples) {
            buttonColor = 'success';
        }
        let gownButtonColor;
        let gloveButtonColor;
        if (selectedGown) {
            gownButtonColor = 'primary'
        } else {
            gownButtonColor = 'secondary'
        }
        if (selectedGloves) {
            gloveButtonColor = 'primary'
        } else {
            gloveButtonColor = 'secondary'
        }
        return (
            <Container>
                <Row>
                    <h3>{initials}</h3> 
                    <p>
                        {initials} has entered the core {numberOfDaysWithAnEntryThisWeek} days this week <br/>
                        {initials} has {numberOfGownSamplesThisWeek} valid gown samples this week
                    </p>
                        {hasValidGloveSampleForToday?<div>{initials} has a valid glove sample in +/- 12 hours from {currentTime}</div>:<div>{initials} does not have a valid glove sample in +/- 12 hours from {moment(currentTime).format('DDMMMYY HH:mm:ss')}</div>}
                    {hasValidGloveSampleForToday?<Alert color='success'>Gloves are good</Alert>:<Alert color='danger'>Need glove samples </Alert>}
                    {hasValidGownSamples?<Alert color='success'>Gown samples are good</Alert>:<Alert color='danger'>Need gown samples </Alert>}
                </Row>
                <Row>
                    <Col sm="12">
                        <h3>Select which samples</h3>
                    </Col>
                    <Row>
                        <Col sm="6">
                            <Button
                                color = {gownButtonColor}
                                onClick = {clickedGown}
                            >
                                Gown Samples
                            </Button>
                        </Col>
                        <Col sm="6">
                            <Button
                                color = {gloveButtonColor}
                                onClick = {clickedGloves}
                            >
                                Glove Samples
                            </Button>
                        </Col>
                    </Row>
                    
                </Row>
                <Row>
                    <Col sm="12">
                        <Row>
                            <br/>
                        </Row>
                        <Row>
                            <Button 
                                color={buttonColor}
                                onClick={exitTheCore}
                            >
                                Log {initials} out of the core
                            </Button>
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        );
  }
}