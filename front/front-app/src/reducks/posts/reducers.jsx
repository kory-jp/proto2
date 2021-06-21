import * as Actions from './actions'
import initialState from '../store/initialState'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.GETPOSTS:
      return{
        ...state,
        list: [...action.payload]
      }
    case Actions.POSTNEW:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.POSTSHOW:
      return {
        ...state,
        ...action.payload
      }
    case Actions.POSTUPDATE:
      return {
        ...state,
        ...action.payload
      }
    case Actions.POSTUPDELETE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}