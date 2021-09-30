import { Input } from "@chakra-ui/input";
import { Link, Stack } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {push} from 'connected-react-router';
import {FormControl} from "@chakra-ui/react"

import {completedLoggedInStatus, registration} from "../../reducks/currentUser/operations"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import useMessage from "../../hooks/useMessage";
import useLoadingState from "../../hooks/useLoadingState";
import { DefaultBox, DefaultText } from "../../assets/style/chakraStyles";
import useReturnTop from "../../hooks/useReturnTop";

export const ReduxRegistration = () => {
  const dispatch = useDispatch();
  const returnTop  = useReturnTop()
  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[dispatch])
  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const inputUserName = useCallback((event)=> {
    setUserName(event.target.value)
  }, [setUserName])

  const inputUserNickname = useCallback((event)=> {
    setUserNickname(event.target.value)
  }, [setUserNickname])

  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event)=> {
    setPassword(event.target.value)
  }, [setPassword])

  const inputPasswordConfirmation = useCallback((event)=> {
    setPasswordConfirmation(event.target.value)
  }, [setPasswordConfirmation])

  const onClickLogin = () => {
    dispatch(push('/'))
  }

  const loadingState = useLoadingState()
  const showMessage = useMessage();

  const onClickRegistration = useCallback(()=> {
    dispatch(registration(userName, userNickname, email, password, passwordConfirmation, showMessage))
    returnTop()
  },[dispatch, returnTop, showMessage, userName, userNickname, email, password, passwordConfirmation])

  return(
    <DefaultBox>
      <DefaultText
        textAlign="center"
        fontWeight="bold"
      >
        新規登録
      </DefaultText>
      <Stack spacing="5">
        <FormControl
          id="name"
          as="form"
        >
          <Input 
            id="nameForm"
            type="name"
            name="name"
            placeholder="名前"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={userName}
            onChange={inputUserName}
          />
        </FormControl>
        <FormControl 
          id="nickname"
          as="form"
        >
          <Input 
            id="nicknameForm"
            type="nickname"
            name="nickname"
            placeholder="ニックネーム"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={userNickname}
            onChange={inputUserNickname}
          />
        </FormControl>
        <FormControl
          id="email"
          as="form"
        >
          <Input
            id="emailForm"
            type="email"
            name="email"
            placeholder="メールアドレス"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={email}
            onChange={inputEmail}
          />
        </FormControl>
        <FormControl
          id="password"
          as="form"
        >
          <Input
            id="passwordForm"
            type="password"
            name="password"
            placeholder="パスワード"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={password}
            onChange={inputPassword}
            autoComplete="off"
          />
        </FormControl>
        <FormControl
          id="password_confirmation"
          as="form"
        >
          <Input 
            id="passwordConfirmationForm"
            type="password"
            name="password_confirmation"
            placeholder="確認用パスワード"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={passwordConfirmation}
            onChange={inputPasswordConfirmation}
            autoComplete="off"
          /> 
        </FormControl>
        <PrimaryButton
          type="submit"
          onClick={onClickRegistration}
          isLoading={loadingState}
          disabled={userName === "" || userNickname === "" || email === ""|| password === "" || passwordConfirmation === ""}
        >
          新規登録
        </PrimaryButton>
        <Link 
          onClick={onClickLogin} 
          textAlign="center"
          fontSize={{base: "sm", md: "lg"}}
        >
          ログイン
        </Link>
      </Stack>
    </DefaultBox>
  )
}

export default ReduxRegistration;