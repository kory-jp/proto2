import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useMessage from "../../hooks/useMessage";
import { loggedInStatus } from "../../reducks/currentUser/operations";

const Auth = ({children}) => {
  const dispatch =  useDispatch();
  const showMessage = useMessage()

  useEffect(()=> {
    dispatch(loggedInStatus(showMessage))
  },[dispatch, showMessage])

  return children
}

export default Auth;