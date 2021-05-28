import { Box } from '@chakra-ui/layout';
import React, { memo, useContext } from 'react'
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';

export const Dashboard = memo(()=> {
  const {loggedInStatus} = useContext(LoggedInStatusContext);
  return(
    <Box>
      <p>ダッシュボード</p>
      <h2>ログイン状態: {`${loggedInStatus.login}`}</h2>
    </Box>
  )
})

export default Dashboard;