import * as Actions from "./actions";
import initialState from "../store/initialState";

export const TagsReducer = (state = initialState.tags, action) => {
  switch (action.type) {
    case Actions.GET_TAGS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.GET_TAG:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
