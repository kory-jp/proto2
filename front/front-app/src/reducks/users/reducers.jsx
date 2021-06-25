import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
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
    // case Actions.GET_USER_PROFILE:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    case Actions.USER_UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}