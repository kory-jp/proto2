import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

export const DefaultBox = (props) => {
  return <Box
    bg="white" 
    p={{base: 2, md: 5}} 
    shadow="md" 
    borderRadius="md"
    {...props}
  />
}

export const DefaultFlex = (props) => {
  return <Flex 
    bg="white" 
    p={{base: 2, md: 5}} 
    shadow="md" 
    borderRadius="md"
    {...props}
  />
}

export const DefaultText = (props) => {
  return <Text 
    fontSize={{base: "sm", md: "lg"}}
    {...props}
  />
}