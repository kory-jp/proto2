import React, { memo } from 'react'
import { Flex, Box } from "@chakra-ui/layout";
import Header from '../organisms/layout/Header';
import SideBar from '../organisms/layout/SideBar';

export const DefaultLayout = memo((props)=> {
  console.log(props)
  const {children} = props;
  return(
    <>
      <Header/>
      <Flex m={{base: "2", lg: "9"}}>
        <Box w="25%" m="2" display={{base: "none", md: "block"}}>
        <SideBar/>
        </Box>
        <Box 
          w={{base: "90%", md: "70%"}} 
          m={{base: "auto", md: "2"}}
          > 
        {children}
        </Box>
      </Flex>
    </>
  )
})

export default DefaultLayout;