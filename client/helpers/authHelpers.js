import { postUser } from '../actions/userActions';
import { getSession, isLoggedIn, refreshComponent } from '../actions/sessionActions';
import { store } from '../index.js';

export const login = userData => {
  //eslint-disable-next-line
  console.log(`logging in as ${userData.username}`);
  localStorage.setItem('SHARE_CROW', '');
  let query = [];
  Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
  query = query.join('&');
  store.dispatch(getSession(query));
  setTimeout(() => {
    store.dispatch(isLoggedIn());
    refreshComponent(true);
  }, 500);
};

export const signup = userData => {
  //eslint-disable-next-line
  console.log('signing up as', userData);
  store.dispatch(postUser(userData, () => {
    login({ username: userData.username, password: userData.password });
  }));
};

export const signout = () => {
  localStorage.setItem('SHARE_CROW', '');
};
