import * as Actions from "./actions";
import initialState from "../store/initialState";

export const CurrentUserReducer = (
  state = initialState.currentUser,
  action
) => {
  switch (action.type) {
    case Actions.SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
