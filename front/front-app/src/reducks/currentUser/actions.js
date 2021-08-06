export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const setCurrentUserAction = (userStatus) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      ...userStatus,
    },
  };
};
