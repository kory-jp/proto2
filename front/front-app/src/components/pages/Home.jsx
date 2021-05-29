import { Box } from '@chakra-ui/layout';
import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router';
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';
import Login from '../auth/Login';
import Registration from '../auth/Registration';

export const Home = memo((props)=> {
  const history = useHistory();
  const {loggedInStatus, setLoggedInStatus, setUser} = useContext(LoggedInStatusContext)
  const handleSuccessfullAuthentication = (data) => {
    const LoginStatus = {
      login: true
    }
    setLoggedInStatus(LoginStatus)
    console.log(data.user)
    setUser(data.user)
    history.push("/dashboard");
  }

  return(
    <Box>
      <p>ホーム</p>
      <h2>ログイン状態: {`${loggedInStatus.login}`}</h2>
      <Registration handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>
      <Login />
    </Box>
  )
})

export default Home;