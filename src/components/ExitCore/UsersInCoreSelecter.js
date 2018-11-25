import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class UsersInCoreSelecter extends React.Component {
  
  
    render() {
    const {initials, updateSelection} = this.props;
    return (
        <FormGroup>
            <Label for="exampleSelect">Select initials of person to leave core:</Label>
            <Input 
                type="select" 
                name="select" 
                id="exampleSelect"
                onChange = {updateSelection}
            >
            <option key = {9999} id={9999}></option>
            {initials.map((initials, index)=>{
                return(<option key = {index} id={index} >{initials}</option>)
            })}
            </Input>
        </FormGroup>
    );
  }
}