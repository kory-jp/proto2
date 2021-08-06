export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const setNotificationsAction = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: notifications,
  };
};
