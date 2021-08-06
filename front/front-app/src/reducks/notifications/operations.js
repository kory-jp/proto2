import axios from "axios";
import { nowLoadingAction } from "../loading/actions";
import {
  deleteAllNotificationActions,
  deleteNotificationAction,
  getNotificationsAction,
} from "./actions";

export const getModalNotifications = () => {
  return async (dispatch) => {
    axios
      .get(
        "http://localhost:3001/api/v1/user/notifications",

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(getNotificationsAction(response.data.notifications));
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};

export const getPageNotifications = (setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true));
    axios
      .get(
        `http://localhost:3001/api/v1/user/notifications/?page=${queryPage}`,

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(getNotificationsAction(response.data.notifications));
        setSumPage(response.data.page_length);
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

export const deleteModalNotification = (id) => {
  return async (dispatch) => {
    axios
      .delete(
        `http://localhost:3001/api/v1/user/notifications/${id}`,

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(deleteNotificationAction(response.data.notifications));
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
};

export const deletePageNotification = (id, setSumPage, queryPage) => {
  return async (dispatch) => {
    axios
      .delete(
        `http://localhost:3001/api/v1/user/notifications/${id}/?page=${queryPage}`,

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        dispatch(deleteNotificationAction(response.data.notifications));
        setSumPage(response.data.page_length);
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
        dispatch(deleteAllNotificationActions([]));
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
