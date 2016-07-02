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

export const MESSAGE_FETCH_STATUS = 'MESSAGE_FETCH_STATUS';
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
export function messageFetchStatus(data) {
  return {
    type: MESSAGE_FETCH_STATUS,
    data,
  };
}
export function getMessage(query, cb) {
  return dispatch => {
    dispatch(messageGetRequest());
    dispatch(messageFetchStatus({ status: true }));
    return fetch(`/main/message?${query}`, { credentials: 'same-origin' })
      .then(response => {
        dispatch(messageFetchStatus({ status: false }));
        return response.json();
      })
      .then(json => {
        if (cb) cb(json);
        dispatch(messageGetResponse(json));
      });
      // .catch(() => dispatch(messageGetResponse([])));
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
export function postMessage(data, cb) {
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
    .then(json => {
      if (cb) cb(data);
      dispatch(messagePostResponse(json));
    });
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
export function putMessage(data, cb) {
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
    .then(json => {
      if (cb) cb(data);
      dispatch(messagePutResponse(json));
    });
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
export function deleteMessage(data, cb) {
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
    // gets messages after deletion
    .then(() =>
      fetch(`/main/message?recipientId=${data.recipientId}`, { credentials: 'same-origin' }))
      .then(response => response.json())
      .then(json => {
        if (cb) cb(json);
        dispatch(messageGetResponse(json));
      });
  };
}

// function fetchPosts() {
//   return dispatch => {
//     fetchPostsAsync()
//       .then(res => { // res is posts
//         dispatch({ type: 'RECEIVE_POSTS', payload: res });
//         return fetchPostMetaAsync(res);
//       })
//       .then(res => { // res  is metadata
//         dispatch({ type: 'RECEIVE_POST_META', payload: res });
//       })
//   }
// }

