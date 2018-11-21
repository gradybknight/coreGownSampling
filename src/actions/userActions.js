import * as types from './actionTypes';
import axios from 'axios';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function addUser(user) {
    return { type: types.ADD_USER, user:user}
};

export function getAllKnownUsersSuccess(payload) {
    return {type:types.GET_ALL_KNOWN_USERS_SUCCESS, payload};
};

export function getAllKnownUsers() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        axios.get('http://50.19.1.144:3000/getallknownusers')
            .then((response) => {
                let payload = response.data;
                dispatch(getAllKnownUsersSuccess(payload));
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw(error);
            });
    };
};

