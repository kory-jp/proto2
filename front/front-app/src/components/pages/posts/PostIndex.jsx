import React, { memo, useEffect } from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "@chakra-ui/spinner";
import { getPosts } from '../../../reducks/posts/operations';
import { getPostsSelect } from '../../../reducks/posts/selectors';
import PostCard from '../../organisms/post/PostCard';
import SideBar from '../../organisms/layout/SideBar';
import useLoadingState from '../../../hooks/useLoadingState';

export const PostIndex = memo(()=> {
  const dispatch =  useDispatch();
  const selector = useSelector((state) => state);
  const posts = getPostsSelect(selector);
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
          <SideBar />
          {posts.length > 0 && (
            <Box m="2">
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
})

export default PostIndex;