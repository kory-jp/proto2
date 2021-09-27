import React from 'react'
import {
  Tag,
} from "@chakra-ui/react"


export const PrimaryTag = (props) => {
  const  {children, onClick } = props;
  return(
    <Tag
      fontSize={{base: "3px", md: "10px"}}
      maxW={{base: "50px", md: "60px"}}
      bg="gray.400"
      color="white"
      onClick={onClick}
      mt="1"
      mb="1"
      mr="2"
      as="a"
      cursor="pointer"
    >
      {children}
    </Tag>
  )
}

export default PrimaryTag;