import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function transactionReducer(state = initialState.transactions, action) {
    switch(action.type) {
        case types.GET_USERS_IN_CORE_SUCCESS:
            return [ ...state,
                Object.assign({}, ...action.payload)
            ];

        case types.GET_TRANSACTIONS_IN_TIME_PERIOD_SUCCESS:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
}