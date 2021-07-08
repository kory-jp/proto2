import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';
import defaultImage from '../../../assets/img/defaultImage.jpeg'
import { DefaultFlex, DefaultText, DefaultTitleText } from '../../../assets/style/chakraStyles';
import useReturnTop from '../../../hooks/useReturnTop';
import PrimaryTag from '../../atoms/tag/PrimaryTag'

export const PostCard = (props)=> {
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const {id, userId, title, tags, nickname, image, created_at} = props.post;

  const toPostShow = useCallback(()=> {
    dispatch(push('/posts/show/' + id))
    returnTop()
  },[dispatch, returnTop, id])

  const toUserInfoPage = useCallback(() => {
    dispatch(push(`users/${userId}`))
    returnTop()
  },[dispatch, returnTop, userId])

  const toTagIndex = useCallback((tag)=> {
    dispatch(push(`/posts/tag/${tag.id}`))
    returnTop()
  },[dispatch, returnTop])

  return(
    <DefaultFlex w="100%" mb="2">
      <Image
        src={image.url? image.url : defaultImage}
        alt="投稿画像"
        boxSize={{base: '20', md: '3xs'}}
        objectFit="cover"
        borderRadius="md"
        minW="15%"
        onClick={toPostShow}
        cursor="pointer"
      />
      <DefaultFlex flexDirection="column" justifyContent="space-between" w="100%" p="2" ml="2">
        <Flex flexDirection="column">
          <DefaultTitleText
            fontWeight="bold"
            onClick={toPostShow}
            cursor="pointer"
            mb="4px"
          > 
            {title}
          </DefaultTitleText>
          <Flex>
            {
              tags? tags.length > 0 && (
                tags.map(tag => (
                  <PrimaryTag
                    key={tag.id}
                    onClick={() => toTagIndex(tag)}
                  >
                    {tag.name}
                  </PrimaryTag>
                ))
              ): null
            }
        </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          <DefaultText
            onClick={ toUserInfoPage}
            cursor="pointer"
          >
            {nickname}
          </DefaultText>
          <DefaultText>{created_at}</DefaultText>
        </Flex>
      </DefaultFlex>
    </DefaultFlex>
  )
}

export default PostCard;