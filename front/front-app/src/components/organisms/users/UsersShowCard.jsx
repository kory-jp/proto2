import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/layout'
import defaultUserIcon from '../../../assets/img/defaultUserIcon.jpeg'
import { DefaultFlex, DefaultText, DefaultUserIconImage } from '../../../assets/style/chakraStyles'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { showUsers } from '../../../reducks/users/operations'

export const UsersShowCard = () => {
  // export const UsersShowCard = (props) => {
  // const {name, nickname, introduction, userIcon } = props.users;

  const userId = useParams();
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(showUsers(userId))
  },[dispatch, userId])
  
  const users =  useSelector((state)=> state.users)
  const { nickname, introduction, userIcon} = users

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
        // w="full"
        w={{base: "full", xl: "75%"}}
        m={{base: "auto", md: "2"}}
        >
          <DefaultText
            as="h2"
            fontWeight="bold"
          >
            {nickname}
          </DefaultText>
          <DefaultText>
            {introduction}
          </DefaultText>
        </DefaultFlex>
      </Flex>
    </DefaultFlex>
  )
}

export default UsersShowCard;