export const SET_FOLLOWING = "SET_FOLLOWING";
export const setFollowingAction = (follow) => {
  return {
    type: SET_FOLLOWING,
    payload: follow,
  };
};
