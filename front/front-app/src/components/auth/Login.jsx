import { Input } from "@chakra-ui/input";
import {Divider, Link, Stack } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {push} from 'connected-react-router';
import {FormControl} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

import {completedLoggedInStatus, logIn, loginGuestUser} from "../../reducks/currentUser/operations"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import useMessage from "../../hooks/useMessage";
import useLoadingState from "../../hooks/useLoadingState";
import { DefaultBox, DefaultText } from "../../assets/style/chakraStyles";
import useReturnTop from "../../hooks/useReturnTop";

export const ReduxLogin = () => {
  const dispatch = useDispatch();
  const returnTop  = useReturnTop()
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

  const onClickLogin = useCallback(() => {
    dispatch(logIn(email, password, showMessage))
    returnTop()
  },[dispatch, returnTop, showMessage, email, password])

  const onClickLoginGuestUser = useCallback(() => {
    dispatch(loginGuestUser(showMessage))
    returnTop()
  },[dispatch, returnTop, showMessage])

  return(
    <DefaultBox>
      <DefaultText 
        as="h3" 
        textAlign="center" 
        fontWeight="bold"
        fontFamily='Gugi'
        >
        With-Accountant
      </DefaultText>
      <Stack spacing="5">
        <FormControl
          as="form"
          id="email"
          >
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
        </FormControl>
        <FormControl
          as="form"
          id="password"
          >
          <Input
            id="f5"
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
        <PrimaryButton
          type="submit"
          name="submit"
          onClick={onClickLogin}
          isLoading={loadingState}
          disabled={email === "" || password ===""}
          >
          ログイン
        </PrimaryButton>
        <Divider />
        <Button
          type="submit"
          name="submit"
          color="white"
          backgroundColor="blue.500"
          onClick={onClickLoginGuestUser}
          isLoading={loadingState}
        >
          ゲストユーザーでログイン
        </Button>
        <Divider />
        <Link 
          onClick={onClickRegistration} 
          textAlign="center"
          fontSize={{base: "sm", md: "lg"}}
          >
          新規登録はコチラ
        </Link>
      </Stack>
    </DefaultBox>
  )
}

export default ReduxLogin;