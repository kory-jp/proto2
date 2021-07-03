import * as Actions from "./actions";
import initialState from "../store/initialState";

export const CommentsReducer = (state = initialState.comments, action) => {
  switch (action.type) {
    case Actions.GET_COMMENTS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.NEW_COMMENT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.UPDATE_COMMENT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_COMMENT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
