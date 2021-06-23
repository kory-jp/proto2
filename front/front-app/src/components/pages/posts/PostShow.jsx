import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Spinner } from "@chakra-ui/spinner";
import { Center } from '@chakra-ui/layout';
import useLoadingState from '../../../hooks/useLoadingState';
import { showPost } from '../../../reducks/posts/operations';
import { getPostSelect } from '../../../reducks/posts/selectors';
import { PostShowCard} from '../../organisms/post/PostShowCard'

export const PostShow = memo(()=> {
  const dispatch = useDispatch()
  const id = useParams();
  useEffect(()=> {
    dispatch(showPost(id))
  },[id, dispatch])

  const selector = useSelector((state) => state);
  const post = getPostSelect(selector);
  const loadingState = useLoadingState()
  return(
    <>
      {
        loadingState? (
          <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
            <Spinner/>
          </Center>
        ): (
          <PostShowCard post={post}/>
        )
      }
    </>
  )
})

export default PostShow;


