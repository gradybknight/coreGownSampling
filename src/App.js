import React, { Component } from 'react';
import './App.css';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

import {getAllKnownUsers} from './actions/userActions';
import LogUserInToCoreContainer from './containers/LogUserInToCoreContainer';
import { setTimeBoundry } from './actions/timeBoundryActions';
import { getTransactionsInTimePeriod } from './actions/transactionActions'


const store = configureStore();
store.dispatch(getAllKnownUsers());
store.dispatch(setTimeBoundry(1234,''));
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