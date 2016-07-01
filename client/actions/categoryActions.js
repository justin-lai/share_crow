import fetch from 'isomorphic-fetch';

/*
--------------------------------------
  ACTION TYPES
--------------------------------------
*/

export const CATEGORY_GET_REQUEST = 'CATEGORY_GET_REQUEST';
export const CATEGORY_GET_RESPONSE = 'CATEGORY_GET_RESPONSE';

export const CATEGORY_FETCH_STATUS = 'CATEGORY_FETCH_STATUS';
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

export function categoryFetchStatus(data) {
  return {
    type: CATEGORY_FETCH_STATUS,
    data,
  };
}

export function getCategory() {
  return dispatch => {
    dispatch(categoryGetRequest());
    dispatch(categoryFetchStatus({ status: true }));
    return fetch('/main/category', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        dispatch(categoryGetResponse(json));
        dispatch(categoryFetchStatus({ status: false }));
      });
  };
}

