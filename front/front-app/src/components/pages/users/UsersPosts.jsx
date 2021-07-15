import React, { useCallback, useEffect } from 'react'
import {push} from 'connected-react-router';
import { Box, Center } from '@chakra-ui/layout';
import { Spinner } from "@chakra-ui/spinner";
import PostCard from '../../organisms/post/PostCard';
import useLoadingState from '../../../hooks/useLoadingState';
import usePagination from '../../../hooks/usePagination';
import DefaultPagination from '../../molecules/DefaultPagination';
import useReturnTop from '../../../hooks/useReturnTop';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUsersPosts } from '../../../reducks/posts/operations';

export const UsersPosts = () => {
  
  const userId = useParams();
  const dispatch = useDispatch()
  const loadingState = useLoadingState()
  const {queryPage, sumPage, setSumPage} = usePagination()
    
  useEffect(()=> {
      dispatch(getUsersPosts(userId, setSumPage, queryPage))
  },[dispatch, userId, setSumPage, queryPage])
    
  const posts =  useSelector((state)=> state.posts.list)
      
  const returnTop = useReturnTop()
  const changeCurrentPage = useCallback((e, page) => {
    dispatch(push(`/users/${userId.id}posts?page=${page}`))
    returnTop();
  },[dispatch, returnTop, userId.id])
  
  return(
    <>
    { loadingState? (
      <Center w={{base: "50vh", md: "100vh"}}>
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

export default UsersPosts;