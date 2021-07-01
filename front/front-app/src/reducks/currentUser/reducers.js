import * as Actions from './actions'
import initialState from '../store/initialState'

export const CurrentUserReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case Actions.REGISTRATION:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.LOG_IN:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.LOG_OUT:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.UPDATE_CURRENTUSER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}