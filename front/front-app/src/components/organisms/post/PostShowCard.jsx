import React, { useCallback } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Link, Wrap, WrapItem } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import CreateIcon from '@material-ui/icons/Create';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
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
import { createFavorite, destroyFavorite } from '../../../reducks/favorite/operations'
import { useParams } from 'react-router'
import useLoadingState from '../../../hooks/useLoadingState'
import BooleanButton from '../../atoms/button/BooleanButton'
import { nowLoadingAction } from '../../../reducks/loading/actions'

export const PostShowCard = (props)=> {
  const dispatch = useDispatch()
  const returnTop = useReturnTop()
  const { user_id, nickname, userIcon, title, tags, image, content, created_at} = props.post;
  const postId = useParams()
  const currentUserId = useGetCurrentUserId()
  const loadingState = useLoadingState()
  
  const favorite = useSelector((state)=> state.favorite.status)

  const toggleFavorite = useCallback(()=> {
    if (favorite){
      dispatch(destroyFavorite(postId, currentUserId))
    } else {
      dispatch(createFavorite(postId, currentUserId))
    }
  },[dispatch, favorite, postId, currentUserId])

  const toShowUsers = useCallback(()=> {
    dispatch(push(`/users/${user_id}`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, user_id])

  const toEditPost = useCallback(()=> {
    dispatch(push(`/posts/edit/${postId.id}`))
    dispatch(nowLoadingAction(true));
    returnTop()
  },[dispatch, returnTop, postId])

  const toTagIndex = useCallback((tag)=> {
    dispatch(push(`/posts/tag?label=${tag.label}`))
    dispatch(nowLoadingAction(true));
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
          <BooleanButton
            onClick={toggleFavorite}
            colorBoolean={favorite}
            loadingState={loadingState}
          >
            {
              favorite ? (
                <>
                  高評価済
                  <ThumbUpIcon style={{fontSize: 13, marginLeft: 5}}/>
                </>
              ) : (
                <>
                  高評価する
                  <ThumbsUpDownIcon style={{fontSize: 13, marginLeft: 5}}/>
                </>
              )
            }
          </BooleanButton>
          { 
            user_id === currentUserId ? (
              <Link
                onClick={toEditPost}
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
                <Wrap>
                {
                  tags.map(tag => (
                    <WrapItem
                      key={tag.id}
                    >
                      <PrimaryTag
                        onClick={()=> toTagIndex(tag)}
                      >
                        {tag.label}
                      </PrimaryTag>
                    </WrapItem>
                  ))
                }
                </Wrap>
              </Flex>
            ): null
          }
          <Flex justifyContent="space-between" pt="2" alignItems="flex-end">
            <Flex alignItems="flex-end">
              <DefaultUserIconImage
              src={userIcon? userIcon : defaultUserIcon}
              alt="userIcon"
              mr="3"
              onClick={toShowUsers}
              cursor="pointer"
              />
              <DefaultText
                onClick={toShowUsers}
                cursor="pointer"
              >
                {nickname}
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