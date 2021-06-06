import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInStatus } from "../../reducks/users/operations";

const Auth = ({children}) => {
  console.log('ログイン確認')
  const dispatch =  useDispatch();

  useEffect(()=> {
    console.log('実行確認')
    dispatch(loggedInStatus())
  },[])

  return children
}

export default Auth;