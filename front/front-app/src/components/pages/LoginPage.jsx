import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { completedLoggedInStatus } from '../../reducks/currentUser/operations';
import Login from '../auth/Login';
import SubLayout from '../templates/SubLayout';

export const LoginPage = ()=> {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[dispatch])
  return(
    <SubLayout>
      <Flex 
        align="center" 
        justify="center" 
        m="2"
      >
        <Box w="lg" p="3">
          <Login />
        </Box>
      </Flex>
    </SubLayout>
  )
}

export default LoginPage;