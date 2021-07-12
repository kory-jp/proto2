import * as Actions from "./actions";
import initialState from "../store/initialState";

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.GET_POSTS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.GET_USERS_POSTS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.NEW_POST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SHOW_POST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.UPDATE_POST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_POST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
