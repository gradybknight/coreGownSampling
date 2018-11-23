import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment'

export default class UsersInCoreAllTransactions extends React.Component {
  render() {
    let usersInCore = this.props.transactions.filter(transaction => transaction.exittimestamp === null);
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Initials</th>
            <th>Entered Core</th>
          </tr>
        </thead>

        <tbody>
          {usersInCore.map((user, index) => {
            let m = moment.unix(user.entrytimestamp/1000);
            let formattedTime = m.format('DD-MMM-YYYY hh:mm:ss');
            return(
              <tr key = {index}>
                <td>{index+1}</td>
                <td>{user.initials}</td>
                <td>{formattedTime}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}