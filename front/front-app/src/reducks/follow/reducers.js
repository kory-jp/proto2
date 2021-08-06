import * as Actions from "./actions";
import initialState from "../store/initialState";

export const FollowReducer = (state = initialState.follow, action) => {
  switch (action.type) {
    case Actions.SET_FOLLOWING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
