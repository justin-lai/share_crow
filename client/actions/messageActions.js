import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const MESSAGE_GET_REQUEST = 'MESSAGE_GET_REQUEST';
export const MESSAGE_GET_RESPONSE = 'MESSAGE_GET_RESPONSE';

export const MESSAGE_POST_REQUEST = 'MESSAGE_POST_REQUEST';
export const MESSAGE_POST_RESPONSE = 'MESSAGE_POST_RESPONSE';

export const MESSAGE_PUT_REQUEST = 'MESSAGE_PUT_REQUEST';
export const MESSAGE_PUT_RESPONSE = 'MESSAGE_PUT_RESPONSE';

export const MESSAGE_DELETE_REQUEST = 'MESSAGE_DELETE_REQUEST';
export const MESSAGE_DELETE_RESPONSE = 'MESSAGE_DELETE_RESPONSE';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function messageGetRequest() {
  return {
    type: MESSAGE_GET_REQUEST,
  };
}
export function messageGetResponse(data) {
  return {
    type: MESSAGE_GET_RESPONSE,
    data,
  };
}
export function getMessage(query) {
  return dispatch => {
    dispatch(messageGetRequest());
    return fetch(`/main/message?${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(messageGetResponse(json)))
      .catch(() => dispatch(messageGetResponse([])));
  };
}

// -------------POST--------------------

export function messagePostRequest() {
  return {
    type: MESSAGE_POST_REQUEST,
  };
}
export function messagePostResponse(data) {
  return {
    type: MESSAGE_POST_RESPONSE,
    data,
  };
}
export function postMessage(data) {
  return dispatch => {
    dispatch(messagePostRequest());
    return fetch('/main/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(messagePostResponse(json)));
  };
}

// -------------PUT--------------------

export function messagePutRequest() {
  return {
    type: MESSAGE_PUT_REQUEST,
  };
}
export function messagePutResponse(data) {
  return {
    type: MESSAGE_PUT_RESPONSE,
    data,
  };
}
export function putMessage(data) {
  return dispatch => {
    dispatch(messagePutRequest());
    return fetch('/main/message', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(messagePutResponse(json)));
  };
}

// -------------DELETE--------------------

export function messageDeleteRequest() {
  return {
    type: MESSAGE_DELETE_REQUEST,
  };
}
export function messageDeleteResponse(data) {
  return {
    type: MESSAGE_DELETE_RESPONSE,
    data,
  };
}
export function deleteMessage(data) {
  return dispatch => {
    dispatch(messageDeleteRequest());
    return fetch('/main/message', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(messageDeleteResponse(json)));
  };
}
