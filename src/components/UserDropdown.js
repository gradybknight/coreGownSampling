import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class UserDropdown extends React.Component {
  
  
    render() {
    return (
        <FormGroup>
            <Label for="exampleSelect">Select initials of person to log in to core:</Label>
            <Input 
                type="select" 
                name="select" 
                id="exampleSelect"
                onChange = {this.props.updateSelection}
            >
            <option key = {9999} id={9999}></option>
            {this.props.knownInitials.map((initials, index)=>{
                return(<option key = {index} id={index} >{initials}</option>)
            })}
            </Input>
        </FormGroup>
    );
  }
}