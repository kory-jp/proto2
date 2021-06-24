import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { completedLoggedInStatus } from '../../reducks/users/operations';

import Registration from '../auth/Registration';

export const RegistrationPage = ()=> {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[dispatch])
  return(
    <Flex align="center" justify="center" height="100vh" m="2">
      <Box w="lg">
        <Registration />
      </Box>
    </Flex>
  )
}

export default RegistrationPage;