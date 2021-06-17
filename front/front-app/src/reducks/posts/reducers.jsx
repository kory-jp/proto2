import * as Actions from './actions'
import initialState from '../store/initialState'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.POSTNEW:
      return {
        ...state,
        ...action.payload,
      }
    // case Actions.LOG_IN:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    // case Actions.LOG_OUT:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    default:
      return state
  }
}