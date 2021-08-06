import * as Actions from "./actions";
import initialState from "../store/initialState";

export const FavoriteReducer = (state = initialState.favorite, action) => {
  switch (action.type) {
    case Actions.SET_FAVORITE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
