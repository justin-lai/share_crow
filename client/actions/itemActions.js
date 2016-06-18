import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const ITEM_GET_REQUEST = 'ITEM_GET_REQUEST';
export const ITEM_GET_RESPONSE = 'ITEM_GET_RESPONSE';

export const ITEM_POST_REQUEST = 'ITEM_POST_REQUEST';
export const ITEM_POST_RESPONSE = 'ITEM_POST_RESPONSE';

export const ITEM_PUT_REQUEST = 'ITEM_PUT_REQUEST';
export const ITEM_PUT_RESPONSE = 'ITEM_PUT_RESPONSE';

export const ITEM_DELETE_REQUEST = 'ITEM_DELETE_REQUEST';
export const ITEM_DELETE_RESPONSE = 'ITEM_DELETE_RESPONSE';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function itemGetRequest(id) {
  return {
    type: ITEM_GET_REQUEST,
    id,
  };
}
export function itemGetResponse(data) {
  return {
    type: ITEM_GET_RESPONSE,
    data,
  };
}
export function getUser(id) {
  return dispatch => {
    dispatch(itemGetRequest(id));
    return fetch('/item', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(itemGetResponse(json)));
  };
}

// -------------POST--------------------

export function itemPostRequest() {
  return {
    type: ITEM_POST_REQUEST,
  };
}
export function itemPostResponse(data) {
  return {
    type: ITEM_POST_RESPONSE,
    data,
  };
}
export function postUser(data) {
  return dispatch => {
    dispatch(itemPostRequest());
    return fetch('/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(itemPostResponse(json)));
  };
}

// -------------PUT--------------------

export function itemPutRequest() {
  return {
    type: ITEM_PUT_REQUEST,
  };
}
export function itemPutResponse(data) {
  return {
    type: ITEM_PUT_RESPONSE,
    data,
  };
}
export function putUser(data) {
  return dispatch => {
    dispatch(itemPutRequest());
    return fetch('/item', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(itemPutResponse(json)));
  };
}

// -------------DELETE--------------------

export function itemDeleteRequest() {
  return {
    type: ITEM_DELETE_REQUEST,
  };
}
export function itemDeleteResponse(data) {
  return {
    type: ITEM_DELETE_RESPONSE,
    data,
  };
}
export function deleteUser(data) {
  return dispatch => {
    dispatch(itemDeleteRequest());
    return fetch('/item', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(itemDeleteResponse(json)));
  };
}
