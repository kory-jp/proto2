export const CONFIRM_FAVORITED = "CONFIRM_FAVORITED";
export const confirmFavoritedAction = (favorite) => {
  return {
    type: "CONFIRM_FAVORITED",
    payload: favorite,
  };
};

export const CREATE_FAVORITE = "CREATE_FAVORITE";
export const createFavoriteAction = (favorite) => {
  return {
    type: "CREATE_FAVORITE",
    payload: favorite,
  };
};

export const DESTROY_FAVORITE = "DESTROY_FAVORITE";
export const destroyFavoriteAction = (favorite) => {
  return {
    type: "DESTROY_FAVORITE",
    payload: favorite,
  };
};
