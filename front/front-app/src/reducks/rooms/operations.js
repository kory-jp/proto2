import axios from "axios";
import { push } from "connected-react-router";
import { nowLoadingAction } from "../loading/actions";
import { createRoomAction, getRoomAction, updateRoomAction } from "./actions";

export const createRoom = (userId, setSumPage) => {
  return async (dispatch) => {
    axios
      .post(
        "http://localhost:3001/api/v1/user/rooms",
        {
          room: {
            user_id: userId.id,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(createRoomAction(response.data.room));
        setSumPage(response.data.page_length);
        const roomId = response.data.room.id;
        dispatch(push(`/room/${roomId}`));
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};

export const getRoom = (roomId, setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/rooms/${roomId.id}/?page=${queryPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data) {
          dispatch(getRoomAction(response.data.room));
          setSumPage(response.data.page_length);
        } else {
          dispatch(push("/posts"));
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(nowLoadingAction(false));
        }, 800);
      });
  };
};

export const updateRoom = (formData, setSumPage) => {
  return async (dispatch) => {
    axios
      .post(
        "http://localhost:3001/api/v1/user/messages",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(updateRoomAction(response.data.room));
        setSumPage(response.data.page_length);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};
