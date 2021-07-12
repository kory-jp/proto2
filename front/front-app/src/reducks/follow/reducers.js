import * as Actions from "./actions";
import initialState from "../store/initialState";

export const FollowReducer = (state = initialState.follow, action) => {
  switch (action.type) {
    case Actions.CONFIRM_FOLLOWING:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CREATE_FOLLOWING:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DESTROY_FOLLOWING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
