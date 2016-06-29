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
    console.log('asfasdfa');
    dispatch(messageGetRequest());
    return fetch(`/main/message?${query}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        console.log('JSON!!!!', json);
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
export function postMessage(data) {
  console.log('in the postMessage function');
  console.log('this is data', data);
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
    //gets messages after deletion
    .then(json => {
      return fetch(`/main/message?recipientId=${data.recipientId}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        console.log('JSON!!!!', json);
        dispatch(messageGetResponse(json));
      });
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

