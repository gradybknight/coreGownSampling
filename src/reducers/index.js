import {combineReducers} from 'redux';
import users from './userReducer';
import transactions from './transactionReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import timeBoundry from './timeBoundryReducer';

const rootReducer = combineReducers({
    users,
    transactions,
    ajaxCallsInProgress,
    timeBoundry
});

export default rootReducer;