import { Box } from '@chakra-ui/layout';
import React, { memo, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';
import Login from '../auth/Login';
import Registration from '../auth/Registration';

export const Home = memo((props)=> {

  const history = useHistory();
  const {loggedInStatus, setLoggedInStatus, setUser} = useContext(LoggedInStatusContext)

  const handleSuccessfullAuthentication = (data) => {
    setLoggedInStatus(true)
    console.log(data.user)
    setUser(data.user)
    history.push("/dashboard");
  }


  return(
    <Box>
      <p>ホーム</p>
      <h2>ログイン状態: {`${loggedInStatus.login}`}</h2>
      <Login handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>     
      <Registration handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>
    </Box>
  )
})

export default Home;