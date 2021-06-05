import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

export const getUser = createSelector(
  [usersSelector],
  (state) => state
)