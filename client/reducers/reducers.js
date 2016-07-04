import {
  USER_GET_RESPONSE, USER_FETCH_STATUS,
} from '../actions/userActions';
import {
  LISTING_GET_RESPONSE, LISTING_FETCH_STATUS,
} from '../actions/listingActions';
import {
  MESSAGE_GET_RESPONSE, MESSAGE_FETCH_STATUS,
} from '../actions/messageActions';
import {
  IMAGE_GET_RESPONSE, IMAGE_FETCH_STATUS,
} from '../actions/imageActions';
import {
  CATEGORY_GET_RESPONSE, CATEGORY_FETCH_STATUS,
} from '../actions/categoryActions';
import {
  SESSION_GET_RESPONSE, IS_LOGGED_IN_RESPONSE, REFRESH_COMPONENT,
} from '../actions/sessionActions';

export const user = (state = {}, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.user;
    case USER_GET_RESPONSE:
      return action.data;
    // case USER_POST_RESPONSE:
    //   return action.data;
    // case USER_PUT_RESPONSE:
    //   return action.data;
    // case USER_DELETE_RESPONSE:
    //   return action.data;
    default:
      return state;
  }
};

export const listing = (state = [], action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.listing;
    case LISTING_GET_RESPONSE:
      return action.data;
    // case LISTING_POST_RESPONSE:
    //   return action.data;
    // case LISTING_PUT_RESPONSE:
    //   return action.data;
    // case LISTING_DELETE_RESPONSE:
    //   return action.data;
    default:
      return state;
  }
};

export const message = (state = [], action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.message;
    case MESSAGE_GET_RESPONSE:
      return action.data;
    // case MESSAGE_POST_RESPONSE:
    //   return action.data;
    // case MESSAGE_PUT_RESPONSE:
    //   return action.data;
    // case MESSAGE_DELETE_RESPONSE:
    //   return action.data;
    default:
      return state;
  }
};


export const image = (state = [], action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.image;
    case IMAGE_GET_RESPONSE:
      return action.data;
    // case IMAGE_POST_RESPONSE:
    //   return action.data;
    // case IMAGE_PUT_RESPONSE:
    //   return action.data;
    // case IMAGE_DELETE_RESPONSE:
    //   return action.data;
    default:
      return state;
  }
};


export const category = (state = [], action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.category;
    case CATEGORY_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const session = (state = {}, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.session;
    case SESSION_GET_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const isAuth = (state = { status: false, username: null }, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.isAuth;
    case IS_LOGGED_IN_RESPONSE:
      return action.data;
    default:
      return state;
  }
};

export const isFetching = (state = {
  user: false,
  listing: false,
  message: false,
  image: false,
  category: false,
  session: false,
  isAuth: false,
}, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload.isFetching;
    case USER_FETCH_STATUS:
      return Object.assign({}, state, {
        user: action.data.status,
      });
    case LISTING_FETCH_STATUS:
      return Object.assign({}, state, {
        listing: action.data.status,
      });
    case MESSAGE_FETCH_STATUS:
      return Object.assign({}, state, {
        message: action.data.status,
      });
    case IMAGE_FETCH_STATUS:
      return Object.assign({}, state, {
        image: action.data.status,
      });
    case CATEGORY_FETCH_STATUS:
      return Object.assign({}, state, {
        category: action.data.status,
      });
    default:
      return state;
  }
};

export const componentNeedsRefresh = (state = false, action) => {
  switch (action.type) {
    case REFRESH_COMPONENT:
      return action.bool;
    default:
      return state;
  }
};
