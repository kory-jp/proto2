import React, { memo } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';
import defaultImage from '../../../assets/img/defaultImage.jpeg'
import { DefaultFlex, DefaultText } from '../../../assets/style/chakraStyles';

export const PostCard = memo((props)=> {
  const dispatch = useDispatch()
  const {id, title, name, image, created_at} = props.post;
  return(
    <DefaultFlex w="100%" mb="2">
      <Image
        src={image.url? image.url : defaultImage}
        alt="投稿画像"
        boxSize={{base: '20', md: '3xs'}}
        objectFit="cover"
        borderRadius="md"
        minW="15%"
        onClick={()=> dispatch(push('/posts/show/' + id))}
        cursor="pointer"
      />
      <Flex flexDirection="column" justifyContent="space-between" w="100%" p="2">
        <DefaultText
          fontWeight="bold"
          onClick={()=> dispatch(push('/posts/show/' + id))}
          cursor="pointer"
        >
          {title}
        </DefaultText>
        <Flex justifyContent="space-between">
          <DefaultText>{name}</DefaultText>
          <DefaultText>{created_at}</DefaultText>
        </Flex>
      </Flex>
    </DefaultFlex>
  )
})

export default PostCard;