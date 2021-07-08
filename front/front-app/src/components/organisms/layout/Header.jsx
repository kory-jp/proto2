import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import {push} from 'connected-react-router';
import { Button } from '@chakra-ui/button';
import MenuIcon from '@material-ui/icons/Menu';
import { useDisclosure, Select, Input } from "@chakra-ui/react"
import { Link } from '@chakra-ui/react';
import {FormControl} from "@chakra-ui/react"
import SearchIcon from '@material-ui/icons/Search';

import {MenuDrawer} from '../../molecules/MenuDrawer';
import { getTags } from '../../../reducks/tags/operations';

export const Header = ()=> {
  const dispatch =  useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [keyword, setKeyword] = useState('')
  const [model, setModel] = useState('post')

  const onChangeKeyword = useCallback((event)=> {
    setKeyword(event.target.value)
  },[setKeyword])

  const onChangeModel = useCallback((event) => {
    setModel(event.target.value)
  },[setModel])

  useEffect(()=> {
    dispatch(getTags())
  },[dispatch])
  const tagOptions = useSelector((state)=> state.tags.list)

  const onChangeTagSearch = useCallback((event)=> {
    const tagId = event.target.value
    tagId? dispatch(push (`/posts/tag/${tagId}`)): dispatch(push("/posts"))
    event.target.value = "";
  },[dispatch])

  const toSearchResult = useCallback(()=> {
    dispatch(push(`/searchResult?model=${model}&keyword=${keyword}`))
    setModel("post")
    setKeyword("")
  },[dispatch, keyword, model])

  return(
    <>
      <Flex bg="gray.400" h="110px" mb="4" p="4" w="full">
        <Flex mt="auto" mb="auto" justifyContent="space-between" w="full" mr={{base: "none", lg: "5%"}}>
          <Text
            as="h1"
            fontSize={{base: "sm", md: "xl"}}
            fontWeight="bold"
            onClick={()=> dispatch(push('/posts'))}
            cursor="pointer"
            ml="7"
          >
            トップページへ
          </Text>
          <Flex display={{base: "none", md: "flex"}} w="50%" >
            <FormControl id="search" display="flex">
              <Input
                value={keyword}
                onChange={onChangeKeyword}
                placeholder="キーワード入力"
                textAlign="center"
                bg="white"
                mr="2"
              />
              <Select
                value={model}
                onChange={onChangeModel} 
                bg="white" 
                w="auto" 
                minW="130px"
                mr="2"
              >
                <option value="post">記事</option>
                <option value="user">ユーザー</option>
              </Select>
              <Button
                onClick={toSearchResult}
                disabled={keyword===""}
              >
                <SearchIcon />
              </Button>
            </FormControl>
          </Flex>
          <Flex display={{base: "none", md: "flex"}} >
            <Select placeholder="Tag Search" mr="2" bg="white" onChange={onChangeTagSearch}>
              {
                tagOptions.map(tagOption => (
                  <option key={tagOption.id} value={tagOption.id} >{tagOption.name}</option>
                ))
              }
            </Select>
          </ Flex >  
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