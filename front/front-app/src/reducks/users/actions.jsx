export const REGISTRATION = 'REGISTRATION'
export const registrationAction = (userStatus) => {
  return {
    type: "REGISTRATION",
    payload: {
      ...userStatus
    }
  }
}

export  const LOG_IN = "LOG_IN";
export const logInAction = (userStatus) => {
  return{
    type: "LOG_IN",
    payload: {
      ...userStatus
    }
  }
};

export const LOG_OUT = "LOG_OUT";
export const logOutAction = (usersStatus) => {
  return {
    type: "LOG_OUT",
    payload: {
      ...usersStatus
    }
  }
}

// export const GET_USER_PROFILE = "GET_USER_PROFILE"
// export const getUserProfileAction = (userStatus) => {
//   return {
//     type: "GET_USER_PROFILE",
//     payload: {
//       ...userStatus
//     }
//   }
// }

export const USER_UPDATE = "USER_UPDATE";
export const userUpdateAction = (usersStatus) => {
  return {
    type: "USER_UPDATE",
    payload: {
      ...usersStatus
    }
  }
}