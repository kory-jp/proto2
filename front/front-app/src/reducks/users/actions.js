export const GET_USERS = "GET_USERS";
export const getUsersAction = (usersStatus) => {
  return {
    type: "GET_USERS",
    payload: usersStatus,
  };
};

export const SHOW_USERS = "SHOW_USERS";
export const showUsersAction = (usersStatus) => {
  return {
    type: "SHOW_USERS",
    payload: {
      ...usersStatus,
    },
  };
};
