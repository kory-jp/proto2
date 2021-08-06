import * as Actions from "./actions";
import initialState from "../store/initialState";

export const NotificationsReducer = (
  state = initialState.notifications,
  action
) => {
  switch (action.type) {
    case Actions.SET_NOTIFICATIONS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
