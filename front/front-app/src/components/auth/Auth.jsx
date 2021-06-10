import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { completedLoggedInStatus, loggedInStatus } from "../../reducks/users/operations";

const Auth = ({children}) => {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(loggedInStatus())
    dispatch(completedLoggedInStatus())
  },[])

  return children
}

export default Auth;