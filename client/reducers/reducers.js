import {
  USER_GET_RESPONSE, USER_POST_RESPONSE,
  USER_PUT_RESPONSE, USER_DELETE_RESPONSE,
} from '../actions/userActions';
import {
  ITEM_GET_RESPONSE, ITEM_POST_RESPONSE,
  ITEM_PUT_RESPONSE, ITEM_DELETE_RESPONSE,
} from '../actions/itemActions';


export const user = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_RESPONSE:
      return action.data;
    case USER_POST_RESPONSE:
      return action.data;
    case USER_PUT_RESPONSE:
      return action.data;
    case USER_DELETE_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const item = (state = {}, action) => {
  switch (action.type) {
    case ITEM_GET_RESPONSE:
      return action.data;
    case ITEM_POST_RESPONSE:
      return action.data;
    case ITEM_PUT_RESPONSE:
      return action.data;
    case ITEM_DELETE_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

