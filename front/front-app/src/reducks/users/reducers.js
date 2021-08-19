import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducers = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.GET_USERS:
      return {
        ...state,
        list: [...action.payload],
      };

    case Actions.SHOW_USERS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.INITIAL_USERS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
