import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment'

export default class UsersInCore extends React.Component {
  render() {
    // const users = this.prop.users;

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
          {this.props.users.map((user, index) => {
            let m = moment.unix(user.entrytimestamp);
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