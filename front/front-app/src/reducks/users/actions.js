export const SHOWUSERS = 'SHOWUSERS'
export const showUsersAction = (usersStatus) => {
  return {
    type: 'SHOWUSERS',
    payload: {
      ...usersStatus
    }
  }
}
