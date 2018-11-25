import React, { Component } from 'react';
import './App.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {getAllKnownUsers} from './actions/userActions';
import { setOverallTimeBoundries } from './actions/timeBoundryActions';
import { getTransactionsInTimePeriod } from './actions/transactionActions';
import * as timeManipulations from './api/timeManipulations';
import TabBarContainer from './containers/TabBarContainer';

const store = configureStore();
store.dispatch(getAllKnownUsers());
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
          <TabBarContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
