export const user = function(state={}, action) {
  switch(action.type) {
    case "USER_GET_RESPONSE":
      return action.data;
    case "USER_POST_RESPONSE":
      return action.data;
    case "USER_PUT_RESPONSE":
      return action.data;
    default:
      return state
  }
};

export const item = function(state={}, action) {
  switch(action.type) {
    case "ITEM_GET_RESPONSE":
      return action.data;
    case "ITEM_POST_RESPONSE":
      return action.data;
    case "ITEM_PUT_RESPONSE":
      return action.data;
    default:
      return state;
  }
};