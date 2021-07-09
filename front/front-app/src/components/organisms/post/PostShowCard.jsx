import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Link } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import CreateIcon from '@material-ui/icons/Create';
import defaultImage from '../../../assets/img/defaultImage.jpeg'
import defaultUserIcon from '../../../assets/img/defaultUserIcon.jpeg'
import { DefaultFlex, 
         DefaultText, 
         DefaultTitleText, 
         DefaultImage, 
         DefaultUserIconImage 
        } from '../../../assets/style/chakraStyles'
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId'
import PrimaryTag from '../../atoms/tag/PrimaryTag'
import useReturnTop from '../../../hooks/useReturnTop'

export const PostShowCard = (props)=> {
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const {id, user_id, name, nickname, userIcon, title, tags, image, content, created_at} = props.post;
  const currentUserId = useGetCurrentUserId()
  const toTagIndex = useCallback((tag)=> {
    dispatch(push(`/posts/tag/${tag.id}`))
    returnTop()
  },[dispatch, returnTop])
  return(
    <DefaultFlex
    flexDirection="column"
    w="full"
    >
      <Flex 
        w="full" 
        flexDirection={{base: "column", xl: "initial"}}
      >
        <DefaultImage
          src={image? image : defaultImage}
          alt="投稿画像" 
          m={{base: "auto", md: "2"}}
          mb="2"
        />
        <DefaultFlex
        flexDirection="column"
        w="full"
        m={{base: "auto", md: "2"}}
        >
          <DefaultTitleText
            as="h2"
            fontWeight="bold"
          >
            {title}
          </DefaultTitleText>
          { 
            user_id === currentUserId ? (
              <Link
                onClick={()=> dispatch(push(`/posts/edit/${id}`))}
                fontSize={{base: "sm", md: "lg"}}
              >
                <CreateIcon fontSize="small"/>
                編集
              </Link>
            ): null
          }
          {
            tags? tags.length > 0 && (
              <Flex mt="2" mb="2">
                {
                  tags.map(tag => (
                    <PrimaryTag
                      key={tag.id}
                      onClick={()=> toTagIndex(tag)}
                    >
                      {tag.name}
                    </PrimaryTag>
                  ))
                }
              </Flex>
            ): null
          }
          <Flex justifyContent="space-between" pt="2" alignItems="flex-end">
            <Flex alignItems="flex-end">
              <DefaultUserIconImage
              src={userIcon? userIcon : defaultUserIcon}
              alt="userIcon"
              mr="3"
              onClick={()=> dispatch(push(`/users/${user_id}`))}
              cursor="pointer"
              />
              <DefaultText
                onClick={()=> dispatch(push(`/users/${user_id}`))}
                cursor="pointer"
              >
                {nickname? nickname: name}
              </DefaultText>
            </Flex>
            <DefaultText>{created_at}</DefaultText>
          </Flex>
        </DefaultFlex>
      </Flex>
      <DefaultFlex mt="2">
        <DefaultText>{content}</DefaultText>
      </DefaultFlex>
    </DefaultFlex>
  )
}

export default PostShowCard;