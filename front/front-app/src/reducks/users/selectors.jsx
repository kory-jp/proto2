import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

export const getUser = createSelector(
  [usersSelector],
  (state) => state
)

export const getLoggedIn = createSelector(
  [usersSelector],
  (state) => state.logged_in,
)