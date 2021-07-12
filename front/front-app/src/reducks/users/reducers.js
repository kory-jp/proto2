import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducers = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SHOW_USERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
