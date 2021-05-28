import React,{ createContext, useState } from "react";

export const LoggedInStatusContext = createContext({});

export const LoggedInStatusProvider = (props) => {
  const {children} = props;
  const initialState = {
    login: false
  }
  const [ loggedInStatus, setLoggedInStatus ] = useState(initialState);
  console.log(loggedInStatus)

  return(
    <LoggedInStatusContext.Provider value={{ loggedInStatus, setLoggedInStatus}}>
      {children}
    </LoggedInStatusContext.Provider>
  )
}

export default LoggedInStatusProvider;