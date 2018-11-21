import * as types from '../actions/actionTypes';

export default function userReducer(state = [], action) {
    switch(action.type) {
        case types.ADD_USER:
            console.log(action.user);    
            return [...state,
                Object.assign({}, action.user)
            ];
        case types.GET_ALL_KNOWN_USERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}