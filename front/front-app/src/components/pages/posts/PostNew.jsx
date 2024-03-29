import React, { useCallback, useState } from 'react';
import { Box, Stack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { useDispatch } from 'react-redux';
import {newPost} from '../../../reducks/posts/operations'
import useMessage from '../../../hooks/useMessage';
import useLoadingState from '../../../hooks/useLoadingState';
import { DefaultBox, DefaultFlex, DefaultImage, DefaultTitleText } from '../../../assets/style/chakraStyles'
import useGetCurrentUserId from '../../../hooks/useGetCurrentUserId';
import SelectComponent from '../../organisms/layout/SelectComponent';
import useOptions from '../../../hooks/useOptions';

export const PostNew = ()=> {
  const dispatch = useDispatch();
  const [title, setTitle] =  useState('');
  const [tags, setTags] =  useState([]);
  const [content, setContent] =  useState('');
  const [image, setImage] =  useState();
  const [preview, setPreview] = useState('');
  const currentUserId = useGetCurrentUserId()
  const loadingState = useLoadingState()
  const showMessage = useMessage()
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

  const previewImage = useCallback((event) => {
    const imageFile = event.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  },[])

  const inputImage = useCallback((event)=> {
    const file = event.target.files[0]
    setImage(file)
    previewImage(event)
  }, [setImage, previewImage])
  
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

  const onClickCancelImage = useCallback(()=> {
    setImage(undefined)
    setPreview('')
  },[])


  return(
    <>
      <DefaultFlex mb="4">
        <DefaultTitleText ml="auto" mr="auto">新規投稿画面</DefaultTitleText>
      </DefaultFlex>
      <DefaultBox>
        <Stack>
          <FormControl id="title">
            <FormLabel fontSize={{base: "sm", md: "lg"}}>タイトル</FormLabel>
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
                onClick={onClickCancelImage}
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
            onClick={()=> dispatch(newPost(formData, showMessage))}
            isLoading={loadingState}
            disabled={title==="" || content===""}
            fontSize={{base: "sm", md: "lg"}}
          >
            投稿
          </PrimaryButton>
        </Stack>
      </DefaultBox>
    </>
  )
}

export default PostNew;