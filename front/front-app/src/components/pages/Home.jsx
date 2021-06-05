import { Box, Stack, Text } from '@chakra-ui/layout';
import React, { memo, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';
import Login from '../auth/Login';
import Registration from '../auth/Registration';

import {useDispatch, useSelector} from "react-redux";
import ReduxLogin from '../auth/ReduxLogin';
import ReduxRegistration from '../auth/ReduxRegistration';

export const Home = memo((props)=> {
  const dispatch = useDispatch()
  const selector  = useSelector((state)=> state)
  console.log(selector)

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
      <Stack spacing="10">
        <Login handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>     
        <Registration handleSuccessfullAuthentication={handleSuccessfullAuthentication}/>
        <Text>Redux</Text>
        <ReduxLogin />
        <ReduxRegistration />
      </Stack>
    </Box>
  )
})

export default Home;