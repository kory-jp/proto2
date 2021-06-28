import React, { useEffect } from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "@chakra-ui/spinner";
import {push} from 'connected-react-router';

import { getPosts } from '../../../reducks/posts/operations';
import PostCard from '../../organisms/post/PostCard';
import useLoadingState from '../../../hooks/useLoadingState';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';

export const PostIndex = ()=> {
  const dispatch =  useDispatch();
  const {sumPage, setSumPage, queryPage} = usePagination()
  const posts = useSelector((state)=> state.posts.list)
  const loadingState = useLoadingState()
  
  useEffect(()=> {
    dispatch(getPosts(setSumPage, queryPage))
  },[queryPage, setSumPage, dispatch])
  
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