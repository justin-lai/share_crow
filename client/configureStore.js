import { createStore, applyMiddleware, combineReducers } from 'redux';
import { user, listing, message, session, isAuth } from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const initalState = {
  user: {},
  listing: [],
};

export default function configureStore() {
  return createStore(
    combineReducers({ user, listing, message, session, isAuth, routing: routerReducer }),
    initalState,
    applyMiddleware(thunkMiddleware)
  );
}
