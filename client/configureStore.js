import { createStore, applyMiddleware, combineReducers } from 'redux';
import { user, listing, message, notification, category, image, session, isAuth }
  from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const initalState = {
  user: {},
  listing: [],
  message: [],
  notification: [],
  image: [],
  category: [],
  session: {},
  isAuth: { status: false, username: null },
};

export default function configureStore() {
  return createStore(
    combineReducers({ user, listing, message, notification, category, session,
      image, isAuth, routing: routerReducer }),
    initalState,
    applyMiddleware(thunkMiddleware)
  );
}
