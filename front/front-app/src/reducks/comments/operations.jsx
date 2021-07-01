import axios from 'axios'
import {push} from 'connected-react-router';
import { nowLoadingAction } from '../loading/actions';
import { getCommentsAction, newCommentAction } from './actions';

export const getComments = (postId, setSumPage, queryPage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .get(`http://localhost:3001/api/v1/user/comments/${postId.id}/comments_index?page=${queryPage}`,
      {withCredentials: true}
      ).then(response => {
        const comments = response.data.comments
        const page_length = response.data.page_length
        dispatch(getCommentsAction(comments))
        setSumPage(page_length)
        console.log(page_length)
      }).catch(error => {
        console.log('error res:', error)
      }).finally(()=> {
        dispatch(nowLoadingAction(false))
      })
  }
}

export const newComment = (showMessage, postId, currentUserId, comment) => {
  return async (dispatch) => {
      await axios
      .post("http://localhost:3001/api/v1/user/comments", 
      {
        comment: {
          post_id: postId,
          user_id: currentUserId,
          comment: comment,
        }
      },
      { withCredentials: true}
      ).then(response => {
        const comment = response.data
        dispatch(
          newCommentAction({
            id: comment.id,
            postId: comment.post_id,
            userId: comment.user_id,
            comments: comment.comments,
          })
        )
        showMessage({title: 'コメント投稿しました', status: 'success'})
        dispatch(push(`/posts/show/${postId}`))
      })
      .catch(()=> {
        dispatch(console.log('error'))
      })
  }
}