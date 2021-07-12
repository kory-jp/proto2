import React, { useCallback, useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import {push} from 'connected-react-router';
import { Button } from '@chakra-ui/button';
import MenuIcon from '@material-ui/icons/Menu';
import { useDisclosure, Select } from "@chakra-ui/react"
import { Link } from '@chakra-ui/react';

import { logOut } from '../../../reducks/currentUser/operations';
import useMessage from '../../../hooks/useMessage';
import {MenuDrawer} from '../../molecules/MenuDrawer';
import { getTags } from '../../../reducks/tags/operations';

export const Header = ()=> {
  const dispatch =  useDispatch();
  const showMessage = useMessage();
  const {isOpen, onOpen, onClose} = useDisclosure()

  useEffect(()=> {
    dispatch(getTags())
  },[dispatch])
  const tagOptions = useSelector((state)=> state.tags.list)

  const onChangeTagSearch = useCallback((event)=> {
    const tagValue = event.target.value
    tagValue? dispatch(push (`/posts/tag?label=${tagValue}`)): dispatch(push("/posts"))
    event.target.value = "";
  },[dispatch])

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
            <Select placeholder="Tag Search" mr="2" bg="white" onChange={onChangeTagSearch}>
            {
             tagOptions.map(tagOption => (
               <option key={tagOption.id} value={tagOption.value} >{tagOption.label}</option>
             ))
           }
            </Select>
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