import { Input } from "@chakra-ui/input";
import { Link, Stack } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {push} from 'connected-react-router';

import {completedLoggedInStatus, registration} from "../../reducks/users/operations"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import useMessage from "../../hooks/useMessage";
import useLoadingState from "../../hooks/useLoadingState";
import { DefaultBox, DefaultText } from "../../assets/style/chakraStyles";

export const ReduxRegistration = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[dispatch])
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const inputUserName = useCallback((event)=> {
    setUserName(event.target.value)
  }, [setUserName])

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

  return(
    <DefaultBox>
      <DefaultText
        textAlign="center"
        fontWeight="bold"
      >
        新規登録
      </DefaultText>
      <Stack spacing="5">
        <Input 
          id="f1"
          type="name"
          name="name"
          placeholder="名前"
          fontSize={{base: "sm", md: "lg"}}
          required={true}
          value={userName}
          onChange={inputUserName}
        />
        <Input
          id="f4"
          type="email"
          name="email"
          placeholder="メールアドレス"
          fontSize={{base: "sm", md: "lg"}}
          required={true}
          value={email}
          onChange={inputEmail}
        />
        <Input
          id="f5"
          type="password"
          name="password"
          placeholder="パスワード"
          fontSize={{base: "sm", md: "lg"}}
          required={true}
          value={password}
          onChange={inputPassword}
        />
        <Input 
          id="f4"
          type="password"
          name="password_confirmation"
          placeholder="確認用パスワード"
          fontSize={{base: "sm", md: "lg"}}
          required={true}
          value={passwordConfirmation}
          onChange={inputPasswordConfirmation}
        /> 
        <PrimaryButton
          type="submit"
          onClick={()=> dispatch(registration(userName, email, password, passwordConfirmation, showMessage))}
          loading = {loadingState}
          disabled={userName === "" || email === ""|| password === "" || passwordConfirmation === ""}
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