import { 
  createStore as reduxCreateStore, 
  combineReducers,
  applyMiddleware
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';

import {UsersReducer } from '../users/reducers';
import { LoadingReducer } from '../loading/reducers';
import { PostsReducer } from '../posts/reducers';

export default function createState(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      loading: LoadingReducer,
      users: UsersReducer,
      posts: PostsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
};