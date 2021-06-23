import axios from 'axios'
import { push } from 'connected-react-router';
import { nowLoadingAction } from '../loading/actions';
import { getPostsAction, newPostAction, showPostAction, updatePostAction,  } from './actions';

export const getPosts = () => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .get("http://localhost:3001/api/v1/user/posts",
      {withCredentials: true}
      ).then(response => {
        const posts = response.data
        dispatch(getPostsAction(posts));
      }).catch(error => {
        console.log('error res:', error)
      }).finally(()=> {
        dispatch(nowLoadingAction(false))
      })
  }
}

export const newPost = (formData, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .post("http://localhost:3001/api/v1/user/posts",
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        },
        {withCredentials: true}
      ).then(response => {
        const post = response.data
        dispatch(
          newPostAction({
            id: post.id,
            user_id: post.user_id,
            title: post.title,
            content: post.content,
            image: post.image
          })
        )
        showMessage({title: '投稿完了しました', status: 'success'})
        dispatch(push('/posts'))
      }).catch(error => {
        console.log("post res:", error)
      }).finally(() => {
        dispatch(nowLoadingAction(false))
      })
  }
}

export const showPost = (postId) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .get(`http://localhost:3001/api/v1/user/posts/${postId.id}`,
      {withCredentials: true} 
      ).then(response => {
        const post = response.data
        dispatch(
          showPostAction({
            id: post.id,
            user_id: post.user_id,
            name: post.name,
            title: post.title,
            content: post.content,
            image: post.image.url,
            created_at: post.created_at
          })
        )
      }).catch(error => {
        console.log("error:", error)
      }).finally(()=> {
        dispatch(nowLoadingAction(false))
      })

  }
}

export const updatePost = (postId, formData, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .patch(`http://localhost:3001/api/v1/user/posts/${postId.id}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        },
        {withCredentials: true}
      ).then(response => {
        const post = response.data
        dispatch(
          updatePostAction({
            id: post.id,
            user_id: post.user_id,
            title: post.title,
            content: post.content,
            image: post.image
          })
        )
        showMessage({title: '編集完了しました', status: 'success'})
        dispatch(push('/posts'))
      }).catch(error => {
        console.log("post res:", error)
      }).finally(() => {
        dispatch(nowLoadingAction(false))
      })
  }
}

export const deletePost = (postId, showMessage) => {
  return async (dispatch) => {
    dispatch(nowLoadingAction(true))
    axios
      .delete(`http://localhost:3001/api/v1/user/posts/${postId.id}`,
        {withCredentials: true}
      ).then(response => {
        dispatch(
          updatePostAction({
            id: '',
            user_id: '',
            title: '',
            content: '',
            image: ''
          })
        )
        showMessage({title: '削除完了しました', status: 'success'})
        dispatch(push('/posts'))
      }).catch(error => {
        console.log("post res:", error)
      }).finally(() => {
        dispatch(nowLoadingAction(false))
      })
  }
}