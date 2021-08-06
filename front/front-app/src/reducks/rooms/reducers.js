import * as Actions from "./actions";
import initialState from "../store/initialState";

export const RoomReducer = (state = initialState.room, action) => {
  switch (action.type) {
    case Actions.SET_ROOM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
