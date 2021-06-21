export const GETPOSTS = 'GETPOSTS';
export const getPostsAction = (posts) => {
  return {
    type: 'GETPOSTS',
    payload: posts,
  }
}

export const POSTNEW  = 'POSTNEW';
export const postNewAction = (postStatus) => {
  return {
    type: 'POSTNEW',
    payload: {
      ...postStatus
    }
  }
}

export const POSTSHOW = 'POSTSHOW';
export const postShowAction = (postStatus) => {
  return {
    type: 'POSTSHOW',
    payload: {
      ...postStatus
    }
  }
}

export const POSTUPDATE = 'POSTUPDATE';
export const postUpdateAction = (postStatus) => {
  return {
    type: 'POSTUPDATE',
    payload: {
      ...postStatus
    }
  }
}

export const POSTUPDELETE = 'POSTUPDELETE';
export const postDeleteAction = (postStatus) => {
  return {
    type: 'POSTUPDELETE',
    payload: {
      ...postStatus
    }
  }
}