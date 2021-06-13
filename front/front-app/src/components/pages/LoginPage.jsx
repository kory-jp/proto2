import { Box, Flex } from '@chakra-ui/layout';
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { completedLoggedInStatus } from '../../reducks/users/operations';

import Login from '../auth/Login';

export const LoginPage = memo(()=> {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[])
  return(
    <Flex align="center" justify="center" height="100vh">
      <Box w="lg" p="3">
        <Login />
      </Box>
    </Flex>
  )
})

export default LoginPage;