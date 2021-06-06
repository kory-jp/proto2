import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import React, { memo, useContext, useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";

import {logOut} from "../../reducks/users/operations"
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import useLogout from '../../hooks/useLogout';
import {getUser} from '../../reducks/users/selectors'

export const Dashboard = memo(()=> {
  const {checkLoginStatus, user, loggedInStatus} = useLoggedInStatus();
  useEffect(()=> {
    checkLoginStatus()
  })

  const changeLogout = useLogout();
  const handleLogoutClick = () => {
    changeLogout()
  }

  const selector = useSelector((state) => state);
  console.log(selector)
  const reduxUser = getUser(selector);
  console.log(reduxUser)



  const dispatch = useDispatch();

  return(
    <Box>
      <Box mb="8">
        <p>ダッシュボード</p>
        <h2>ログイン状態: {`${loggedInStatus}`}</h2>
        <p>ユーザーID:{user.id}</p>
        <p>ユーザー名:{`${user.name}`}</p>
        <Button onClick={handleLogoutClick}>ログアウト</Button>
      </Box>
      <Box>
        <Text>ReduxLoginUserInfo</Text>
        <h2>ログイン状態: {`${reduxUser.logged_in}`}</h2>
        <p>ユーザーID:{reduxUser.id}</p>
        <p>ユーザー名:{`${reduxUser.name}`}</p>
      </Box>
      <Button
        type="submit"
        onClick={()=> dispatch(logOut())}
      >
        ログアウト
      </Button>
    </Box>
  )
})

export default Dashboard;