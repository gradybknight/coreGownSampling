import React from 'react';
import {connect} from 'react-redux';
import * as transactionActions from '../actions/transactionActions';
import {bindActionCreators} from 'redux';
import UsersInCore from '../components/UsersInCore';
import UserDropdown from '../components/UserDropdown';
import { Container, Row, Col, Card } from 'reactstrap';
import UserIsAlreadyInCore from '../components/UserIsAlreadyInCore';
import UserTransactionCounter from '../components/UserTransactionCounter';
import TimeTesting from '../components/TimeTesting';


class LogUsersInToCore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedUser:'',
            selectedUserIsInCore:false,
            selectedUsersEntryTransactionID:''
        };
        this.updateSelection = this.updateSelection.bind(this);
        this.isSelectedUserInCore = this.isSelectedUserInCore.bind(this);
        this.relogInUserAlreadyInCore = this.relogInUserAlreadyInCore.bind(this);

    }   

    updateSelection(event) {
        this.setState({
            selectedUser:event.target.value
        });
        this.isSelectedUserInCore(event.target.value);
    }

    isSelectedUserInCore(selectedUser) {
        let arrayOfUsersInCore = this.props.transactions.filter(transaction => transaction.exittimestamp===null);
        let informationForSelectedUser = arrayOfUsersInCore.filter(user => user.initials === selectedUser);
        if (informationForSelectedUser.length === 0) {
            this.setState({
                selectedUserIsInCore:false,
                selectedUsersEntryTransactionID:''
            })
            return false;
        } else {
            this.setState({
                selectedUserIsInCore:true,
                selectedUsersEntryTransactionID:informationForSelectedUser[0].id
            })
            return true;
        }
    }

    relogInUserAlreadyInCore() {
        let enteringPerson = this.props.users.filter(user => user.initials === this.state.selectedUser)[0];
        console.log(enteringPerson);
        let newEntryTransaction = {
            initials:enteringPerson.initials,
            team:enteringPerson.team,
            entrytimestamp:Date.now()
        }
        let existingTransactionID = {
            id:this.state.selectedUsersEntryTransactionID
        }
        this.props.transactionActions.clearExistingEntry(existingTransactionID);
        this.props.transactionActions.logNewEntry(newEntryTransaction);
        let timePeriod = this.props.timeBoundry;
        this.props.transactionActions.getTransactionsInTimePeriod(timePeriod);
    }

    render() {
        let knownInitials = this.props.users.map(user => user.initials);
        return(
            <div>
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <h1>Enter the Core</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Card>
                                    <h2>Select Person to Enter the Core</h2>
                                    <Row>
                                        <Col md="2"></Col>
                                        <Col md="8">
                                            <UserDropdown knownInitials = {knownInitials} updateSelection = {this.updateSelection}/>
                                        </Col>
                                        <Col md="2"></Col>
                                    </Row>
                                </Card>
                            </Row>
                            <Row>
                                <Card>
                                        <Row>
                                            <Col md="12">
                                                {this.state.selectedUserIsInCore ? <UserIsAlreadyInCore initials = {this.state.selectedUser} logInNewEntry = {this.relogInUserAlreadyInCore}/>: ""}
                                                <UserTransactionCounter 
                                                    transactions = {this.props.transactions}
                                                    user = {this.state.selectedUser}
                                                    timePeriod = {this.props.timeBoundry}
                                                />
                                                <TimeTesting />
                                            </Col>
                                        </Row>
                                </Card>
                                
                            </Row>
                        </Col>
                        <Col>
                            <Card>
                                <h2>People Currently in Core</h2>
                                <Row>
                                    <Col md="1"></Col>
                                    <Col md="10">
                                    <UsersInCore transactions = {this.props.transactions} />
                                    </Col>
                                    <Col md="1"></Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                
                
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        transactions:state.transactions,
        users:state.users,
        timeBoundry:state.timeBoundry
    };
}

function mapDispatchToProps(dispatch) {
    return {
        transactionActions: bindActionCreators(transactionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogUsersInToCore); 