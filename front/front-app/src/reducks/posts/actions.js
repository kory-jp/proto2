export const GET_LIST_POSTS = "GET_LIST_POSTS";
export const getListPostsAction = (posts) => {
  return {
    type: GET_LIST_POSTS,
    payload: posts,
  };
};

export const SET_POST = "SET_POST";
export const setPostAction = (postStatus) => {
  return {
    type: SET_POST,
    payload: {
      ...postStatus,
    },
  };
};
