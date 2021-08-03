export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const getNotificationsAction = (notifications) => {
  return {
    type: GET_NOTIFICATIONS,
    payload: notifications,
  };
};

export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const deleteNotificationAction = (notifications) => {
  return {
    type: DELETE_NOTIFICATION,
    payload: notifications,
  };
};

export const DELETE_ALL_NOTIFICATIONS = "DELETE_ALL_NOTIFICATIONS";
export const deleteAllNotificationActions = (notifications) => {
  return {
    type: DELETE_ALL_NOTIFICATIONS,
    payload: notifications,
  };
};
