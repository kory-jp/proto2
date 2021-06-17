export const POSTNEW  = 'POSTNEW';
export const postNewAction = (postState) => {
  return {
    type: 'POSTNEW',
    payload: {
      id: postState.id,
      user_id: postState.userId,
      title: postState.title,
      content: postState.content,
      image: postState.image,
    }
  }
}