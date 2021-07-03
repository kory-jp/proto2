export const SHOW_USERS = "SHOW_USERS";
export const showUsersAction = (usersStatus) => {
  return {
    type: "SHOW_USERS",
    payload: {
      ...usersStatus,
    },
  };
};
