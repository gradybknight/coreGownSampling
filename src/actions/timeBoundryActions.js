import * as types from './actionTypes';

export function setTimeBoundry(lowerBoundry, upperBoundry) {
    let payload = {
        upperBoundry: upperBoundry,
        lowerBoundry: lowerBoundry
    }
    return ({type: types.SET_TIME_BOUNDRY, payload});
}