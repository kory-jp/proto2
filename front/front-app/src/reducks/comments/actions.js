export const GET_COMMENTS = "GET_COMMENTS";
export const getCommentsAction = (commentStatus) => {
  return {
    type: GET_COMMENTS,
    payload: commentStatus,
  };
};

export const NEW_COMMENT = "NEW_COMMENT";
export const newCommentAction = (commentStatus) => {
  return {
    type: NEW_COMMENT,
    payload: {
      ...commentStatus,
    },
  };
};

export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const updateCommentAction = (commentStatus) => {
  return {
    type: UPDATE_COMMENT,
    payload: {
      ...commentStatus,
    },
  };
};

export const DELETE_COMMENT = "DELETE_COMMENT";
export const deleteCommentAction = (commentStatus) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      ...commentStatus,
    },
  };
};
