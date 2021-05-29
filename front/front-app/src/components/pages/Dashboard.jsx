import { Box } from '@chakra-ui/layout';
import React, { memo, useContext } from 'react'
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';

export const Dashboard = memo(()=> {
  const {loggedInStatus, user} = useContext(LoggedInStatusContext);
  console.log(user);
  return(
    <Box>
      <p>ダッシュボード</p>
      <h2>ログイン状態: {`${loggedInStatus.login}`}</h2>
      <p>ユーザー名:{`${user.name}`}</p>
    </Box>
  )
})

export default Dashboard;