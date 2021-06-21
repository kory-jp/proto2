import React, { memo } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { Image } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';

export const PostCard = memo((props)=> {
  const dispatch = useDispatch()
  const {id, title, name, image, created_at} = props.post;
  return(
    <Flex bg="white" m="2" p="2" borderRadius="md" shadow="md" w="100%">
      <Image
        src={image.url}
        alt="投稿画像"
        boxSize="3xs"
        objectFit="cover"
        borderRadius="md"
        minW="15%"
        onClick={()=> dispatch(push('/posts/show/' + id))}
        cursor="pointer"
      />
      <Flex flexDirection="column" justifyContent="space-between" w="100%" p="2">
        <Text
          fontSize="lg"
          fontWeight="bold"
          onClick={()=> dispatch(push('/posts/show/' + id))}
          cursor="pointer"
        >
          {title}
        </Text>
        <Flex justifyContent="space-between">
          <Text>{name}</Text>
          <Text>{created_at}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
})

export default PostCard;