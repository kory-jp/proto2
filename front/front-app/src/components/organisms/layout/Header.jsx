import React, { useCallback, useState } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { useDispatch } from 'react-redux'
import {push} from 'connected-react-router';
import MenuIcon from '@material-ui/icons/Menu';
import { useDisclosure, Select } from "@chakra-ui/react"
import { Link } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import {MenuDrawer} from '../../molecules/MenuDrawer';
import SearchInputForm from '../../molecules/SearchInputForm';
import useReturnTop from '../../../hooks/useReturnTop';
import useOptions from '../../../hooks/useOptions';
import { nowLoadingAction } from '../../../reducks/loading/actions';
import NotificationLink from '../notification/NotificationLink';

export const Header = ()=> {
  const dispatch =  useDispatch();
  const returnTop = useReturnTop()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [keyword, setKeyword] = useState('')
  const {pathname, search} = useLocation()
  const query =  new URLSearchParams(search);
  const nowLabel = query.get("label")
  const nowKeyword = query.get("keyword")
  const nowModel = query.get("model")
  const [model, setModel] = useState('post')
  const options = useOptions()

  const onChangeKeyword = useCallback((event)=> {
    setKeyword(event.target.value)
  },[setKeyword])

  const onChangeModel = useCallback((event) => {
    setModel(event.target.value)
  },[setModel])

  const onChangeTagSearch = useCallback((event)=> {
    const tagValue = event.target.value
    tagValue? dispatch(push (`/posts/tag?label=${tagValue}`)): dispatch(push("/posts"))
    if (nowLabel !== tagValue){
      dispatch(nowLoadingAction(true));
    }
    event.target.value = "";
  },[dispatch, nowLabel])

  const toTop = useCallback(()=> {
    dispatch(push('/posts'))
    if(pathname !== "/posts"){
      dispatch(nowLoadingAction(true));
    }
    returnTop()
  },[dispatch, returnTop, pathname])

  const toSearchResult = useCallback(()=> {
    dispatch(push(`/searchResult?model=${model}&keyword=${keyword}`))
    if(nowModel !== model) {
      if(nowKeyword !== keyword){
        dispatch(nowLoadingAction(true));
      }
    }
    setModel("post")
    setKeyword("")
    onClose()
  },[dispatch, keyword, model, nowModel, nowKeyword, onClose])

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
            color="white"
            fontSize={{base: "sm", md: "xl", lg: "3xl"}}
            fontWeight="extrabold"
            onClick={toTop}
            cursor="pointer"
            ml="7"
            fontFamily='Gugi'
          >
            With-Accountant
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
          <Flex>
            <Flex display={{base: "none", md: "flex"}}>
              <Select placeholder="Tag Search" mr="2" bg="white" onChange={onChangeTagSearch}>
              {
                options.map(option => (
                  <option key={option.id} value={option.value} >{option.label}</option>
                  ))
                }
              </Select>
            </Flex>
            <Flex
              mt="auto"
              mb="auto"
              ml="2"
              mr="2"
            >
              <NotificationLink />
            </Flex>
            <Flex display={{base: "flex", md: "none"}}>
            <Link onClick={onOpen}>
              <MenuIcon style={{color: 'white'}}/>
            </Link>
          </Flex>
          </ Flex >
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