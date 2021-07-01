import { 
  createStore as reduxCreateStore, 
  combineReducers,
  applyMiddleware
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';

import {CurrentUserReducer } from '../currentUser/reducers';
import { LoadingReducer } from '../loading/reducers';
import { PostsReducer } from '../posts/reducers';
import { UsersReducers } from '../users/reducers';

export default function createState(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      loading: LoadingReducer,
      currentUser: CurrentUserReducer,
      users: UsersReducers,
      posts: PostsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
};