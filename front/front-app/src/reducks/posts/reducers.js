import * as Actions from "./actions";
import initialState from "../store/initialState";

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.GET_LIST_POSTS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.SET_POST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
