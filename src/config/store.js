import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from 'reducers';

const logger = createLogger();
const reducer = combineReducers(reducers);

const store = compose(
  applyMiddleware(thunk, logger),
)(createStore)(reducer);

export default store;
