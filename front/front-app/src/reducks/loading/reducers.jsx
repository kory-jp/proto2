import initialState from '../store/initialState'
import * as Actions from './actions'

export const LoadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case Actions.NOT_LOADING:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.NOW_LOADING:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}