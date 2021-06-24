export const GETPOSTS = 'GETPOSTS';
export const getPostsAction = (posts) => {
  return {
    type: 'GETPOSTS',
    payload: posts,
  }
}

export const NEWPOST  = 'NEWPOST';
export const newPostAction = (postStatus) => {
  return {
    type: 'NEWPOST',
    payload: {
      ...postStatus
    }
  }
}

export const SHOWPOST = 'SHOWPOST';
export const showPostAction = (postStatus) => {
  return {
    type: 'SHOWPOST',
    payload: {
      ...postStatus
    }
  }
}

export const UPDATEPOST = 'UPDATEPOST';
export const updatePostAction = (postStatus) => {
  return {
    type: 'UPDATEPOST',
    payload: {
      ...postStatus
    }
  }
}

export const DELETEPOST = 'DELETEPOST';
export const deletePostAction = (postStatus) => {
  return {
    type: 'DELETEPOST',
    payload: {
      ...postStatus
    }
  }
}