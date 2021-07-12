import React, { useEffect } from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "@chakra-ui/spinner";
import {push} from 'connected-react-router';

import { searchTagGetPosts } from '../../../reducks/posts/operations';
import PostCard from '../../organisms/post/PostCard';
import useLoadingState from '../../../hooks/useLoadingState';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';
import { useLocation } from 'react-router';
import { DefaultBox, DefaultTitleText } from '../../../assets/style/chakraStyles';
import { Divider } from '@chakra-ui/react';

export const PostIndex = ()=> {
  const {search} = useLocation()
  const query = new URLSearchParams(search)
  const label = query.get("label")
  const dispatch =  useDispatch();
  const {sumPage, setSumPage, queryPage} = usePagination()
  const loadingState = useLoadingState()
  
  useEffect(()=> {
    dispatch(searchTagGetPosts(label, setSumPage, queryPage))
  },[label, queryPage, setSumPage, dispatch])
  const posts = useSelector((state)=> state.posts.list)
  
  const returnTop = useReturnTop()
  
  const changeCurrentPage = (e, page) =>{
    dispatch(push(`/posts?page=${page}`))
    returnTop()
  }
  return(
    <>
      { loadingState? (
        <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
          <Spinner/>
        </Center>
      ): (
        <>
          <DefaultBox mb="5">
            <DefaultTitleText>「{label}」記事一覧</DefaultTitleText>
            <Divider colorScheme="blackAlpha" />
          </DefaultBox>
          {posts.length > 0 && (
            <Box mr="2" ml="2" mb="2">
              {
                posts.map(post =>(
                  <PostCard key={post.id} post={post}/>
                ))
              }
            </Box>
          )}
          <DefaultPagination 
            count={sumPage}
            onChange={changeCurrentPage}
            page={queryPage}
          />
      </>
      )}
    </>
  )
}

export default PostIndex;