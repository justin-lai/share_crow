import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const CATEGORY_GET_REQUEST = 'CATEGORY_GET_REQUEST';
export const CATEGORY_GET_RESPONSE = 'CATEGORY_GET_RESPONSE';

/*
---------------------------------------
  ACTION CREATORS
---------------------------------------
*/

// -------------GET--------------------

export function categoryGetRequest() {
  return {
    type: CATEGORY_GET_REQUEST,
  };
}
export function categoryGetResponse(data) {
  return {
    type: CATEGORY_GET_RESPONSE,
    data,
  };
}
export function getCategory() {
  return dispatch => {
    dispatch(categoryGetRequest());
    return fetch('/main/category', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(categoryGetResponse(json));
      });
  };
}

