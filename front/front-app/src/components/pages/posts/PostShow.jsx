import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Spinner } from "@chakra-ui/spinner";
import { Center } from '@chakra-ui/layout';
import useLoadingState from '../../../hooks/useLoadingState';
import { showPost } from '../../../reducks/posts/operations';
import { PostShowCard} from '../../organisms/post/PostShowCard'
import CommentArea from '../../organisms/comment/CommentArea';
import { getComments } from '../../../reducks/comments/operations';
import usePagination from '../../../hooks/usePagination';
import { confirmFavorited } from '../../../reducks/favorite/operations';
import useMessage from '../../../hooks/useMessage';
import { loggedInStatus } from '../../../reducks/currentUser/operations';

export const PostShow = ()=> {
  const dispatch = useDispatch()
  const postId = useParams();
  const {sumPage, setSumPage, queryPage} = usePagination()
  const showMessage = useMessage()

  useEffect(()=> {
    dispatch(loggedInStatus(showMessage))
    dispatch(showPost(postId))
    dispatch(getComments(postId, setSumPage, queryPage))
    dispatch(confirmFavorited(postId))
  },[postId, dispatch, queryPage, setSumPage, showMessage])

  const post = useSelector((state)=> state.posts)
  const loadingState = useLoadingState()
  return(
    <>
      {
        loadingState? (
          <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
            <Spinner/>
          </Center>
        ): (
          <>
            <PostShowCard post={post}/>
            <CommentArea postId={postId} sumPage={sumPage}/>
          </>
        )
      }
    </>
  )
}

export default PostShow;


