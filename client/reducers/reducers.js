import {
  USER_GET_RESPONSE, USER_POST_RESPONSE,
  USER_PUT_RESPONSE, USER_DELETE_RESPONSE,
} from '../actions/userActions';
import {
  LISTING_GET_RESPONSE, LISTING_POST_RESPONSE,
  LISTING_PUT_RESPONSE, LISTING_DELETE_RESPONSE,
} from '../actions/listingActions';


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

export const listing = (state = {}, action) => {
  switch (action.type) {
    case LISTING_GET_RESPONSE:
      return action.data;
    case LISTING_POST_RESPONSE:
      return action.data;
    case LISTING_PUT_RESPONSE:
      return action.data;
    case LISTING_DELETE_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

