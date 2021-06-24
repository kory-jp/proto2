import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Stack, Box } from "@chakra-ui/layout";
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
import useMessage from '../../../hooks/useMessage';
import { userUpdate } from '../../../reducks/users/operations';
import { DefaultFlex, DefaultImage } from '../../../assets/style/chakraStyles';
import useGetUserId from '../../../hooks/useGetUserId';
import useLoadingState from '../../../hooks/useLoadingState';

export const ProfileEdit = ()=> {
  const dispatch = useDispatch()
  const showMessage = useMessage()
  const userId = useGetUserId()
  const loadingState = useLoadingState()

  const [name, setName] =  useState('');
  const [nickname, setNickname] =  useState('');
  const [email, setEmail] =  useState('');
  const [introduction, setIntroduction] =  useState('');
  const [image, setImage] =  useState();
  const [preview, setPreview] = useState();

  const getUserProfile = (userId) => {
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
    getUserProfile(userId)
  },[userId])

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

  const PreviewImage = useCallback((event) => {
    const imageFile = event.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  },[setPreview])

  const inputImage = useCallback((event)=> {
    const file = event.target.files[0]
    setImage(file)
    PreviewImage(event)
  }, [setImage, PreviewImage])

  const createFormData = useCallback(()=> {
    const formData = new FormData();

    formData.append('user[id]', userId)
    formData.append('user[name]', name)
    formData.append('user[nickname]', nickname)
    formData.append('user[email]', email)
    formData.append('user[introduction]', introduction)
    if (image) formData.append('user[image_data]', image)

    return formData
  },[userId, name, nickname, email, introduction, image])

  const formData = createFormData()


  return(
    <DefaultFlex flexDirection="column">
      <Stack>
      <FormControl id="name">
        <FormLabel fontSize={{base: "sm", md: "lg"}}>お名前</FormLabel>
        <Input 
          type="text"
          name="name"
          placeholder="お名前を入力してください"
          fontSize={{base: "sm", md: "lg"}}
          required={true}
          value={name}
          onChange={inputName}
        />
      </FormControl>
      <FormControl id="nickname">
        <FormLabel fontSize={{base: "sm", md: "lg"}}>ニックネーム</FormLabel>
        <Textarea
          type="text"
          name="nickname"
          placeholder="ニックネームを入力してください"
          fontSize={{base: "sm", md: "lg"}}
          rows="1"
          value={nickname}
          onChange={inputNickname}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel fontSize={{base: "sm", md: "lg"}}>メールアドレス</FormLabel>
        <Textarea
          type="email"
          name="email"
          rows="1"
          placeholder="メールアドレスを入力してください"
          fontSize={{base: "sm", md: "lg"}}
          value={email}
          onChange={inputEmail}
        />
      </FormControl>
      <FormControl id="introduction">
        <FormLabel fontSize={{base: "sm", md: "lg"}}>自己紹介文</FormLabel>
        <Textarea
          type="text"
          name="introduction"
          placeholder="自己紹介文を入力してください"
          fontSize={{base: "sm", md: "lg"}}
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
          <DefaultImage 
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
          fontSize={{base: "sm", md: "lg"}}
        >
          編集
        </PrimaryButton>
      </Stack>
    </DefaultFlex>
  )
}

export default ProfileEdit;