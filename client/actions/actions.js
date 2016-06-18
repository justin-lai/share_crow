// import fetch from 'isomorphic-fetch';

/*
----------------
  ACTION TYPES
----------------
*/

export const GET_USER = 'GET_USER';
export const POST_USER = 'POST_USER';
export const PUT_USER = 'PUT_USER';
export const DELETE_USER = 'DELETE_USER';

export const GET_ITEM = 'GET_ITEM';
export const POST_ITEM = 'POST_ITEM';
export const PUT_ITEM = 'PUT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

/*
--------------------
  ACTION CREATORS
--------------------
*/

// USER API
export function getUser(id) {
  return { type: GET_USER, id };
}
export function postUser(data) {
  return { type: POST_USER, data };
}
export function putUser(data) {
  return { type: PUT_USER, data };
}
export function deleteUser(data) {
  return { type: DELETE_USER, data };
}

// ITEM API
export function getItem(id) {
  return { type: GET_ITEM, id };
}
export function postItem(data) {
  return { type: POST_ITEM, data };
}
export function putItem(data) {
  return { type: PUT_ITEM, data };
}
export function deleteItem(data) {
  return { type: DELETE_ITEM, data };
}
