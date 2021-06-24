import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInStatus } from "../../reducks/users/operations";

const Auth = ({children}) => {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(loggedInStatus())
  },[dispatch])

  return children
}

export default Auth;