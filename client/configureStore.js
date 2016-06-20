import { createStore, applyMiddleware, combineReducers, session } from 'redux';
import { user, listing } from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const initalState = {
  user: {},
  listing: {},
};

export default function configureStore() {
  return createStore(
    combineReducers({ user, listing, session, routing: routerReducer }),
    initalState,
    applyMiddleware(thunkMiddleware)
  );
}
