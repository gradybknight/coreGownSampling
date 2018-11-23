import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function timeBoundryReducer(state = initialState.timeBoundries, action) {
    switch(action.type) {
        case types.SET_TIME_BOUNDRY:
            return Object.assign({}, action.payload);
        case types.SET_OVERALL_TIME_BOUNDRIES:
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}
