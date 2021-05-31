import { Box } from '@chakra-ui/layout';
import React, { memo, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';
import Login from '../auth/Login';
import Registration from '../auth/Registration';

export const Home = memo((props)=> {

  const history = useHistory();
  const { setLoggedInStatus, setUser} = useContext(LoggedInStatusContext)

  const handleSuccessfullAuthentication = (data) => {
    setLoggedInStatus(true)
    console.log(data.user)
    setUser(data.user)
    history.push("/dashboard");
  }

  const {checkLoginStatus, user, loggedInStatus} = useLoggedInStatus();
  useEffect(()=> {
    checkLoginStatus()
  })


  return(
    <Box>
      <h2>ホーム</h2>
      <p>ログイン状態: {`${loggedInStatus}`}</p>
      <Login handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>     
      <Registration handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>
    </Box>
  )
})

export default Home;