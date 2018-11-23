import React from 'react';

export default class UserTransactionCounter extends React.Component {
    render() {
        const {transactions, user, timePeriod} = this.props;
        let countOfGowns = transactions.filter(transaction => transaction.initials === user)
                                            .filter(transaction=>transaction.entrytimestamp > timePeriod.lowerBoundry && transaction.entrytimestamp <= timePeriod.upperBoundry)
                                            .filter(transaction => transaction.gown>0)
                                            .length
        return (
            <div>
                Gowns: {countOfGowns}
            </div>
        );
  }
}