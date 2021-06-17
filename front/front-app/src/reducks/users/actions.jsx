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