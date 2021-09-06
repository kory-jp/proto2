import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import { setNotificationsAction } from "./actions";

export const getNotifications = (setSumPage, queryPage) => {
  return async (dispatch) => {
    if (queryPage) {
      dispatch(nowLoadingAction(true));
    }
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + `notifications/?page=${queryPage}`;
    axios
      .get(apiURL, {
        withCredentials: true,
      })
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
    const apiURL =
      process.env.REACT_APP_USERS_API_URL +
      `notifications/${id}/?page=${queryPage}`;
    axios
      .delete(apiURL, {
        withCredentials: true,
      })
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
    const apiURL =
      process.env.REACT_APP_USERS_API_URL + "notifications/destroy_all";
    axios
      .delete(apiURL, {
        withCredentials: true,
      })
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
