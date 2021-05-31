import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { memo, useContext, useEffect } from 'react'
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import useLogout from '../../hooks/useLogout';

export const Dashboard = memo(()=> {
  const {checkLoginStatus, user, loggedInStatus} = useLoggedInStatus();
  useEffect(()=> {
    checkLoginStatus()
  })

  const changeLogout = useLogout();
  const handleLogoutClick = () => {
    changeLogout()
  }


  return(
    <Box>
      <p>ダッシュボード</p>
      <h2>ログイン状態: {`${loggedInStatus}`}</h2>
      <p>ユーザー名:{`${user.name}`}</p>
      <Button onClick={handleLogoutClick}>ログアウト</Button>
    </Box>
  )
})

export default Dashboard;