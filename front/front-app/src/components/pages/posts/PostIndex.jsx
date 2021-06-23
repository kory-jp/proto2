import React, { memo, useEffect } from 'react'
import { Box, Center } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from "@chakra-ui/spinner";
import { getPosts } from '../../../reducks/posts/operations';
import { getPostsSelect } from '../../../reducks/posts/selectors';
import PostCard from '../../organisms/post/PostCard';
import { getLoadingState } from '../../../reducks/loading/selectors';
import SideBar from '../../organisms/layout/SideBar';

export const PostIndex = memo(()=> {
  const dispatch =  useDispatch();
  const selector = useSelector((state) => state);
  const posts = getPostsSelect(selector);
  const loading = getLoadingState(selector);


  useEffect(()=> {
    dispatch(getPosts())
  },[])
  
  return(
    <>
      { loading? (
        <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
          <Spinner/>
        </Center>
      ): (
        <>
        <Box>
          <SideBar />
          {posts.length > 0 && (
            posts.map(post =>(
              <PostCard key={post.id} post={post}/>
            ))
          )}
        </Box>
      </>
      )}
    </>
  )
})

export default PostIndex;