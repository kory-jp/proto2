export const SET_FAVORITE = "SET_FAVORITE";
export const setFavoriteAction = (favorite) => {
  return {
    type: SET_FAVORITE,
    payload: favorite,
  };
};
