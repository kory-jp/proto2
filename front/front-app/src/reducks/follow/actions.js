export const CONFIRM_FOLLOWING = "CONFIRM_FOLLOWING";
export const confirmFollowingAction = (follow) => {
  return {
    type: "CONFIRM_FOLLOWING",
    payload: follow,
  };
};

export const CREATE_FOLLOWING = "CREATE_FOLLOWING";
export const createFollowingAction = (follow) => {
  return {
    type: "CREATE_FOLLOWING",
    payload: follow,
  };
};

export const DESTROY_FOLLOWING = "DESTROY_FOLLOWING";
export const destroyFollowingAction = (follow) => {
  return {
    type: "DESTROY_FOLLOWING",
    payload: follow,
  };
};
