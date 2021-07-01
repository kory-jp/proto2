import { Input } from "@chakra-ui/input";
import {Link, Stack } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {push} from 'connected-react-router';

import {completedLoggedInStatus, logIn} from "../../reducks/currentUser/operations"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import useMessage from "../../hooks/useMessage";
import useLoadingState from "../../hooks/useLoadingState";
import { DefaultBox, DefaultText } from "../../assets/style/chakraStyles";

export const ReduxLogin = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(completedLoggedInStatus())
  },[dispatch])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useCallback((event)=> {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event)=> {
    setPassword(event.target.value)
  }, [setPassword])

  const onClickRegistration = () => {
    dispatch(push('/registration'))
  }

  const loadingState = useLoadingState()
  const showMessage = useMessage();

  return(
    <DefaultBox>
      {/* <Text as="h3" textAlign="center" fontWeight="bold" fontSize="lg">COVID-TAX</Text> */}
      <DefaultText as="h3" textAlign="center" fontWeight="bold">COVID-TAX</DefaultText>
      <Stack spacing="5">
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
        <PrimaryButton
          type="submit"
          onClick={()=> dispatch(logIn(email, password, showMessage))}
          loading={loadingState}
          disabled={email === "" || password ===""}
        >
          ログイン
        </PrimaryButton>
        <Link 
          onClick={onClickRegistration} 
          textAlign="center"
          fontSize={{base: "sm", md: "lg"}}
        >
          新規登録
        </Link>
      </Stack>
    </DefaultBox>
  )
}

export default ReduxLogin;