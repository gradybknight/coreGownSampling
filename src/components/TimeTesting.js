import React from 'react';
import * as transactionManipulations from '../api/transactionManipulations';

export default class TimeTesting extends React.Component {
    
    
    render() {
        let timePeriod = { //This week
            lowerBoundry:1542625200000,
            upperBoundry:1543230000000
        };
        // let timePeriod = {  //Today
        //     lowerBoundry:1542970800000,
        //     upperBoundry:1543014000000
        // };
        let holder = transactionManipulations.countOfEntriesByDay('gyk',this.props.transactions, timePeriod);
        console.log(holder);
        // console.log(transactionManipulations.numberOfEntryDays(holder));
        return (
            <div>
                time tester
            </div>
        );
  }
}

