import * as Actions from "./actions";
import initialState from "../store/initialState";

export const NotificationsReducer = (
  state = initialState.notifications,
  action
) => {
  switch (action.type) {
    case Actions.GET_NOTIFICATIONS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.DELETE_NOTIFICATION:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.DELETE_ALL_NOTIFICATIONS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
