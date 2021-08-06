export const GET_COMMENTS = "GET_COMMENTS";
export const getCommentsAction = (commentStatus) => {
  return {
    type: GET_COMMENTS,
    payload: commentStatus,
  };
};

export const SET_COMMENT = "SET_COMMENT";
export const setCommentAction = (commentStatus) => {
  return {
    type: SET_COMMENT,
    payload: {
      ...commentStatus,
    },
  };
};
