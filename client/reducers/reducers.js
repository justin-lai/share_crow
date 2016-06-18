import {
  GET_USER, POST_USER, PUT_USER, DELETE_USER,
  GET_ITEM, POST_ITEM, PUT_ITEM, DELETE_ITEM }
from '../actions/actions';

export const user = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.data;
    case POST_USER:
      return action.data;
    case PUT_USER:
      return action.data;
    case DELETE_USER:
      return action.data;
    default:
      return state;
  }
};

export const item = (state = {}, action) => {
  switch (action.type) {
    case GET_ITEM:
      return action.data;
    case POST_ITEM:
      return action.data;
    case PUT_ITEM:
      return action.data;
    case DELETE_ITEM:
      return action.data;
    default:
      return state;
  }
};
