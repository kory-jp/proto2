export const GET_COMMENTS = 'GET_COMMENTS'
export const getCommentsAction = (commentStatus) => {
  return {
    type: "GET_COMMENTS",
    payload: commentStatus
  }
}

export const NEW_COMMENT = 'NEW_COMMENT'
export const newCommentAction = (commentStatus) => {
  return {
    type: "CEATE_COMMENT",
    payload: {
      ...commentStatus
    }
  }
}
