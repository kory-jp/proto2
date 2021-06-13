import { createSelector } from 'reselect'

const messageSelector = (state) => state.message

export const getMessageSelector = createSelector(
  [messageSelector],
  (state) => state
)