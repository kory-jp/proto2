// ログイン状態を維持、確認するカスタムフック
import {useContext, useState} from 'react';
import axios from 'axios';
import { LoggedInStatusContext } from '../providers/LoggedInStatusProvider';


export const useLoggedInStatus = () => {
  const {loggedInStatus, setLoggedInStatus, user, setUser} = useContext(LoggedInStatusContext);

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/api/v1/user/logged_in", {withCredentials: true})
      .then(response => {
        console.log("ログイン状況:", response)
        if (response.data.logged_in && loggedInStatus === false ) {
          console.log(true)
          setLoggedInStatus(true)
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === true ) {
          console.log(false)
          setLoggedInStatus(false)
          setUser({})
        }
      }).catch(error => {
        console.log("ログインエラー:", error)
      })
  }
  return { checkLoginStatus, user, loggedInStatus}
}

export default useLoggedInStatus;