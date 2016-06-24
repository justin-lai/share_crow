import { createStore, applyMiddleware, combineReducers } from 'redux';
import { user, listing, message, category, session, isAuth } from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const initalState = {
  user: {},
  listing: [],
  message: [],
  category: [],
  session: {},
  isAuth: false,
};

export default function configureStore() {
  return createStore(
    combineReducers({ user, listing, message, category, session, isAuth, routing: routerReducer }),
    initalState,
    applyMiddleware(thunkMiddleware)
  );
}
