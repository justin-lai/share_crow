import { createStore, applyMiddleware, combineReducers } from 'redux';
import { user, listing, message, category, image,
 session, isAuth, isFetching, componentNeedsRefresh, searchFilter }
  from './reducers/reducers.js';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import promise from 'redux-promise';
// import createLogger from 'redux-logger';
// import localStorageLoad from './middleware/localStorageLoad';
import localStorageDump from './middleware/localStorageDump';

// const logger = createLogger();
let initialState = {};

// loads the initial state from local storage if it exists
try {
  const storedState = JSON.parse(
    localStorage.getItem('SHARE_CROW')
  );
  if (storedState) {
    delete storedState.routing;
    storedState.isFetching = {
      user: false,
      listing: false,
      message: false,
      image: false,
      category: false,
      session: false,
      isAuth: false,
    };
    initialState = storedState;
  }
} catch (e) {
  initialState = {
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
    componentNeedsRefresh: false,
    searchFilter: '',
  };
}

export default function configureStore() {
  return createStore(
    combineReducers({ user, listing, message, category, session,
      image, isAuth, isFetching, componentNeedsRefresh, searchFilter, routing: routerReducer }),
    initialState,
    applyMiddleware(thunk, promise, localStorageDump)
  );
}
