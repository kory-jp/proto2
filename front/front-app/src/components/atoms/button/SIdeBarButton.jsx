import React, { memo } from 'react'
import { Button } from '@chakra-ui/button';

export const SideBarButton = memo((props)=> {
  const {children, onClick, leftIcon} = props
  return(
    <Button 
      shadow="md" 
      colorScheme="blue" 
      variant="outline"
      onClick={onClick}
      leftIcon={leftIcon}
      textAlign="left"
    >
     {children}
   </Button>
  )
})

export default SideBarButton;
