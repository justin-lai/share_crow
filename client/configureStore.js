import { createStore, applyMiddleware, combineReducers, session } from 'redux';
import { user, item } from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const initalState = {
  user: {},
  item: {},
};

export default function configureStore() {
  return createStore(
    combineReducers({ user, item, session, routing: routerReducer }),
    initalState,
    applyMiddleware(thunkMiddleware)
  );
}
