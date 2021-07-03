export const GET_POSTS = "GET_POSTS";
export const getPostsAction = (posts) => {
  return {
    type: "GET_POSTS",
    payload: posts,
  };
};

export const GET_USERS_POSTS = "GET_USERS_POSTS";
export const getUsersPostsAction = (posts) => {
  return {
    type: "GET_USERS_POSTS",
    payload: posts,
  };
};

export const NEW_POST = "NEW_POST";
export const newPostAction = (postStatus) => {
  return {
    type: "NEW_POST",
    payload: {
      ...postStatus,
    },
  };
};

export const SHOW_POST = "SHOW_POST";
export const showPostAction = (postStatus) => {
  return {
    type: "SHOW_POST",
    payload: {
      ...postStatus,
    },
  };
};

export const UPDATE_POST = "UPDATE_POST";
export const updatePostAction = (postStatus) => {
  return {
    type: "UPDATE_POST",
    payload: {
      ...postStatus,
    },
  };
};

export const DELETE_POST = "DELETE_POST";
export const deletePostAction = (postStatus) => {
  return {
    type: "DELETE_POST",
    payload: {
      ...postStatus,
    },
  };
};
