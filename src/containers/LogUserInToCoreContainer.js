import React from 'react';
import {connect} from 'react-redux';
import * as tranactionActions from '../actions/transactionActions';
import {bindActionCreators} from 'redux';
import UsersInCore from '../components/UsersInCore';

class LogUsersInToCore extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };

    }   

    // componentDidMount() {
    //     this.props.transactionActions.getUsersInCore();
    // }

    render() {
        let usersInCore = this.props.transactions.filter(transaction => transaction.exittimestamp === null);
        return(
            <div>
                <UsersInCore users = {usersInCore}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        transactions:state.transactions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        transactionActions: bindActionCreators(tranactionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogUsersInToCore); //mapDispatchToProps is omitted so connect injects dispatch (referenced as this.props.dispatch)