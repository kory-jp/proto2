// ログアウト機能
import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import { LoggedInStatusContext } from "../providers/LoggedInStatusProvider";

export const useLogout = () => {
  const {setLoggedInStatus, setUser} = useContext(LoggedInStatusContext);
  const history = useHistory();

  const changeLogout = () => {
    axios
      .delete("http://localhost:3001/api/v1/user/logout", { withCredentials: true})
      .then(response => {
        console.log('ログアウト')
        setLoggedInStatus(false)
        setUser({})
        history.push('/')
      })
      .catch(error => console.log("ログアウトエラー", error))
  }
  return(changeLogout)
}

export default useLogout;