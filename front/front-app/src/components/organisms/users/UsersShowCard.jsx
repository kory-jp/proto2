import React, { useCallback, useEffect } from 'react'
import { Flex } from '@chakra-ui/layout'
import { useParams } from 'react-router'
import { Divider } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CheckIcon from '@material-ui/icons/Check';

import { showUsers } from '../../../reducks/users/operations'
import { confirmFollowing, createFollowing, destroyFollowing } from '../../../reducks/follow/operations'
import BooleanButton from '../../atoms/button/BooleanButton'
import { DefaultFlex, DefaultText, DefaultTitleText, DefaultUserIconImage } from '../../../assets/style/chakraStyles'
import defaultUserIcon from '../../../assets/img/defaultUserIcon.jpeg'
import useLoadingState from '../../../hooks/useLoadingState'
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId'
import EntryButton from '../entry/EntryButton'

export const UsersShowCard = () => {

  const userId = useParams();
  const id = Number(userId.id)
  const currentUserId = useGetCurrentUserId()
  const dispatch = useDispatch()
  const loadingState = useLoadingState()

  useEffect(()=> {
    dispatch(showUsers(userId))
    dispatch(confirmFollowing(userId))
  },[dispatch, userId])
  
  const users =  useSelector((state)=> state.users)
  const { nickname, introduction, userIcon} = users

  const follow = useSelector((state)=> state.follow.status)

  const toggleFollow = useCallback(()=> {
    if (follow ) {
      dispatch(destroyFollowing(userId))
    } else {
      dispatch(createFollowing(userId))
    }
  },[dispatch, follow, userId])

  return(
    <DefaultFlex
    flexDirection="column"
    w="full"
    >
      <Flex
        w="full" 
        flexDirection={{base: "column", xl: "initial"}}
      >
        <DefaultUserIconImage
          src={userIcon? userIcon : defaultUserIcon}
          alt="投稿画像" 
          m={{base: "auto", md: "2"}}
          mb="2"
          boxSize={{base: "150px", md: "3xs"}}
        />
        <DefaultFlex
        flexDirection="column"
        w={{base: "full", xl: "75%"}}
        m={{base: "auto", md: "2"}}
        >
          <Flex flexDirection={{base: "column", md: "unset"}}>
            <DefaultTitleText
              as="h2"
              mr="5"
              mb={{base: "3", md: "0"}}
            >
              {nickname}
            </DefaultTitleText>
            {
              currentUserId !== id ? (
                <BooleanButton
                onClick={toggleFollow}
                colorBoolean={follow}
                loadingState={loadingState}
              >
                {
                  follow ? (
                    <>
                      フォロー中
                      <CheckIcon style={{fontSize: 14, marginLeft: 5}}/>
                    </>
                  ) : (
                    <>
                      フォローする
                      <GroupAddIcon style={{fontSize: 14, marginLeft: 5}}/>
                    </>
                  )
                }
              </BooleanButton>
              ) : null
            }
            <EntryButton />
          </Flex>
          <Divider 
            mb="2"
          />
          <DefaultText>
            {introduction}
          </DefaultText>
        </DefaultFlex>
      </Flex>
    </DefaultFlex>
  )
}

export default UsersShowCard;