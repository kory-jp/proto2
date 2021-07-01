export const NOW_LOADING = 'NOW_LOADING'
export const nowLoadingAction = (loading) => {
  return {
    type: 'NOW_LOADING',
    payload: {
      status: loading
    }
  }
}