import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import {push} from 'connected-react-router';
import MenuIcon from '@material-ui/icons/Menu';
import { useDisclosure, Select } from "@chakra-ui/react"
import { Link } from '@chakra-ui/react';

import {MenuDrawer} from '../../molecules/MenuDrawer';
import { getTags } from '../../../reducks/tags/operations';
import SearchInputForm from '../../molecules/SearchInputForm';

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
    onClose()
  },[dispatch, keyword, model, onClose])

  return(
    <>
      <Flex 
        bg="gray.400" 
        h={{base: "70px", md: "100px"}} 
        mb="4" 
        p="4" 
        w="full"
      >
        <Flex 
          mt="auto" 
          mb="auto" 
          justifyContent="space-between" 
          w="full" 
          mr={{base: "none", lg: "5%"}}
        >
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
            <SearchInputForm 
              keyword={keyword}
              model={model}
              onChangeKeyword={onChangeKeyword}
              onChangeModel={onChangeModel}
              toSearchResult={toSearchResult}
            />
            
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
      <MenuDrawer 
        onClose={onClose} 
        isOpen={isOpen}
        keyword={keyword}
        model={model}
        onChangeKeyword={onChangeKeyword}
        onChangeModel={onChangeModel}
        toSearchResult={toSearchResult}
      />
    </>
  )
}

export default Header;