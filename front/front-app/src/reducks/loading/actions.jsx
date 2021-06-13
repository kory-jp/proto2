export const NOT_LOADING = 'NOT_LOADING'
export const notLoadingAction = (state) => {
  return {
    type: 'NOT_LOADING',
    payload: {
      state: state,
    },
  }
}

export const NOW_LOADING = 'NOW_LOADING'
export const nowLoadingAction = (state) => {
  return {
    type: 'NOW_LOADING',
    payload: {
      state: state,
    },
  }
}