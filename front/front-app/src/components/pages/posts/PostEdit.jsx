import axios from 'axios';
import { push } from 'connected-react-router';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Box, Stack } from '@chakra-ui/layout'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Img,
} from "@chakra-ui/react"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';

import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { getLoadingState } from '../../../reducks/loading/selectors';
import { getUserId } from '../../../reducks/users/selectors';
import { postDelete, postDetail, postUpdate } from '../../../reducks/posts/operations';
import useMessage from '../../../hooks/useMessage';

export const PostEdit = memo(()=> {
  const dispatch = useDispatch()
  const postId = useParams();
  const [title, setTitle] =  useState('');
  const [content, setContent] =  useState('');
  const [image, setImage] =  useState();
  const [preview, setPreview] = useState('');

  const inputTitle = useCallback((event)=> {
    setTitle(event.target.value)
  }, [setTitle])

  const inputContent = useCallback((event)=> {
    setContent(event.target.value)
  }, [setContent])

  const inputImage = useCallback((event)=> {
    const file = event.target.files[0]
    setImage(file)
    PreviewImage(event)
  }, [setImage])

  const PreviewImage = useCallback((e) => {
    const imageFile = e.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  },[setPreview])

  // 編集権限者か確認、権限者でない場合はTOPページへリダレクト
  const editAuth = () => {
    axios
      .get(`http://localhost:3001/api/v1/user/posts/${postId.id}/auth`,
      {withCredentials: true} 
      ).then(response => {
        const auth = response.data
        if (auth === false) {
          dispatch(push('/posts'))
        }
      }).catch(error => {
        console.log("error:", error)
      })
  }

  // 編集前データを取得
  const getPostStatus = () => {
    axios
      .get(`http://localhost:3001/api/v1/user/posts/${postId.id}`,
      {withCredentials: true} 
      ).then(response => {
        const data = response.data
        setTitle(data.title)
        setContent(data.content)
        setPreview(data.image.url)
      }).catch(error => {
        console.log("error:", error)
      })
  }
  
  useEffect(()=> {
    editAuth()
    getPostStatus()
  },[])

  const selector = useSelector((state)=> state)
  const loadingState = getLoadingState(selector)
  const userId = getUserId(selector);

  const createFormData = useCallback(()=> {
    const formData = new FormData();

    formData.append('post[user_id]', userId)
    formData.append('post[title]', title)
    formData.append('post[content]', content)
    if (image) formData.append('post[image]', image)

    return formData
  })
  const formData = createFormData();
  const showMessage = useMessage()

  return(
    <Box bg="white" p="4" shadow="md" borderRadius="md">
    <Stack>
      <FormControl id="title">
        <FormLabel>タイトル</FormLabel>
        <Input 
          type="title"
          name="title"
          placeholder="タイトルを入力してください"
          required={true}
          value={title}
          onChange={inputTitle}
        />
      </FormControl>
      <FormControl id="content">
        <FormLabel>本文</FormLabel>
        <Textarea
          type="content"
          name="content"
          rows="10"
          placeholder="本文を入力してください"
          required={true}
          value={content}
          onChange={inputContent}
        />
      </FormControl>
      <FormControl id="image">
        <FormLabel>
          <AddAPhotoIcon />
        </FormLabel>
        <Input
          type="file"
          name="image"
          accept="image/*, .jpg, .jpeg, .png"
          multiple={true}
          onChange={inputImage}
          display="none"
        />
      </FormControl>
      {
        preview ?
        <Box>
          <Button
            onClick={()=> setPreview('')}
          >
            <CancelIcon />
          </Button>
          <Img
            boxSize="md" 
            objectFit="cover"
            src={preview}
            alt="preview img"
          />
        </Box> : null
      }
        <PrimaryButton
          type="submit"
          onClick={()=> dispatch(postUpdate(postId, formData, showMessage))}
          loading = {loadingState}
          disabled = {title === "" || content === ""}
        >
          編集
        </PrimaryButton>
        <PrimaryButton
          type="submit"
          loading = {loadingState}
          onClick={()=> dispatch(postDelete(postId, showMessage))}
        >
          削除
        </PrimaryButton>
      </Stack>
  </Box>
  )
})

export default PostEdit;