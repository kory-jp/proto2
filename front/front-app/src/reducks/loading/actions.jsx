export const NOT_LOADING = 'NOT_LOADING'
export const notLoadingAction = (loading) => {
  return {
    type: 'NOT_LOADING',
    payload: loading,
  }
}

export const NOW_LOADING = 'NOW_LOADING'
export const nowLoadingAction = (loading) => {
  return {
    type: 'NOW_LOADING',
    payload: loading
  }
}