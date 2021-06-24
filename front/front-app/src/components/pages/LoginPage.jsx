import { Box, Flex } from '@chakra-ui/layout';
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { completedLoggedInStatus } from '../../reducks/users/operations';
import Login from '../auth/Login';

export const LoginPage = ()=> {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[dispatch])
  return(
    <Flex align="center" justify="center" height="100vh" m="2">
      <Box w="lg" p="3">
        <Login />
      </Box>
    </Flex>
  )
}

export default LoginPage;