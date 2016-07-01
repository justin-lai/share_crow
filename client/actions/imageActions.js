import fetch from 'isomorphic-fetch';
import { sessionGetResponse, isLoggedIn } from './sessionActions';
/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const IMAGE_GET_REQUEST = 'IMAGE_GET_REQUEST';
export const IMAGE_GET_RESPONSE = 'IMAGE_GET_RESPONSE';

export const IMAGE_POST_REQUEST = 'IMAGE_POST_REQUEST';
export const IMAGE_POST_RESPONSE = 'IMAGE_POST_RESPONSE';

export const IMAGE_PUT_REQUEST = 'IMAGE_PUT_REQUEST';
export const IMAGE_PUT_RESPONSE = 'IMAGE_PUT_RESPONSE';

export const IMAGE_DELETE_REQUEST = 'IMAGE_DELETE_REQUEST';
export const IMAGE_DELETE_RESPONSE = 'IMAGE_DELETE_RESPONSE';

export const IMAGE_FETCH_STATUS = 'IMAGE_FETCH_STATUS';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function imageGetRequest() {
  return {
    type: IMAGE_GET_REQUEST,
  };
}
export function imageGetResponse(data) {
  return {
    type: IMAGE_GET_RESPONSE,
    data,
  };
}
export function imageFetchStatus(data) {
  return {
    type: IMAGE_FETCH_STATUS,
    data,
  };
}
export function getImage(query) {
  return dispatch => {
    dispatch(imageGetRequest());
    dispatch(imageFetchStatus({ status: true }));
    return fetch(`/main/image?${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        dispatch(imageGetResponse(json));
        dispatch(imageFetchStatus({ status: false }));
      })
      .then(json => dispatch(imageFetchStatus(json)));
  };
}

// -------------POST--------------------

export function imagePostRequest() {
  return {
    type: IMAGE_POST_REQUEST,
  };
}
export function imagePostResponse(data) {
  return {
    type: IMAGE_POST_RESPONSE,
    data,
  };
}
export function postImage(data) {
  console.log('this is data', data);
  return dispatch => {
    dispatch(imagePostRequest());
    return fetch('/main/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      dispatch(imagePostResponse(json));
      dispatch(sessionGetResponse(json));
      dispatch(isLoggedIn());
    });
  };
}

// -------------PUT--------------------

export function imagePutRequest() {
  return {
    type: IMAGE_PUT_REQUEST,
  };
}
export function imagePutResponse(data) {
  return {
    type: IMAGE_PUT_RESPONSE,
    data,
  };
}
export function putImage(data) {
  return dispatch => {
    dispatch(imagePutRequest());
    return fetch('/main/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(imagePutResponse(json)));
  };
}

// -------------DELETE--------------------

export function imageDeleteRequest() {
  return {
    type: IMAGE_DELETE_REQUEST,
  };
}
export function imageDeleteResponse(data) {
  return {
    type: IMAGE_DELETE_RESPONSE,
    data,
  };
}
export function deleteImage(data) {
  return dispatch => {
    dispatch(imageDeleteRequest());
    return fetch('/main/image', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => dispatch(imageDeleteResponse(json)));
  };
}
