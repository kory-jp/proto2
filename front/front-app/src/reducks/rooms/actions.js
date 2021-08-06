export const SET_ROOM = "SET_ROOM";
export const setRoomAction = (roomStatus) => {
  return {
    type: SET_ROOM,
    payload: {
      ...roomStatus,
    },
  };
};
