import { postUser } from '../actions/userActions';
import { getSession, isLoggedIn } from '../actions/sessionActions';
import { store } from '../index.js';

export const login = userData => {
  //eslint-disable-next-line
  console.log(`logging in as ${userData.username}`);
  let query = [];
  Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
  query = query.join('&');
  store.dispatch(getSession(query));
  store.dispatch(isLoggedIn());
};

export const signup = userData => {
  //eslint-disable-next-line
  console.log('signing up as', userData);
  store.dispatch(postUser(userData));
};
