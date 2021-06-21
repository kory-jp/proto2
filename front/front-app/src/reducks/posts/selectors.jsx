import {createSelector} from 'reselect';

const postsSelector = (state) => state.posts;

export const getPostsSelect = createSelector(
  [postsSelector],
  (state) => state.list
)

export const getPostSelect = createSelector(
  [postsSelector],
  (state) => state
)