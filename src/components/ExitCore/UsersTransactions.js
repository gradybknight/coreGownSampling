import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment'

export default class UsersTransactions extends React.Component {
  render() {
    const { transactions } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Entered Core</th>
            <th>Exited Core</th>
            <th>Glove</th>
            <th>Gown</th>
          </tr>
        </thead>

        <tbody>
            {transactions.map((transaction, index) => {
                let entryTime = moment(transaction.entrytimestamp).format('DDMMMYY HH:mm:ss');
                let exitTime=transaction.exittimestamp;
                if (exitTime) {
                    exitTime = moment(transaction.entrytimestamp).format('DDMMMYY HH:mm:ss');
                } else {
                    exitTime = 'n/a';
                }

                return(
                    <tr key = {index}>
                        <td>{index +1 }</td>
                        <td>{entryTime}</td>
                        <td>{exitTime}</td>
                        <td>{transaction.glove?'yes':'no'}</td>
                        <td>{transaction.gown?'yes':'no'}</td>
                    </tr>
                )
            })
          }
          
        </tbody>
      </Table>
    );
  }
}