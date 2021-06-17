import {createSelector} from 'reselect';

const postsSelector = (state) => state.posts;

export const getPost = createSelector(
  [postsSelector],
  (state) => state
)