import * as types from './actionTypes';

export function setTimeBoundry(lowerBoundry, upperBoundry) {
    let payload = {
        upperBoundry: upperBoundry,
        lowerBoundry: lowerBoundry,
    }
    return ({type: types.SET_TIME_BOUNDRY, payload});
}

export function setOverallTimeBoundries(weekBoundry, shiftBoundry) {
    let payload = {
        lowerBoundry: weekBoundry.lowerBoundry,
        upperBoundry: weekBoundry.upperBoundry,
        shiftLowerBoundry: shiftBoundry.lowerBoundry,
        shiftUpperBoundry: shiftBoundry.upperBoundry
    }
    return ({type: types.SET_OVERALL_TIME_BOUNDRIES, payload});
}