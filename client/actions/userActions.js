import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const USER_GET_REQUEST = 'USER_GET_REQUEST';
export const USER_GET_RESPONSE = 'USER_GET_RESPONSE';

export const USER_POST_REQUEST = 'USER_POST_REQUEST';
export const USER_POST_RESPONSE = 'USER_POST_RESPONSE';

export const USER_PUT_REQUEST = 'USER_PUT_REQUEST';
export const USER_PUT_RESPONSE = 'USER_PUT_RESPONSE';

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_RESPONSE = 'USER_DELETE_RESPONSE';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function userGetRequest(id) {
  return {
    type: USER_GET_REQUEST,
    id,
  };
}
export function userGetResponse(data) {
  return {
    type: USER_GET_RESPONSE,
    data,
  };
}
export function getUser(id) {
  return dispatch => {
    dispatch(userGetRequest(id));
    return fetch('/api/profile', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(userGetResponse(json)));
  };
}

// -------------POST--------------------

export function userPostRequest() {
  return {
    type: USER_POST_REQUEST,
  };
}
export function userPostResponse(data) {
  return {
    type: USER_POST_RESPONSE,
    data,
  };
}
export function postUser(data) {
  return dispatch => {
    dispatch(userPostRequest());
    return fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(userPostResponse(json)));
  };
}

// -------------PUT--------------------

export function userPutRequest() {
  return {
    type: USER_PUT_REQUEST,
  };
}
export function userPutResponse(data) {
  return {
    type: USER_PUT_RESPONSE,
    data,
  };
}
export function putUser(data) {
  return dispatch => {
    dispatch(userPutRequest());
    return fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(userPutResponse(json)));
  };
}

// -------------DELETE--------------------

export function userDeleteRequest() {
  return {
    type: USER_DELETE_REQUEST,
  };
}
export function userDeleteResponse(data) {
  return {
    type: USER_DELETE_RESPONSE,
    data,
  };
}
export function deleteUser(data) {
  return dispatch => {
    dispatch(userDeleteRequest());
    return fetch('/api/profile', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(userDeleteResponse(json)));
  };
}
