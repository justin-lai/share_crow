import { createStore, applyMiddleware, combineReducers } from 'redux';
import { user, listing, message, category, image, session, isAuth, isFetching }
  from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

const initalState = {
  user: {},
  listing: [],
  message: [],
  image: [],
  category: [],
  session: {},
  isAuth: { status: false, username: null },
  isFetching: {
    user: false,
    listing: false,
    message: false,
    image: false,
    category: false,
    session: false,
    isAuth: false,
  },
};

export default function configureStore() {
  return createStore(
    combineReducers({ user, listing, message, category, session,
      image, isAuth, isFetching, routing: routerReducer }),
    initalState,
    applyMiddleware(thunkMiddleware)
  );
}
