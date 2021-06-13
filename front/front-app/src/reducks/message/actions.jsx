export const SET_MESSAGE = 'SET_MESSAGE'
export const setMessage = (state) => {
  console.log(state)
  return {
    type: 'SET_MESSAGE',
    payload: {
      isOpen: true,
      title: state.title,
      status: state.status,
    },
  }
}