import React from 'react';
import * as transactionManipulations from '../api/transactionManipulations';

export default class TimeTesting extends React.Component {
    
    
    render() {
        let timePeriod = { //This week
            lowerBoundry:1542625200000,
            upperBoundry:1543230000000
        };
        let thursdayTimePeriod = {  //Today
            lowerBoundry:1542866400000,
            upperBoundry:1542909600000
        };
        let holder = transactionManipulations.countOfEntriesByDay('gyk',this.props.transactions, timePeriod);
        // console.log(`gyk transactions for week:`)
        // console.log(holder);
        // console.log(`glove samples for thursday: ${transactionManipulations.countOfGloveSamplesInTimePeriodForUser('gyk',this.props.transactions, thursdayTimePeriod)}`);
        // console.log(`gown count: ${transactionManipulations.countOfGownSamplesInTimePeriodForUser('gyk',this.props.transactions, timePeriod)}`);
        // console.log(`users in core: ${transactionManipulations.usersInCore(this.props.transactions)}`);
        // console.log(transactionManipulations.forTimePointAndUserIsThereGloveSample('gyk',this.props.transactions,1543230000000));
        return (
            <div>
                time tester
            </div>
        );
  }
}

