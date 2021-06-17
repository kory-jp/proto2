import axios from 'axios'
import {push} from 'connected-react-router';
import { nowLoadingAction } from '../loading/actions';
import { postNewAction } from './actions';

export const postNew = (formData) => {
  console.log(formData)
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
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data" 
        //   },
        //   post: {
        //     user_id: userId,
        //     title: title,
        //     content: content,
        //     image: image,
        //   }
        // },
        {withCredentials: true}
      ).then(response => {
        console.log('post res:', response )
        const post = response.data
        dispatch(
          postNewAction({
            id: post.id,
            user_id: post.user_id,
            title: post.title,
            content: post.content,
            image: post.image
          })
        )
      }).catch(error => {
        console.log("post res:", error)
      }).finally(() => {
        dispatch(nowLoadingAction(false))
      })
  }
}