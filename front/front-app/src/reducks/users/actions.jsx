export const REGISTRATION = 'REGISTRATION'
export const registrationAction = (userState) => {
  console.log(userState);
  return {
    type: "REGISTRATION",
    payload: {
      logged_in: userState.logged_in,
      id: userState.id,
      name: userState.name,
      email: userState.email,
      password: userState.password
    }
  }
}

export  const LOG_IN = "LOG_IN";
export const logInAction = (userState) => {
  console.log(userState)
  return{
    type: "LOG_IN",
    payload: {
      logged_in: userState.logged_in,
      id: userState.id,
      name: userState.name,
      email: userState.email,
      password: userState.password
    }
  }
};

export const LOG_OUT = "LOG_OUT";
export const logOutAction = (usersState) => {
  console.log(usersState)
  return {
    type: "LOG_OUT",
    payload: {
      logged_in: usersState.logged_in,
      id: usersState.id,
      name: usersState.name,
      email: usersState.email,
      password: usersState.password
    }
  }
}