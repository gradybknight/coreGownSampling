import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function getUsersInCoreSuccess(payload) {
    return ({type: types.GET_USERS_IN_CORE_SUCCESS, payload});
};
export function getUsersInCore(){
    return function (dispatch) {
        dispatch(beginAjaxCall());
        axios.get('http://50.19.1.144:3000/usersincore')
            .then(function (response) {
                let payload = response.data;
                dispatch(getUsersInCoreSuccess(payload));
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw(error);
            });
    };
};

export function getTransactionsInTimePeriodSuccess(payload){
    return ({type: types.GET_TRANSACTIONS_IN_TIME_PERIOD_SUCCESS, payload});
};
export function getTransactionsInTimePeriod(timeBoundries){
    return function (dispatch) {
        dispatch(beginAjaxCall());
        axios.post('http://50.19.1.144:3000/transactionsintimeperiod', timeBoundries)
            .then(function (response) {
                let payload = response.data;
                dispatch(getTransactionsInTimePeriodSuccess(payload));
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw(error);
            });
    }; 
};