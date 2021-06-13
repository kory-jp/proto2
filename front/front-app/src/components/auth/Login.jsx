import { Input } from "@chakra-ui/input";
import { Box, Link, Stack, Text } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {push} from 'connected-react-router';
import {useToast} from '@chakra-ui/react'

import {logIn} from "../../reducks/users/operations"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { getLoadingState } from "../../reducks/loading/selectors";
import { getMessageSelector } from "../../reducks/message/selector";

export const ReduxLogin = () => {
  const dispatch = useDispatch();
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

  const selector =  useSelector((state) => state);
  const loadingState = getLoadingState(selector);
  const message = getMessageSelector(selector);
  console.log(loadingState)
  console.log(message)
  const toast = useToast();

  const onClickLogin = () => {
    dispatch(logIn(email, password))
    toast({
      title: message.title,
      status: message.status,
      position: message.position,
      duration: message.duration,
      isClosable: message.isClosable
    })
  }

  return(
    <Box bg="white" p="5" shadow="md" borderRadius="md">
      <Text as="h3" textAlign="center" fontWeight="bold" fontSize="lg">COVID-TAX</Text>
      <Stack spacing="5">
        <Input
          id="f4"
          type="email"
          name="email"
          placeholder="メールアドレス"
          required={true}
          value={email}
          onChange={inputEmail}
        />
        <Input
          id="f5"
          type="password"
          name="password"
          placeholder="パスワード"
          required={true}
          value={password}
          onChange={inputPassword}
        />
        <PrimaryButton
          type="submit"
          // onClick={()=> dispatch(logIn(email, password))}
          onClick={onClickLogin}
          loading={loadingState}
          disabled={email === "" || password ===""}
        >
          ログイン
        </PrimaryButton>
        <Link onClick={onClickRegistration} textAlign="center">
          新規登録
        </Link>
      </Stack>
    </Box>    
  )
}

export default ReduxLogin;