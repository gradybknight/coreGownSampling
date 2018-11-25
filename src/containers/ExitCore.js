import React from 'react';
import {connect} from 'react-redux';
import * as transactionActions from '../actions/transactionActions';
import {bindActionCreators} from 'redux';
import { Container, Row, Col } from 'reactstrap';
import * as transactionManipulations from '../api/transactionManipulations';
import UsersInCoreSelecter from '../components/ExitCore/UsersInCoreSelecter';
import UsersTransactions from '../components/ExitCore/UsersTransactions';
import UserExitCoreSummaryCard from '../components/ExitCore/UserExitCoreSummaryCard';


class ExitCore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedUser:'',
            selectedUsersEntryTransactionID:'',
            selectedGownSamples:false,
            selectedGloveSamples:false
        };
        this.updateSelection = this.updateSelection.bind(this);
        this.clickedGown = this.clickedGown.bind(this);
        this.clickedGloves = this.clickedGloves.bind(this);
        this.exitTheCore = this.exitTheCore.bind(this)
    }   

    updateSelection(event) {
        let selectedUser = event.target.value;
        let selectedUsersEntryTransactionID = '';
        if (selectedUser !== '') {
            selectedUsersEntryTransactionID = this.props.transactions.filter(transaction => transaction.initials === selectedUser).filter(transaction => transaction.exittimestamp === null)[0].id;
        }
        this.setState({
            selectedUser:selectedUser,
            selectedUsersEntryTransactionID:selectedUsersEntryTransactionID
        });
    }

    exitTheCore() {
        let exitTransaction = {
            id:this.state.selectedUsersEntryTransactionID,
            initials:this.state.selectedUser,
            exittimestamp:Date.now(),
            gown:0,
            glove:0
        }
        if (this.state.selectedGownSamples) { exitTransaction.gown = 1 };
        if (this.state.selectedGloveSamples) { exitTransaction.glove = 1 };
        console.log(exitTransaction);
        this.props.transactionActions.logExit(exitTransaction);
    }

    clickedGown() {
        let currentState = this.state.selectedGownSamples;
        this.setState({
            selectedGownSamples:!currentState
        });
    }
    clickedGloves() {
        let currentState = this.state.selectedGloveSamples;
        this.setState({
            selectedGloveSamples:!currentState
        });
    }


    render() {
        let usersInCore = transactionManipulations.usersInCore(this.props.transactions);
        let selectedUsersTransactions = this.props.transactions.filter(transaction => transaction.initials === this.state.selectedUser);
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm="4">
                            <Row>
                                <UsersInCoreSelecter initials = {usersInCore} updateSelection = {this.updateSelection}/>    
                            </Row>
                            <Row>
                                {this.state.selectedUser !==''?
                                    <UserExitCoreSummaryCard 
                                        transactions = {this.props.transactions}
                                        initials = {this.state.selectedUser}
                                        exitTheCore = {this.exitTheCore}
                                        timeBoundry = {this.props.timeBoundry}
                                        selectedGloves = {this.state.selectedGloveSamples}
                                        selectedGown = {this.state.selectedGownSamples}
                                        clickedGown = {this.clickedGown}
                                        clickedGloves = {this.clickedGloves}
                                    />:
                                    <div></div>
                                }
                            </Row>
                        </Col>
                        <Col sm="8">
                            <Row>
                                Users current Transaction
                                <UsersTransactions transactions = {selectedUsersTransactions} />
                            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExitCore); 