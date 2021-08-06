import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import { setNotificationsAction } from "./actions";

export const getNotifications = (setSumPage, queryPage) => {
  return async (dispatch) => {
    if (queryPage) {
      dispatch(nowLoadingAction(true));
    }
    axios
      .get(
        `http://localhost:3001/api/v1/user/notifications/?page=${queryPage}`,

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(setNotificationsAction(response.data.notifications));
        if (queryPage) {
          setSumPage(response.data.page_length);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        if (queryPage) {
          setTimeout(() => {
            dispatch(nowLoadingAction(false));
          }, 800);
        }
      });
  };
};

export const deleteNotification = (id, setSumPage, queryPage) => {
  return async (dispatch) => {
    axios
      .delete(
        `http://localhost:3001/api/v1/user/notifications/${id}/?page=${queryPage}`,

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(setNotificationsAction(response.data.notifications));
        if (queryPage) {
          setSumPage(response.data.page_length);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};

export const deleteAllPageNotification = (setSumPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .delete(
        "http://localhost:3001/api/v1/user/notifications/destroy_all",

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(setNotificationsAction([]));
        setSumPage(1);
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
