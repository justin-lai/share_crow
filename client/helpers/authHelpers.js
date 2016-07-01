import { postUser } from '../actions/userActions';
import { getSession, isLoggedIn } from '../actions/sessionActions';

export const login = userData => {
  //eslint-disable-next-line
  console.log(`logging in as ${userData.username}`);
  let query = [];
  Object.keys(userData).forEach(key => query.push(`${key}=${userData[key]}`));
  query = query.join('&');
  getSession(query);
  setTimeout(isLoggedIn, 500);
};

export const signup = userData => {
  //eslint-disable-next-line
  console.log('signing up as', userData);
  postUser(userData);
};
