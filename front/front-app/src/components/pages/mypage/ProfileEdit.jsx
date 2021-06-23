import React, { memo, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Stack, Box } from "@chakra-ui/layout";
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
import { getUser, getUserId } from '../../../reducks/users/selectors';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';
import { getLoadingState } from '../../../reducks/loading/selectors';
import useMessage from '../../../hooks/useMessage';
import { userUpdate } from '../../../reducks/users/operations';

export const ProfileEdit = memo(()=> {
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const selector = useSelector((state)=> state)
  const userId = getUserId(selector)
  const loadingState = getLoadingState(selector)

  const [name, setName] =  useState('');
  const [nickname, setNickname] =  useState('');
  const [email, setEmail] =  useState('');
  const [introduction, setIntroduction] =  useState('');
  const [image, setImage] =  useState();
  const [preview, setPreview] = useState();

  const getUserProfile = () => {
    axios
      .get(`http://localhost:3001/api/v1/user/accounts/${userId.id}`,
      {withCredentials: true} 
      ).then(response => {
        console.log(response)
        const data = response.data
        setName(data.name)
        setNickname(data.nickname)
        setEmail(data.email)
        setIntroduction(data.introduction)
        setPreview(data.image_data.url)
      }).catch(error => {
        console.log("error:", error)
      })
  }

  useEffect(()=> {
    getUserProfile()
  },[])

  const inputName = useCallback((event)=> {
    setName(event.target.value)
  }, [setName])

  const inputNickname = useCallback((event)=> {
    setNickname(event.target.value)
  }, [setNickname])
  
  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  }, [setEmail])

  const inputIntroduction = useCallback((event)=> {
    setIntroduction(event.target.value)
  }, [setIntroduction])

  const inputImage = useCallback((event)=> {
    const file = event.target.files[0]
    setImage(file)
    PreviewImage(event)
  }, [setImage])

  const PreviewImage = useCallback((event) => {
    const imageFile = event.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  },[setPreview])

  const createFormData = useCallback(()=> {
    const formData = new FormData();

    formData.append('user[id]', userId)
    formData.append('user[name]', name)
    formData.append('user[nickname]', nickname)
    formData.append('user[email]', email)
    formData.append('user[introduction]', introduction)
    if (image) formData.append('user[image_data]', image)

    return formData
  })

  const formData = createFormData()


  return(
    <Flex flexDirection="column" bg="white" borderRadius="md" shadow="md" p="2">
      <Stack>
      <FormControl id="name">
        <FormLabel>お名前</FormLabel>
        <Input 
          type="text"
          name="name"
          placeholder="お名前を入力してください"
          required={true}
          value={name}
          onChange={inputName}
        />
      </FormControl>
      <FormControl id="nickname">
        <FormLabel>ニックネーム</FormLabel>
        <Textarea
          type="text"
          name="nickname"
          placeholder="ニックネームを入力してください"
          rows="1"
          value={nickname}
          onChange={inputNickname}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>メールアドレス</FormLabel>
        <Textarea
          type="email"
          name="email"
          rows="1"
          placeholder="メールアドレスを入力してください"
          value={email}
          onChange={inputEmail}
        />
      </FormControl>
      <FormControl id="introduction">
        <FormLabel>自己紹介文</FormLabel>
        <Textarea
          type="text"
          name="introduction"
          placeholder="自己紹介文を入力してください"
          rows="5"
          value={introduction}
          onChange={inputIntroduction}
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
          onClick={()=> dispatch(userUpdate(userId, formData, showMessage))}
          loading = {loadingState}
          disabled = {name === "" || email === ""}
        >
          編集
        </PrimaryButton>
      </Stack>
    </Flex>
  )
})

export default ProfileEdit;