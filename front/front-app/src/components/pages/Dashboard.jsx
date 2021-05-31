import { Box } from '@chakra-ui/layout';
import React, { memo, useContext, useEffect } from 'react'
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';

export const Dashboard = memo(()=> {
  const {checkLoginStatus, user, loggedInStatus} = useLoggedInStatus();
  useEffect(()=> {
    checkLoginStatus()
  })


  return(
    <Box>
      <p>ダッシュボード</p>
      <h2>ログイン状態: {`${loggedInStatus}`}</h2>
      <p>ユーザー名:{`${user.name}`}</p>
    </Box>
  )
})

export default Dashboard;