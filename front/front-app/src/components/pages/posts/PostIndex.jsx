import React, { useEffect } from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "@chakra-ui/spinner";
import { getPosts } from '../../../reducks/posts/operations';
import PostCard from '../../organisms/post/PostCard';
import useLoadingState from '../../../hooks/useLoadingState';

export const PostIndex = ()=> {
  const dispatch =  useDispatch();
  const posts = useSelector((state)=> state.posts.list)
  const loadingState = useLoadingState()

  useEffect(()=> {
    dispatch(getPosts())
  },[dispatch])
  
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
      </>
      )}
    </>
  )
}

export default PostIndex;