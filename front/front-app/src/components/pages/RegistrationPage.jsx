import { Box, Flex } from '@chakra-ui/layout';
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { completedLoggedInStatus } from '../../reducks/users/operations';

import Registration from '../auth/Registration';

export const RegistrationPage = memo(()=> {
  const dispatch =  useDispatch();

  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[])
  return(
    <Flex align="center" justify="center" height="100vh">
      <Box w="lg">
        <Registration />
      </Box>
    </Flex>
  )
})

export default RegistrationPage;