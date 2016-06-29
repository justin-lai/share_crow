import {
  USER_GET_RESPONSE, USER_POST_RESPONSE,
  USER_PUT_RESPONSE, USER_DELETE_RESPONSE,
} from '../actions/userActions';
import {
  LISTING_GET_RESPONSE, LISTING_POST_RESPONSE,
  LISTING_PUT_RESPONSE, LISTING_DELETE_RESPONSE,
} from '../actions/listingActions';
import {
  MESSAGE_GET_RESPONSE, MESSAGE_POST_RESPONSE,
  MESSAGE_PUT_RESPONSE, MESSAGE_DELETE_RESPONSE,
} from '../actions/messageActions';
import {
  NOTIFICATION_GET_RESPONSE, NOTIFICATION_POST_RESPONSE,
  NOTIFICATION_PUT_RESPONSE, NOTIFICATION_DELETE_RESPONSE,
} from '../actions/notificationActions';
import {
  IMAGE_GET_RESPONSE, IMAGE_POST_RESPONSE,
  IMAGE_PUT_RESPONSE, IMAGE_DELETE_RESPONSE,
} from '../actions/imageActions';
import {
  CATEGORY_GET_RESPONSE,
} from '../actions/categoryActions';
import {
  SESSION_GET_RESPONSE, IS_LOGGED_IN_RESPONSE,
} from '../actions/sessionActions';

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

export const listing = (state = [], action) => {
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

export const message = (state = [], action) => {
  switch (action.type) {
    case MESSAGE_GET_RESPONSE:
      return action.data;
    case MESSAGE_POST_RESPONSE:
      return action.data;
    case MESSAGE_PUT_RESPONSE:
      return action.data;
    case MESSAGE_DELETE_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const notification = (state = [], action) => {
  switch (action.type) {
    case NOTIFICATION_GET_RESPONSE:
      return action.data;
    case NOTIFICATION_POST_RESPONSE:
      return action.data;
    case NOTIFICATION_PUT_RESPONSE:
      return action.data;
    case NOTIFICATION_DELETE_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const image = (state = [], action) => {
  switch (action.type) {
    case IMAGE_GET_RESPONSE:
      return action.data;
    case IMAGE_POST_RESPONSE:
      return action.data;
    case IMAGE_PUT_RESPONSE:
      return action.data;
    case IMAGE_DELETE_RESPONSE:
      return action.data;
    default:
      return state;
  }
};


export const category = (state = [], action) => {
  switch (action.type) {
    case CATEGORY_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const session = (state = {}, action) => {
  switch (action.type) {
    case SESSION_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const isAuth = (state = { status: false, username: null }, action) => {
  switch (action.type) {
    case IS_LOGGED_IN_RESPONSE:
      return action.data;
    default:
      return state;
  }
};
