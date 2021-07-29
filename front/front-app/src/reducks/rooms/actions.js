export const CREATE_ROOM = "CREATE_ROOM";
export const createRoomAction = (roomStatus) => {
  return {
    type: CREATE_ROOM,
    payload: {
      ...roomStatus,
    },
  };
};

export const GET_ROOM = "GET_ROOM";
export const getRoomAction = (roomStatus) => {
  return {
    type: GET_ROOM,
    payload: {
      ...roomStatus,
    },
  };
};

export const UPDATE_ROOM = "UPDATE_ROOM";
export const updateRoomAction = (roomStatus) => {
  return {
    type: UPDATE_ROOM,
    payload: {
      ...roomStatus,
    },
  };
};
