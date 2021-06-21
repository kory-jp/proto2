import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { postDetail } from '../../../reducks/posts/operations';
import { getPostSelect } from '../../../reducks/posts/selectors';
import { PostShowCard} from '../../organisms/post/PostShowCard'

export const PostShow = memo(()=> {
  const dispatch = useDispatch()
  const id = useParams();
  useEffect(()=> {
    dispatch(postDetail(id))
  },[id])

  const selector = useSelector((state) => state);
  const post = getPostSelect(selector);
  return(
    <>
      <PostShowCard post={post}/>
    </>
  )
})

export default PostShow;


