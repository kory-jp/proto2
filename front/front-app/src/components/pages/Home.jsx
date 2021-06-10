import { Box, Stack } from '@chakra-ui/layout';
import React, { memo } from 'react'
import { useSelector } from 'react-redux';

import { getUser } from '../../reducks/users/selectors';
import ReduxLogin from '../auth/ReduxLogin';
import ReduxRegistration from '../auth/ReduxRegistration';

export const Home = memo(()=> {

  const selector = useSelector((state) => state);
  const reduxUser = getUser(selector);


  return(
    <Box>
      <h2>ホーム</h2>
      <p>ログイン状態: {`${reduxUser.logged_in}`}</p>
      <Stack spacing="10">
        <ReduxLogin />
        <ReduxRegistration />
      </Stack>
    </Box>
  )
})

export default Home;