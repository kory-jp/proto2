import React from 'react'
import { Button } from '@chakra-ui/button';

export const SideBarButton = (props)=> {
  const {children, onClick, leftIcon} = props
  return(
    <Button 
      shadow="md" 
      colorScheme="gray.300"
      variant="outline"
      onClick={onClick}
      leftIcon={leftIcon}
      textAlign="left"
    >
     {children}
   </Button>
  )
}

export default SideBarButton;
