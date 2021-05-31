import React,{ createContext, useState } from "react";

export const LoggedInStatusContext = createContext({});

export const LoggedInStatusProvider = (props) => {
  const {children} = props;
  const [ loggedInStatus, setLoggedInStatus ] = useState(false);
  const [user, setUser] = useState({});
  console.log(user);

  return(
    <LoggedInStatusContext.Provider value={{ loggedInStatus, setLoggedInStatus, user, setUser}}>
      {children}
    </LoggedInStatusContext.Provider>
  )
}

export default LoggedInStatusProvider;