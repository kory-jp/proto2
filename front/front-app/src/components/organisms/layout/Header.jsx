import React from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { useDispatch } from 'react-redux'
import {push} from 'connected-react-router';
import { Button } from '@chakra-ui/button';
import MenuIcon from '@material-ui/icons/Menu';
import { useDisclosure } from "@chakra-ui/react"
import { Link } from '@chakra-ui/react';

import { logOut } from '../../../reducks/currentUser/operations';
import useMessage from '../../../hooks/useMessage';
import {MenuDrawer} from '../../molecules/MenuDrawer';

export const Header = ()=> {
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  const {isOpen, onOpen, onClose} = useDisclosure()
  return(
    <>
      <Flex bg="gray.400" h="100px" mb="4" p="4" w="full">
        <Flex mt="auto" mb="auto" justifyContent="space-between" w="full">
          <Text
          as="h1"
          fontSize={{base: "sm", md: "xl"}}
          fontWeight="bold"
          onClick={()=> dispatch(push('/posts'))}
          cursor="pointer"
          >
            トップページへ
          </Text>
          <Flex display={{base: "none", md: "flex"}}>
            <Button
              bg="white"
              onClick={()=> dispatch(push('/posts/new'))}
              mr="2"
            >
              新規投稿
            </Button>
            <Button
              bg="white"
              type="submit"
              onClick={()=> dispatch(logOut(showMessage))}
            >
              ログアウト
            </Button>
          </Flex>
          <Flex display={{base: "flex", md: "none"}}>
            <Link onClick={onOpen}>
              <MenuIcon />
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen}/>
    </>
  )
}

export default Header;