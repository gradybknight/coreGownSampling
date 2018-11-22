import React from 'react';
import { Button } from 'reactstrap';

export default class UserIsAlreadyInCore extends React.Component {
  
  
    render() {
    return (
        <div>
            <h3>{this.props.initials} is already in the core</h3> 
            <Button 
                color="warning"
                onClick={this.props.logInNewEntry}
            >
                Clear existing entry and log new
            </Button>
        </div>
    );
  }
}