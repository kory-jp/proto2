import { Box } from '@chakra-ui/layout';
import React, { memo, useContext } from 'react'
import { LoggedInStatusContext } from '../../providers/LoggedInStatusProvider';
import Registration from '../auth/Registration';

export const Home = memo(()=> {
  const {loggedInStatus} = useContext(LoggedInStatusContext)
  console.log({loggedInStatus})

  return(
    <Box>
      <p>ホーム</p>
      <h2>ログイン状態: {`${loggedInStatus.login}`}</h2>
      <Registration />
    </Box>
  )
})

export default Home;