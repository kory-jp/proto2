import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { completedLoggedInStatus } from '../../reducks/currentUser/operations';

import Registration from '../auth/Registration';
import SubLayout from '../templates/SubLayout';

export const RegistrationPage = ()=> {
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
        <Box w="lg">
          <Registration />
        </Box>
      </Flex>
    </SubLayout>
  )
}

export default RegistrationPage;