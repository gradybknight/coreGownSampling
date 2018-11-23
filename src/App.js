import React, { Component } from 'react';
import './App.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {getAllKnownUsers} from './actions/userActions';
import LogUserInToCoreContainer from './containers/LogUserInToCoreContainer';
import { setTimeBoundry, setOverallTimeBoundries } from './actions/timeBoundryActions';
import { getTransactionsInTimePeriod } from './actions/transactionActions';
import * as timeManipulations from './api/timeManipulations';

const store = configureStore();
store.dispatch(getAllKnownUsers());
// store.dispatch(setTimeBoundry(1,Date.now()));
let shiftBoundry = timeManipulations.getShiftTimeBoundries(Date.now());
let weekBoundry = timeManipulations.getWeekTimeBoundries(Date.now());
store.dispatch(setOverallTimeBoundries(weekBoundry,shiftBoundry));

let timePeriod = store.getState().timeBoundry;
store.dispatch(getTransactionsInTimePeriod(timePeriod));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <LogUserInToCoreContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
