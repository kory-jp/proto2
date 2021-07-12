import axios from 'axios';
import { push } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Box, Stack, Center } from '@chakra-ui/layout'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/spinner";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';

import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { deletePost, updatePost } from '../../../reducks/posts/operations';
import useMessage from '../../../hooks/useMessage';
import useLoadingState from '../../../hooks/useLoadingState';
import { nowLoadingAction } from '../../../reducks/loading/actions';
import { DefaultBox, DefaultImage } from '../../../assets/style/chakraStyles'
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId';
import SelectComponent from '../../organisms/layout/SelectComponent';
import useOptions from '../../../hooks/useOptions';
import DeleteButton from '../../atoms/button/DeleteButton';

export const PostEdit = ()=> {
  const dispatch = useDispatch()
  const postId = useParams();
  const [title, setTitle] =  useState('');
  const [tags, setTags] =  useState([]);
  const [content, setContent] =  useState('');
  const [image, setImage] =  useState();
  const [preview, setPreview] = useState('');
  const currentUserId = useGetCurrentUserId()
  const loadingState = useLoadingState()
  const options = useOptions()

  const inputTitle = useCallback((event)=> {
    setTitle(event.target.value)
  }, [setTitle])

  const selectTags = useCallback((event)=> {
    setTags(event)
  },[setTags])


  const inputContent = useCallback((event)=> {
    setContent(event.target.value)
  }, [setContent])

  const PreviewImage = useCallback((e) => {
    const imageFile = e.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  },[setPreview])

  const inputImage = useCallback((event)=> {
    const file = event.target.files[0]
    setImage(file)
    PreviewImage(event)
  }, [setImage, PreviewImage])


  // 編集権限者か確認、権限者でない場合はTOPページへリダレクト
  const editAuth = useCallback((postId) => {
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
  },[dispatch])


  // 編集前データを取得
  const getPostStatus = useCallback((postId) => {
    dispatch(nowLoadingAction(true))
    axios
      .get(`http://localhost:3001/api/v1/user/posts/${postId.id}`,
      {withCredentials: true} 
      ).then(response => {
        const data = response.data
        setTitle(data.title)
        setContent(data.content)
        setPreview(data.image.url)
        setTags(data.tags)
      }).catch(error => {
        console.log("error:", error)
      }).finally(()=> {
        dispatch(nowLoadingAction(false))
      })
  },[dispatch])

  useEffect(()=> {
    editAuth(postId)
    getPostStatus(postId)
  },[dispatch, editAuth, getPostStatus, postId])

  const createFormData = useCallback(()=> {
    const formData = new FormData();

    formData.append('post[user_id]', currentUserId)
    formData.append('post[title]', title)
    for(let i in tags) {
      let tagId = tags[i].id
      formData.append('post[tag_ids][]', tagId)
    }
    formData.append('post[content]', content)
    if (image) formData.append('post[image]', image)

    return formData
  },[currentUserId, title, tags, content, image])
  const formData = createFormData();
  const showMessage = useMessage()

  return(
    <>
      {
        loadingState? (
          <Center  h="100vh" w={{base: "50vh", md: "100vh"}}>
            <Spinner/>
          </Center>
        ):(
          <DefaultBox>
            <Stack>
              <FormControl id="title">
                <FormLabel fontSize={{base: "sm", md: "lg"}} >タイトル</FormLabel>
                <Input 
                  type="title"
                  name="title"
                  placeholder="タイトルを入力してください"
                  fontSize={{base: "sm", md: "lg"}}
                  required={true}
                  value={title}
                  onChange={inputTitle}
                />
              </FormControl>
              <FormControl id="tag">
                <FormLabel fontSize={{base: "sm", md: "lg"}}>タグ</FormLabel>
                <SelectComponent 
                  onChange={selectTags}
                  options={options}
                  value={tags}
                />
              </FormControl>
              <FormControl id="content">
                <FormLabel fontSize={{base: "sm", md: "lg"}}>本文</FormLabel>
                <Textarea
                  type="content"
                  name="content"
                  rows="10"
                  placeholder="本文を入力してください"
                  fontSize={{base: "sm", md: "lg"}}
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
                  <DefaultImage 
                    src={preview}
                    alt="preview img"
                  />
                </Box> : null
              }
              <PrimaryButton
                type="submit"
                onClick={()=> dispatch(updatePost(postId, formData, showMessage))}
                isLoading={loadingState}
                disabled={title === "" || content === ""}
                fontSize={{base: "sm", md: "lg"}}
              >
                編集
              </PrimaryButton>
              <DeleteButton
                type="submit"
                isLoading={loadingState}
                onClick={()=> dispatch(deletePost(postId, showMessage))}
              >
                削除
              </DeleteButton>
            </Stack>
          </DefaultBox>
        )
      }
    </>
  )
}

export default PostEdit;