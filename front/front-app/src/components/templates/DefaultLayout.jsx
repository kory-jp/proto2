import React from 'react'
import { Box, Flex } from '@chakra-ui/layout';
import Header from '../organisms/layout/Header';
import SideBar from '../organisms/layout/SideBar';

export const DefaultLayout = (props)=> {
  const {children} = props;
  return(
    <>
      <Box 
        position="fixed" 
        zIndex="100"
        top="0" 
        w="full"
      >
      <Header/>
      </Box>
      <Flex 
        m={{base: "2", lg: "9"}}
        mt="20"
      >
        <Box 
          w="25%" 
          m="2" 
          display={{base: "none", md: "block"}}
          pt={{base: "16", lg: "28"}}
        >
          <Box position="sticky" top="40">
            <SideBar/>
          </Box>
        </Box>
        <Box 
          w={{base: "90%", md: "70%"}} 
          m={{base: "auto", md: "2"}}
          pt={{base: "8", md: "16",  lg: "28"}}
          > 
        {children}
        </Box>
      </Flex>
    </>
  )
}

export default DefaultLayout;