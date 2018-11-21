import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
}