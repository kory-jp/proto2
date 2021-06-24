import * as Actions from './actions'
import initialState from '../store/initialState'

export const PostsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case Actions.GETPOSTS:
      return{
        ...state,
        list: [...action.payload]
      }
    case Actions.NEWPOST:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SHOWPOST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.UPDATEPOST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.DELETEPOST:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}