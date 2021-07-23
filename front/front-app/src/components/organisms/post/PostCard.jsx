import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';
import defaultImage from '../../../assets/img/defaultImage.jpeg'
import { DefaultFlex, DefaultText, DefaultTitleText } from '../../../assets/style/chakraStyles';
import useReturnTop from '../../../hooks/useReturnTop';
import PrimaryTag from '../../atoms/tag/PrimaryTag'
import { nowLoadingAction } from '../../../reducks/loading/actions';

export const PostCard = (props)=> {
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const {id, user_id, title, tags, nickname, image, created_at} = props.post;

  const toPostShow = useCallback(()=> {
    dispatch(push('/posts/show/' + id))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, id])

  const toUserInfoPage = useCallback(() => {
    dispatch(push(`/users/${user_id}`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, user_id])

  const toTagIndex = useCallback((tag)=> {
    dispatch(push(`/posts/tag?label=${tag.label}`))
    dispatch(nowLoadingAction(true));
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
          {
            tags.length > 0 && (
              <Flex>
                {
                  tags.map(tag => (
                    <PrimaryTag
                      key={tag.id}
                      onClick={() => toTagIndex(tag)}
                    >
                      {tag.label}
                    </PrimaryTag>
                  ))
                }
              </Flex>
            )
          }
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