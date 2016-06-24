import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const SESSION_GET_REQUEST = 'SESSION_GET_REQUEST';
export const SESSION_GET_RESPONSE = 'SESSION_GET_RESPONSE';

export const IS_LOGGED_IN_REQUEST = 'IS_LOGGED_IN_REQUEST';
export const IS_LOGGED_IN_RESPONSE = 'IS_LOGGED_IN_RESPONSE';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function sessionGetRequest() {
  return {
    type: SESSION_GET_REQUEST,
  };
}
export function sessionGetResponse(data) {
  return {
    type: SESSION_GET_RESPONSE,
    data,
  };
}
export function getSession(query) {
  return dispatch => {
    dispatch(sessionGetRequest());
    return fetch(`/main/login?${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        dispatch(sessionGetResponse(json));
      });
  };
}

export function isLoggedInRequest() {
  return {
    type: IS_LOGGED_IN_REQUEST,
  };
}
export function isLoggedInResponse(data) {
  return {
    type: IS_LOGGED_IN_RESPONSE,
    data,
  };
}
export function isLoggedIn() {
  return dispatch => {
    dispatch(isLoggedInRequest());
    return fetch('/isLoggedIn', { credentials: 'same-origin' })
      .then(response => {
        dispatch(isLoggedInResponse(response.ok));
      });
  };
}
