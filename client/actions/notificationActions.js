import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const NOTIFICATION_GET_REQUEST = 'NOTIFICATION_GET_REQUEST';
export const NOTIFICATION_GET_RESPONSE = 'NOTIFICATION_GET_RESPONSE';

export const NOTIFICATION_POST_REQUEST = 'NOTIFICATION_POST_REQUEST';
export const NOTIFICATION_POST_RESPONSE = 'NOTIFICATION_POST_RESPONSE';

export const NOTIFICATION_PUT_REQUEST = 'NOTIFICATION_PUT_REQUEST';
export const NOTIFICATION_PUT_RESPONSE = 'NOTIFICATION_PUT_RESPONSE';

export const NOTIFICATION_DELETE_REQUEST = 'NOTIFICATION_DELETE_REQUEST';
export const NOTIFICATION_DELETE_RESPONSE = 'NOTIFICATION_DELETE_RESPONSE';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function notificationGetRequest() {
  return {
    type: NOTIFICATION_GET_REQUEST,
  };
}
export function notificationGetResponse(data) {
  return {
    type: NOTIFICATION_GET_RESPONSE,
    data,
  };
}
export function getNotification(query) {
  return dispatch => {
    dispatch(notificationGetRequest());
    return fetch(`/main/notification?${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        console.log('JSON!!!!', json);
        dispatch(notificationGetResponse(json));
      });
      // .catch(() => dispatch(notificationGetResponse([])));
  };
}

// -------------POST--------------------

export function notificationPostRequest() {
  return {
    type: NOTIFICATION_POST_REQUEST,
  };
}
export function notificationPostResponse(data) {
  return {
    type: NOTIFICATION_POST_RESPONSE,
    data,
  };
}
export function postNotification(data) {
  console.log('in the postNotification function');
  console.log('this is data', data);
  return dispatch => {
    dispatch(notificationPostRequest());
    return fetch('/main/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(notificationPostResponse(json)));
  };
}

// -------------PUT--------------------

export function notificationPutRequest() {
  return {
    type: NOTIFICATION_PUT_REQUEST,
  };
}
export function notificationPutResponse(data) {
  return {
    type: NOTIFICATION_PUT_RESPONSE,
    data,
  };
}
export function putNotification(data) {
  return dispatch => {
    dispatch(notificationPutRequest());
    return fetch('/main/notification', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(notificationPutResponse(json)));
  };
}

// -------------DELETE--------------------

export function notificationDeleteRequest() {
  return {
    type: NOTIFICATION_DELETE_REQUEST,
  };
}
export function notificationDeleteResponse(data) {
  return {
    type: NOTIFICATION_DELETE_RESPONSE,
    data,
  };
}
export function deleteNotification(data) {
  return dispatch => {
    dispatch(notificationDeleteRequest());
    return fetch('/main/notification', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(notificationDeleteResponse(json)));
  };
}
