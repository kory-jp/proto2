import React, { memo, useCallback, useState } from 'react';
import { Box, Stack } from "@chakra-ui/layout";
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
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingState } from '../../../reducks/loading/selectors';
import { getUserId } from '../../../reducks/users/selectors';
import {postNew} from '../../../reducks/posts/operations'
import useMessage from '../../../hooks/useMessage';

export const PostNew = memo(()=> {
  const dispatch = useDispatch();
  const [title, setTitle] =  useState('');
  const [content, setContent] =  useState('');
  const [image, setImage] =  useState();
  const [preview, setPreview] = useState('');

  const selector = useSelector((state) => state);
  const userId = getUserId(selector);
  const loadingState = getLoadingState(selector);

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
  },[])

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
          onClick={()=> dispatch(postNew(formData, showMessage))}
          loading = {loadingState}
          disabled = {title === "" || content === ""}
        >
          投稿
        </PrimaryButton>
      </Stack>
    </Box>
  )
})

export default PostNew;