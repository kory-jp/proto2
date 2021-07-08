import * as Actions from "./actions";
import initialState from "../store/initialState";

export const FavoriteReducer = (state = initialState.favorite, action) => {
  switch (action.type) {
    case Actions.CONFIRM_FAVORITED:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CREATE_FAVORITE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DESTROY_FAVORITE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
