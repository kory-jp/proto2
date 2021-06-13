import initialState from '../store/initialState';
import * as Actions from './actions'

export const MessageReducer = ( state = initialState.message, action ) => {
  console.log('message', action)
  switch (action.type) {
    case Actions.SET_MESSAGE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}