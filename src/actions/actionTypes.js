// Transaction calls
export const GET_USERS_IN_CORE_SUCCESS = 'GET_USERS_IN_CORE_SUCCESS'
export const GET_TRANSACTIONS_IN_TIME_PERIOD_SUCCESS = 'GET_TRANSACTIONS_IN_TIME_PERIOD_SUCCESS'
export const CLEAR_EXISTING_ENTRY_SUCCESS = 'CLEAR_EXISTING_ENTRY_SUCCESS'
export const LOG_NEW_ENTRY_SUCCESS = 'LOG_NEW_ENTRY_SUCCESS'
export const LOG_EXIT_SUCCESS = 'LOG_EXIT_SUCCESS'

// AJAX call tracking
export const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';
export const AJAX_CALL_ERROR = 'AJAX_CALL_ERROR';

// Time boundry book keeping
export const SET_TIME_BOUNDRY = 'SET_TIME_BOUNDRY';
export const SET_OVERALL_TIME_BOUNDRIES = 'SET_OVERALL_TIME_BOUNDRIES'



//Below is not used
// user actions -- list all known users, modify user's information
export const MODIFY_USERS_INFORMATION = 'MODIFY_USERS_INFORMATION';
export const GET_ALL_KNOWN_USERS_SUCCESS = 'GET_ALL_KNOWN_USERS_SUCCESS';
export const ADD_USER = 'ADD_USER'

// transaction actions -- entering core, exiting core, querrying a week's transactions
export const USER_ENTERS_CORE = 'USER_ENTERS_CORE';
export const USER_EXITS_CORE = 'USER_EXITS_CORE';
export const GET_WEEKS_TRANSACTIONS = 'GET_WEEKS_TRANSACTIONS';