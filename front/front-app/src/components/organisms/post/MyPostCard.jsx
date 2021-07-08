import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Image, Link } from "@chakra-ui/react"
import CreateIcon from '@material-ui/icons/Create';
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router';
import defaultImage from '../../../assets/img/defaultImage.jpeg'
import { DefaultFlex, DefaultText, DefaultTitleText } from '../../../assets/style/chakraStyles';
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId';
import PrimaryTag from '../../atoms/tag/PrimaryTag';
import useReturnTop from '../../../hooks/useReturnTop';

export const MyPostCard = (props)=> {
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const currentUserId = useGetCurrentUserId()
  const {id, user_id, tags, title, image, created_at} = props.post;

  const toPostShow = useCallback(()=> {
    dispatch(push('/posts/show/' + id))
    returnTop()
  },[dispatch, returnTop, id])

  const toTagIndex = useCallback((tag)=> {
    dispatch(push(`/posts/tag/${tag.id}`))
    returnTop()
  },[dispatch, returnTop])

  const toPostEdit = useCallback(()=> {
    dispatch(push('/posts/edit/' + id))
    returnTop()
  },[dispatch, returnTop, id])

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
        <DefaultTitleText
          fontWeight="bold"
          onClick={toPostShow}
          cursor="pointer"
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
        <Flex justifyContent="space-between">
          { 
            user_id === currentUserId ? (
              <Link
                onClick={toPostEdit}
                fontSize={{base: "sm", md: "lg"}}
              >
                <CreateIcon fontSize="small"/>
                編集
              </Link>
            ): null
          }
          <DefaultText>{created_at}</DefaultText>
        </Flex>
      </DefaultFlex>
    </DefaultFlex>
  )
}

export default MyPostCard;